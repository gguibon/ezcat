<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import chats from 'assets/chats.json'
import config from 'assets/annotation-config.json'

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('setChats', chats);
    this.$store.dispatch('setConfig', config);
  }
}
</script>
