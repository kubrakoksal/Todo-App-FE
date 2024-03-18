<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100vh;
}

@font-face {
    font-family: title;
    src: url('~@/assets/fonts/GreatVibes-Regular.ttf');
}

input::-webkit-input-placeholder {
     color: black;
     opacity: 0.2;
     font-size: small;
}
</style>
