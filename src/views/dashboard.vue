<template>
  <div>
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
    <form @submit.prevent ='submitForm'>
      <label for="name">Edit your name</label>
      <input type="text" id="name" v-model="user.name"/>
      <br />
      <input type="submit" value="submit"/>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters({
 userData:"getUser"
    }),
    user(){
      return !this.userData ? false : this.userData
    }
  },
  created(){
    this.getUserData();

  },
  methods: {
    ...mapActions(["fetchUser", "updateUser"]),
    getUserData(){

    let userEmail = localStorage.getItem("userEmail")
    this.fetchUser(userEmail)
    }
  },
  submitForm(){
    this.updateUser();
  }

}
</script>