<script setup lang="ts">
import SimpleKeyboard from "../components/MyKeyboard.vue";
import { sendKey } from "@/websocket";
</script>

<template>
    <div class="about">
        
        <SimpleKeyboard @onKeyPress="onKeyPress" />
</div>
</template>
<script lang="ts">
import { getDeviceId } from "@/deviceid";
export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    deviceId:""
  }),
  mounted() {
    this.deviceId = getDeviceId();
    if(!this.deviceId){
      this.$router.push({ path: "/config" });
    }
  },
  methods: {
    onKeyPress(button:any) {
        console.log("Button pressed", button);
        sendKey(button);
    },
  }
};
</script>
<style scoped>

</style>
  