<template>
    <div id="app" class="center">
        <notification-popup v-if="apiResponse" :message="apiResponse" />
        <div class="form">
            <h1>Sign Up</h1>
            <input type="text" v-model="firstName" placeholder="Enter First Name" />
            <input type="text" v-model="lastName" placeholder="Enter Last Name" />
            <input type="text" v-model="userName" placeholder="Enter User Name" />
            <input type="text" v-model="email" placeholder="Enter Email" />
            <input type="password" v-model="password" placeholder="Enter Password" />
            <button v-on:click="signUp">Sign Up</button>
            <p>
                Already on Todo App. <router-link to="/login"> Sign In</router-link>
            </p>
        </div>
    </div>

</template>

<script>
import NotificationPopup from './NotificationPopup.vue';
import { postWithoutAuth, REGISTER_URL } from './scripts/request_custom.js';
export default {
    name: "SignUp",
    data() {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            apiResponse: ""
        }
    },
    components: {
        NotificationPopup
    },
    methods: {
        async signUp() {
            let body = {
                first_name: this.firstName,
                last_name: this.lastName,
                user_name: this.userName,
                email: this.email,
                password: this.password
            }
            var response = await postWithoutAuth(REGISTER_URL, body);
            if (response.status == 200) {
                this.$router.push({ name: "LoginPage" })
            } else {
                this.apiResponse = response?.response?.data?.message;
                setTimeout(() => {
                    this.closeErrorPopup();
                }, 1000);
            }
        },
        closeErrorPopup() {
            this.apiResponse = null;
        }
    }
}
</script>