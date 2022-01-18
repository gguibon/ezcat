<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import chats from 'assets/chats.json'
export default {
  name: 'App',
  mounted(){
    this.loadChats();
  },
  methods:{
    loadChats(){
      this.$store.dispatch('setChats', chats);
    }
  }
}
</script>
