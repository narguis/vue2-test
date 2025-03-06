<template>
  <div id="app">
    <ReturnItemsModal />
  </div>
</template>

<script>
import ReturnItemsModal from "./components/ReturnItemsModal.vue";

export default {
  name: "App",
  components: {
    ReturnItemsModal,
  },
};
</script>

<style>
#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
