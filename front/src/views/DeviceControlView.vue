<script setup lang="ts">
import SimpleKeyboard from "../components/MyKeyboard.vue";
import WebsocketCommunicate from "../components/Websocket.vue";
</script>

<template>
    <div class="about">
        <WebsocketCommunicate :deviceId="deviceId" ref="websocket" />
        <SimpleKeyboard @onKeyPress="onKeyPress" />
</div>
</template>
<script lang="ts">
export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    input: "",
    deviceId:""
  }),
  mounted() {
    // get deviceId from #/device/:deviceId
    this.deviceId = this.$route.params.deviceId as string;
  },
  methods: {
    onKeyPress(button:any) {
        console.log("Button pressed", button);
        (this.$refs.websocket as any).sendKey(button);
    },
  }
};
</script>
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
  