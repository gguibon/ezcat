<template>
	<q-page class="flex flex-center">
		<div class="q-pa-md block" >
			<q-toolbar class="bg-primary text-white shadow-2">
				<q-toolbar-title>Settings</q-toolbar-title>
				<q-btn dense class="q-ml-sm" icon="file_download" @click="downloadConfig()" color="secondary">
					<q-tooltip :delay="200">Download the current configuration.</q-tooltip>
				</q-btn>
				<q-btn dense class="q-ml-sm" icon="cloud_upload" @click="uploadDial=true" color="accent">
					<q-tooltip :delay="200">Upload a config JSON file.</q-tooltip>
				</q-btn>
				<q-btn dense class="q-ml-sm" icon="save" @click="save()" color="positive">
					<q-tooltip :delay="200">Save your configuration.</q-tooltip>
				</q-btn>
				<q-btn dense class="q-ml-sm" icon="bookmark_add" @click="save(true)" color="positive">
					<q-tooltip :delay="200">Save your configuration in local storage.</q-tooltip>
				</q-btn>
				<q-btn v-show="configInStorage" dense class="q-ml-sm" icon="bookmark_remove" @click="clear()" color="negative" >
					<q-tooltip :delay="200">Clear configuration from local storage.</q-tooltip>
				</q-btn>
			</q-toolbar>
			<q-card-section class="codemirror">
				<codemirror v-model="annofjson" :options="cmOption"></codemirror>
			</q-card-section>
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
					<div class="text-h6 text-blue-grey-8">Select a JSON file to continue tagging</div>
				</q-card-section>

				<q-card-section > 
					<q-file id="filepicker" style="max-width: 200px" bottom-slots v-model="upload" @input="loadFile()" label="Load JSON" accept=".json, text/json" counter use-chips outlined>
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

import store from '../store/index';

// import { ref } from 'vue';

// const 

import { codemirror } from "vue-codemirror";
import "codemirror/mode/python/python.js";
// import "codemirror/mode/javascript.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";

export default {
	components: {
		codemirror
	},
	data(){
		return{
			upload: null, 
			uploadDial: false,
			maximizedUploadToggle: false,
			annofjson: JSON.stringify(this.$store.getters.getConfig, null, 4),
			annofok: true,
			annofcomment: '',
			configInStorage: localStorage.hasOwnProperty('ezcat_config'),
			cmOption: {
				tabSize: 4,
				styleActiveLine: true,
				lineNumbers: true,
				lineWrapping: true,
				line: true,
				mode: 'python',
				theme: 'material-darker',
			}
		}
	},
	computed: {
	},
	methods: {
		save(localstorage = false) {
			var content = JSON.parse(this.annofjson);
			this.$store.dispatch('updateConfig', content);
			if (localstorage == true) {
				localStorage.setItem('ezcat_config', JSON.stringify(content));
			}
			this.configInStorage = localStorage.hasOwnProperty('ezcat_config');
			this.$q.notify({
				message: localstorage ? "Config saved in local storage!!" : "Config saved in memory!!",
				color: localstorage ? 'positive' : 'warning',
				position:'top-right'
			});
		},
		clear() {
			localStorage.removeItem('ezcat_config');
			this.configInStorage = localStorage.hasOwnProperty('ezcat_config');
			this.$q.notify({
				message: "Config removed from local storage",
				textColor: "black",
				color: "info",
				position: "top-right"
			});
		},
		downloadConfig() {
			const data = JSON.stringify(this.$store.getters.getConfig, null, 4);
			const blob = new Blob([data], {type: 'text/plain'})
			const e = document.createEvent('MouseEvents'),
			a = document.createElement('a');
			a.download = "config.json";
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
		},
		loadFile() {
			var reader = new FileReader();
			reader.onload = function(event) {
				store.dispatch('updateConfig', JSON.parse(event.target.result) );
			}
			reader.readAsText(this.upload);
			this.$q.notify({message:'config loaded', position:'top-right', color:'positive'});
			this.annofjson = JSON.stringify(this.$store.getters.getConfig, null, 4);
			this.uploadDial = false;
			this.upload = null;
		},
	}
}

</script>

<style scoped lang="stylus">
.block{
	width: 100vw;
	height: 90vh;
}

@media only screen and (min-width: 768px) {
	.block {
		width: 70vw;
		height: 80vh;
	}
}


</style>

