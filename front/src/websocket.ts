import { getDeviceId } from '@/deviceid';

let ws = null as WebSocket | null;

export function openWebsocket() {
    ws?.close();
    ws = new WebSocket("ws://" + window.location.host + "/user")
    ws.onclose = () => {
        setTimeout(openWebsocket, 1000);
    }
}
export function sendKey(hid_keyCode: number) {
    ws?.send(JSON.stringify({
        deviceId: getDeviceId(),
        type: 3,
        data: hid_keyCode
    }));
}
export function sendExec(command: string) {
    ws?.send(JSON.stringify({
        deviceId: getDeviceId(),
        type: 999,
        data: command
    }));
}

