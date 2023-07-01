<template>
  <div class="about">
    <input v-model="exec" placeholder="system()" />
    <button @click="clickExec">exec</button>
    <br/>
    <button @click="clickReboot">reboot</button>
    <button @click="clickDeactivateAp">Deactivate AP</button>
    <button @click="clickActivateAp">Activate AP</button>
  </div>
</template>
<script lang="ts">
import { sendExec } from '@/websocket';
export default {
  name: "App",
  data: () => ({
    exec: ""
  }),
  methods: {
    clickExec() {
      console.log("clickExec", this.exec);
      sendExec(this.exec);
    },
    clickReboot() {
      console.log("clickReboot");
      sendExec("reboot");
    },
    clickDeactivateAp() {
      console.log("clickDeactivateAp");
      sendExec("nmcli connection down openducky-ap");
    },
    clickActivateAp() {
      console.log("clickActivateAp");
      sendExec("nmcli connection up openducky-ap");
    }
  },
  mounted() {
    
  }
};
</script>

<style></style>
