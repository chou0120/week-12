<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signin">SignIn</router-link> |
      <router-link to="/signup">SignUp</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
    </div>
    <div v-if="error" @click="clearError" class="error">{{ error }}</div>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed:{
    ...mapState(["error"])
  },
  methods: {
    ...mapActions(["clearError"])
  }
}
</script>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 1024px;
    margin: 0 auto;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
    border-right: 1px solid;
    padding: 0 10px;
}

#nav a:last-child {
    border: none;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.error {
    background-color: rosybrown;
    padding: 20px;
}

</style>
