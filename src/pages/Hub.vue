<template>
	<q-page class="flex flex-center">
		<div class="q-pa-md block" >
			<q-toolbar class="bg-primary text-white shadow-2">
				<q-toolbar-title>Conversations</q-toolbar-title>

				<q-linear-progress stripe rounded size="20px" :value="progress" color="positive" style="max-width: 25vw" >
					<div class="absolute-full flex flex-center">
						<q-badge color="white" text-color="accent" :label="progressLabel" />
					</div>
					<q-tooltip :delay="200">The annotation progress</q-tooltip>
				</q-linear-progress>
				<q-toggle dense v-model="todo" @input="todo = toggleTodoMode()" color="yellow" class="q-ml-sm" icon="filter_list" keep-color >
					<q-tooltip :delay="200">Toggle to only show conversations that require annotation</q-tooltip>
				</q-toggle>
				<q-btn dense class="q-ml-sm" icon="edit" no-caps color="secondary" @click="scrollToUnlabelled()" >
					<q-tooltip :delay="200">Scroll to first conversation without annotation (please prefer the toggle method)</q-tooltip>
				</q-btn>
				<q-btn dense class="q-ml-sm" icon="cloud_upload" @click="uploadDial=true" color="accent">
					<q-tooltip :delay="200">Upload a JSON file to resume your work.</q-tooltip>
				</q-btn>
				<q-btn dense class="q-ml-sm" icon="save" @click="saveFile()" color="positive">
					<q-tooltip :delay="200">Save your modification by downloading the current version of the JSON content</q-tooltip>
				</q-btn>
			</q-toolbar>

			<q-virtual-scroll class="virtualscroll" :items="chatList" ref="virtualListRef" >
				<template v-slot="{ item, index }">
					<q-item :key="index" class="q-my-sm" clickable v-ripple @click="enterChat(item[1])" >
						<q-item-section avatar>
							<q-avatar :color="(item[1].done==false ? 'grey' : 'positive')" text-color="white" :icon="(item[1].done==false ? '' :'done')">
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label>{{ item[1].id }}</q-item-label>
							<q-item-label v-show="item[1].datetime != 'unk'" caption lines="1">Datetime: <span class="text-bold">{{ item[1].datetime }}</span></q-item-label>
							<q-item-label v-show="item[1].realDuration != 'unk'" caption lines="1">Real Duration: <span class="text-bold">{{ item[1].realDuration }}</span></q-item-label>
							<!-- <q-item-label caption lines="1">Speaking Slots: <span class="text-bold">{{ item[1].speakingSlots.length }}</span></q-item-label> -->
						</q-item-section>

					</q-item>
				</template>
			</q-virtual-scroll>
		</div>

		<q-dialog v-model="uploadDial" :maximized="maximizedUploadToggle" transition-show="fade" transition-hide="fade" >
			<q-card style=" max-width: 100vw;">
				<q-bar class="bg-primary text-white">
					<q-space />
					<q-btn dense flat icon="minimize" @click="maximizedUploadToggle = false" :disable="!maximizedUploadToggle"></q-btn>
					<q-btn dense flat icon="crop_square" @click="maximizedUploadToggle = true" :disable="maximizedUploadToggle"></q-btn>
					<q-btn dense flat icon="close" v-close-popup></q-btn>
				</q-bar>

				<q-card-section>
					<div class="text-h6 text-blue-grey-8">Select a file to upload and the corresponding format</div>
				</q-card-section>

				<q-card-section>
					<q-card-section>
						<div class="text-h8 text-blue-grey-8">File format:</div>
					</q-card-section>
					<q-btn-toggle
						v-model="uploadMode"
						toggle-color="primary"
						:options="[
							{value: 'json', slot: 'json'},
							{value: 'whatsapp', slot: 'whatsapp'},
							{value: 'telegram', slot: 'telegram'}
						]"
					>
						<template v-slot:json>
						<div class="row items-center no-wrap">
							<div class="text-center">
							JSON
							</div>
							<q-icon right name="data_object" />
						</div>
						</template>

						<template v-slot:whatsapp>
						<div class="row items-center no-wrap">
							<div class="text-center">
							Whatsapp
							</div>
							<q-icon right name="whatsapp"  class="text-green" />
						</div>
						</template>

						<template v-slot:telegram>
						<div class="row items-center no-wrap">
							<div class="text-center">
							Telegram
							</div>
							<q-icon right name="telegram"  class="text-blue"/>
						</div>
						</template>
					</q-btn-toggle>
				</q-card-section>

				<q-card-section > 
					<q-file id="filepicker" style="max-width: 200px" bottom-slots v-model="upload" @input="loadFile()" label="Click or drop" :accept="fileFormats[uploadMode]" counter use-chips outlined>
						<template v-slot:prepend>
						<q-icon name="cloud_upload" @click.stop />
						</template>
						<template v-slot:append>
						<q-icon name="close" @click.stop="upload = null" class="cursor-pointer" />
						</template>
					</q-file>
				</q-card-section>

			</q-card>
		</q-dialog>
	</q-page>
