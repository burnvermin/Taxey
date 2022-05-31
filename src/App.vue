<template>
  <div id="app">
    <router-view @id="getId"
    @name="getName"
    :username="users.name"
    :id="users.id" />
  </div>
</template>

<script>

export default {

  data () {
    return {
      users: {
        id: '',
        name: ''
      }
    }
  },

  methods: {
    getId (value) {
      this.users.id = value
    },
    getName (value) {
      this.users.name = value
    }

  }
}
</script>
<style>
  #app {
    height: 100vh;
  }
</style>
