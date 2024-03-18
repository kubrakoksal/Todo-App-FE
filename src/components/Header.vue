<template>
    <div class="header">
        <h2>{{ userName }}</h2>
        <a href="#" v-on:click="logOut">Logout</a>
        <h1>Todo List Application</h1>
    </div>
</template>

<script>
export default {
    name: "HeaderComponent",
    data() {
        return {
            userName: ""
        };
    },
    created() {
        this.userName = localStorage.getItem("user_name") || "";
    },
    methods: {
        logOut() {
            localStorage.clear();
            this.$router.push({ name: "LoginPage" });
        }
    }
}
</script>

<style>
.header {
    height: 25%;
    background-image: url('../assets/sky.jpg');
    background-size: cover;

    a {
        float: right;
        color: white;
        margin: 1%;
        font-size: 120%;
    }

    h1 {
        font-size: 300%;
        font-family: title;
        text-align: center;
        float: center;
        padding: 2%;
        margin: 0%;
    }

    a:hover {
        color: gray;
        background-color: white;
    }

    h2 {
        color: white;
        font-size: 120%;
        float: left;
        margin: 1%;
    }
}
</style>