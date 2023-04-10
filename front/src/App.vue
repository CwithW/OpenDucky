<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div>
      <nav>
<!--         <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        <RouterLink class="nav-button" to="/device">DeviceControl</RouterLink>
        <RouterLink class="nav-button" to="/about">Config</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width:100%;
  display: flex;
  justify-content: center;

}
.nav-button{
  padding: 10px;
}

</style>