</template>

<script>

import Vue from 'vue'
import store from '../store/index';

export default {
	data(){
		return{
			upload: null, 
			uploadDial: false,
			maximizedUploadToggle: false,
			uploadMode: 'json',
			todo: this.$store.getters.getTodoMode, // toggle to print only untagged chats
			fileFormats: {"json": ".json, text/json", "whatsapp": ".txt, text", "telegram": ".html, text/html"}
		}
	},
	computed: {
		tagged(){
			var tagged = 0;
			for (let [key, value] of Object.entries(this.$store.getters.getChats)) {
				if (value.done != false) { tagged++; }
			}
			return tagged;
		},
		progress(){
			var tagged = 0;
			for (let [key, value] of Object.entries(this.$store.getters.getChats)) {
				if (value.done != false) { tagged++; }
			}
			return tagged/Object.entries(this.$store.getters.getChats).length;
		},
		progressLabel() {
			var tagged = 0;
			for (let [key, value] of Object.entries(this.$store.getters.getChats)) {
				if (value.done != false) { tagged++; }
			}
			return `${tagged} / ${Object.entries(this.$store.getters.getChats).length} ( ${ Math.round((tagged / Object.entries(this.$store.getters.getChats).length) *100) }%) `
		},
		chatList() {
			if(this.todo == false) return Object.entries(this.$store.getters.getChats)
			else {
				let result = {};
				for (let [key, value] of Object.entries(this.$store.getters.getChats)) {
					if(value.hasOwnProperty("done")){ 
						if(value.done == false) {
							result[key] = value;
						}
					}
				}
				return Object.entries(result);
			}

		}
	},
	mounted() {
		
	},
	methods: {
		enterChat(chat){
			this.$router.push({
				name: 'chat',
				params: {
					chatid: chat.id,
					chat: chat
				}
			}) 
		},
		saveFile() {
			const data = JSON.stringify(this.$store.getters.getChats)
			const blob = new Blob([data], {type: 'text/plain'})
			const e = document.createEvent('MouseEvents'),
			a = document.createElement('a');
			a.download = "chats"+Date.now()+"_"+ this.tagged +".json";
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
		},
		loadFile() {
			if (this.uploadMode == 'whatsapp') {
				var reader = new FileReader();
				reader.onload = function(event) {
					store.dispatch('setChatsFromWhatsapp', event.target.result);
				}
				reader.readAsText(this.upload);
			} else if (this.uploadMode == 'telegram') {
				// TODO
			} else {
				var reader = new FileReader();
				reader.onload = function(event) {
					store.dispatch('setChats', JSON.parse(event.target.result));
				}
				reader.readAsText(this.upload);
			}

			this.$q.notify({message:'data loaded', position:'top-right', color:'positive'});
			this.uploadDial=false; 
		},
		scrollToUnlabelled() {
			var index = 0;
			for (const [key, chat] of Object.entries(this.$store.getters.getChats)) {
				if (chat.done == false) {  this.$refs.virtualListRef.scrollTo(index); break;  }
				else{ index++; }
			}
		},
		toggleTodoMode() {
			this.$store.commit('toggle_todo');
			return this.$store.getters.getTodoMode;
		}
	}
}
</script>

<style scoped lang="stylus">
.block{
	width: 100vw;
	height: 90vh;
}

.virtualscroll {
	height: 80vh;
}

@media only screen and (min-width: 768px) {
	.block {
		width: 70vw;
		height: 80vh;
	}

	.virtualscroll {
		height: 60vh;
	}
}
</style>