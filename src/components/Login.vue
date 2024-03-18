<template>
    <div id="app" class="center">
        <notification-popup v-if="apiResponse" :message="apiResponse" />
        <div class="form">
            <h1>Login</h1>
            <input type="text" v-model="userName" placeholder="Enter User Name or Email" />
            <input type="password" v-model="password" placeholder="Enter Password" />
            <button v-on:click="login">Login</button>
            <p>
                Don't have an account. <router-link to="/signUp"> Sign Up</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import NotificationPopup from './NotificationPopup.vue';
import { postWithoutAuth, LOGIN_URL } from './scripts/request_custom.js';
export default {
    name: "LoginPage",
    components: {
        NotificationPopup
    },
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
    methods: {
        async login() {
            let body = {
                user_name: this.userName,
                password: this.password
            }
            var response = await postWithoutAuth(LOGIN_URL, body);
            if (response.status == 200) {
                localStorage.setItem("isUserLoggedIn", true)
                localStorage.setItem("token", response?.data?.token)
                localStorage.setItem("user_name", response?.data?.user_name)
                this.$router.push({ name: "TodoListPage" })
            } else {
                this.apiResponse = response?.response?.data?.message;
                setTimeout(() => {
                    this.closeErrorPopup();
                }, 1000);
            }
        }
        ,
        closeErrorPopup() {
            this.apiResponse = null;
        }
    },
    mounted() {
        if (localStorage.getItem("isUserLoggedIn")) {
            this.$router.push({ name: "TodoListPage" })
        }
    }
}
</script>

<style>
.center {
    background-image: url('../assets/app-background.jpg');
    background-size: cover;
    display: flex;

    .form {
        text-align: center;
        margin: auto;
        margin-left: 10%;
    }

    h1 {
        font-size: 300%;
        font-family: title;
    }

    p {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: small;
        color: gray;
    }

    input {
        width: 300px;
        height: 30px;
        margin-bottom: 10px;
    }

    button {
        width: 200px;
        height: 30px;
        background-color: #d7d7cb;
        border: 1px solid #d7d7cb;
        cursor: pointer;
        font-family: 'Times New Roman', Times, serif;
        font-size: medium;
    }
}
</style>