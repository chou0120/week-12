<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="name">Name</label>
                <input type="text" v-model="name" id="name" requried />
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" v-model="email" id="email" requried />
            </div>
            <div>
                <label for="pass">Password</label>
                <input type="password" v-model="pass" id="pass" requried />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex"
    export default {
        data() {
            return {
                name: "",
                email: "",
                pass: ""
            };
        },
        methods:{
            ...mapActions(["signUp"]),
            onSubmit(){
                const formData = {
                    name: this.name,
                    email:this.email,
                    password: this.pass
                };
                this.signUp(formData);
            }
        }
    };

</script>

<style>
form {
    padding: 20px;
    background: lemonchiffon;
    box-shadow: -2px 2px 6px;
    max-width: 400px;
    margin: 0 auto;
}

label {
    display: block;
}

input,
button {
    padding: 5px 10px;
    margin: 5px 0;
}
</style>