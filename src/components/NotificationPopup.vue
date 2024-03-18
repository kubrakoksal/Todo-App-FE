<template>
  <div class="notification-popup">
    <div>! {{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>

<style scoped>
.notification-popup {
  position: fixed;
  top: 10px;
  right: 0%;
  background-color: #d9d7cb;
  color: #7e0613;
  padding: 8px;
  font-size: medium;
  font-family: 'Times New Roman', Times, serif;
}
</style>