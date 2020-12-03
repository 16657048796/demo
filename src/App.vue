<template>
  <div >
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/demo_one">demo_one</router-link>
    </div>
    <router-view />
  </div>
</template>


<style lang="scss">
#nav {
 
}
</style>
