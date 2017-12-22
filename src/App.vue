<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import ElInput from "../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    name: 'app'
  }
</script>

<style>
  #app {
    min-width: 1200px;
  }
</style>
