<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>

        <q-avatar square class="q-mr-sm">
          <img src="img/ezcat_favicon.png">
        </q-avatar>

        <q-avatar square>
          <img style="filter: brightness(0) invert(1);" src="img/warwick_favicon.png">
        </q-avatar>

        <q-space />

        <q-btn flat dense icon="home" aria-label="Home" to="/" label="Home Page">
          <q-tooltip :delay="200">Click here to go to the home page</q-tooltip>
        </q-btn>

        <q-btn flat dense icon="list" aria-label="Hub" to="/hub" label="Chat List">
          <q-tooltip :delay="200">Click here to go back to the conversation list</q-tooltip>
        </q-btn>

        <q-btn flat dense icon="settings" aria-label="Settings" to="/settings" label="Settings">
          <q-tooltip :delay="200">Click here to access application settings</q-tooltip>
        </q-btn>

        <q-space />

        <q-btn flat dense icon="comment" aria-label="Feedback" href="https://forms.gle/nwmkqGTmQgsBhScv8" target="_blank">
          <q-tooltip :delay="200">Feedback</q-tooltip>
        </q-btn>

        <q-btn flat dense icon="fab fa-github" aria-label="Github" href="https://github.com/gguibon/ezcat"
          target="_blank">
          <q-tooltip :delay="200">Source Code</q-tooltip>
        </q-btn>

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

  data() {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
