<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getDeviceId } from '@/deviceid'
</script>

<template>
  <header>
      <nav>
        <RouterLink class="nav-button" to="/control">Control</RouterLink>
        <RouterLink class="nav-button" to="/script">Script</RouterLink>
        <RouterLink class="nav-button" to="/device">Device</RouterLink>
        <RouterLink class="nav-button" to="/config">Config</RouterLink>
      </nav>
      <div>
        Last Seen: {{ 1 }}
      </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.nav-button{
  padding: 10px;
}

</style>
