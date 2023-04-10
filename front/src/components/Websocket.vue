<template></template>
  
<script lang="ts">

export default {
    name: "WebsocketCommunicate",
    props: {
        deviceId: String
    },
    data: () => ({
        ws: null as WebSocket | null,
    }),
    mounted() {
        this.openWebsocket();
    },
    methods: {
        openWebsocket() {
            this.ws?.close();
            this.ws = new WebSocket("ws://"+window.location.host+"/user");
        },
        sendKey(hid_keyCode: number) {
            console.log("sendkey", hid_keyCode,this.deviceId)
            this.ws?.send(JSON.stringify({
                    deviceId: this.deviceId,
                    type:3,
                    data: hid_keyCode
                }));
        },
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  