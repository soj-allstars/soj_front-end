<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  a{text-decoration:none;}
  li{list-style:none;}
  body {
	  margin: 0;
	  padding: 0;
  }
  h1 {
	  margin: 0;
	  padding: 0;
  }
}
</style>
