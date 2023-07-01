<template>

  </template>
  <script lang="ts">
  import { setDeviceId } from '@/deviceid';
    export default {
  name: "App",

  mounted() {
    // get deviceId from #/set/:deviceId
    let deviceId = this.$route.params.deviceId as string;
    setDeviceId(deviceId);
    this.$router.push({ path: "/control" });
  },
};
</script>
  <style>

  </style>
  