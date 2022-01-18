<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated >
      <q-toolbar>
        
        <q-avatar square>
            <img src="img/ezcat_favicon.png">
        </q-avatar>



        <q-toolbar-title>
          EZCAT: an Easy Conversation Annotation Tool
        </q-toolbar-title>

        <q-btn flat dense icon="list" aria-label="Home" to="/" label="Chat List">
          <q-tooltip :delay="200">Click here to go back to the conversation list</q-tooltip>
        </q-btn>

        <q-btn flat dense icon="settings" aria-label="Settings" to="/settings" label="Settings">
          <q-tooltip :delay="200">Click here to access application settings</q-tooltip>
        </q-btn>

        <q-space />
        <q-avatar square><img src="img/sncf_logo.svg"></q-avatar>
        <q-avatar square><img src="img/telecomparis_logo.svg"></q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  components: {},

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
