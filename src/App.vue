<template>
  <div id="app">
    <router-view></router-view>
    <menu-btn></menu-btn>
  </div>
</template>

<script>
import List from './components/list'
import menuBtn from './components/menuBtn'

export default {
  name: 'App',
  components:{
    List,
    menuBtn
  }
}
</script>

<style>
  html body{
    margin: 0;
    padding: 0;
  }
</style>
