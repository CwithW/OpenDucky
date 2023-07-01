<template>
    <div class="about">
        <input v-model="deviceId" placeholder="deviceId" />
        <button @click="clickSetDeviceId">set</button>
    </div>
</template>
  

<script lang="ts">
import { setDeviceId,getDeviceId } from '@/deviceid';
export default{
    name: "App",
    data: () => ({
        deviceId: ""
    }),
    methods: {
        clickSetDeviceId() {
            setDeviceId(this.deviceId);
        }
    },
    mounted() {
        this.deviceId = getDeviceId();
    },
}


</script>
<style scoped></style>
  