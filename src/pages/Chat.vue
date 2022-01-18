<template>
  <q-page>
    <div class="q-pa-md block">
      <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Conversation</q-toolbar-title>
      </q-toolbar>

      <q-stepper v-model="step" ref="stepper" color="primary" animated header-class="text-bold">
        <q-step :name="1" title="Label messages" icon="label" :done="step > 1" >
          <q-virtual-scroll style="max-height: 50vh;" :items="chatData.messages" separator>
            <template v-slot="{ item, index }">
              <Message :key="index" :mode="item.author" :data="item" :parentUpdateMessage="updateMessage" :index="index" :modecolor="getColor(item)" ></Message>
            </template>
          </q-virtual-scroll>
        </q-step>

        <q-step :name="2" title="Label the conversation" icon="chat_bubble" :done="step > 2" >
          <ConversationLabel v-for="item in Object.entries($store.getters.getConfig.chatLabels)" :key="item[0]" 
            :chatData="chatData"
            :labelInfo="item[1]"
            :labelName="item[0]"
            :parentUpdateConvLabel="updateConvLabel"
            >
          </ConversationLabel>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn v-show="step<2" @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" :disable="!allTagged"  />
            <q-btn v-show="step === 2" to="/" @click="saveChanges()" color="positive" :label="step === 2 ? 'Finish' : 'Continue'" :disable="!convTagged" />
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>

      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import Message from '../components/Message.vue';
import ConversationLabel from '../components/ConversationLabel.vue';
export default {
  name: 'PageIndex',
  components: {Message, ConversationLabel},
  props: ['chat', 'chatid'],
  computed: {

    allTagged(){
      for (var m of this.chatData.messages){
        if (m.labels[ this.$store.getters.firstMsgLabel.key ] == null && m.author != 'alert'){ return false;}
      }
      return true;
    },
    emergencyToText(){
      if (this.emergency){ return 'yes'; }
      else {return 'no';}
    }
  },
  data(){
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      chatEmotion: this.$props.chat.emotion,
      visitorSentiment: (this.$props.chat.hasOwnProperty('visitorSentiment')?this.$props.chat.visitorSentiment:null),
      emergency: (this.$props.chat.hasOwnProperty('emergency')?this.$props.chat.emergency:null),
      step: 1,
      chatData: this.$props.chat,
      convTagged: null,
      encounteredAuthors: []
    }
  },
  mounted() {
    this.convTagged = this.isConvTagged();
  },
  methods: {
    updateMessage(index, message){
      this.chatData.messages[index] = message;
    },
    updateConvLabel(labelKey, labelValue){
      this.chatData[labelKey] = labelValue;
      this.convTagged = this.isConvTagged();
    },
    getColor(item){
      var colors = this.$store.getters.getAuthorsColors;
      if (colors.hasOwnProperty(item.author)) return colors[item.author];
      else {
        if (this.encounteredAuthors.includes(item.author)) return  this.$store.state.defaultAuthorColors[this.encounteredAuthors.indexOf(item.author)];
        else {
          this.encounteredAuthors.push(item.author);
          return this.$store.state.defaultAuthorColors[this.encounteredAuthors.indexOf(item.author)];
        }
      }
    },
    isConvTagged(){
      for (const [labelkey, labelvalue] of Object.entries(this.$store.getters.getChatLabels)) {
        if (labelvalue.mandatory == true && this.chatData[labelkey] == null) {
          return false;
        }
      }
      return true;
    },
    saveChanges(){
      this.chatData.done = true;
      this.$store.dispatch('updateChat', this.chatData);
      this.$router.push('home');
      this.$q.notify({
        message: "Don't forget to SAVE!!",
        color: 'warning',
        position:'top-right'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.block{
    width: 100vw
    height: 90vh;
}

.virtualscroll {
    height: 80vh;
}

@media only screen and (min-width: 768px) {
    .block {
        width: 100vw;
        height: 80vh;
    }

    .virtualscroll {
        height: 60vh;
    }
}
</style>
