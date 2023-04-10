import { getConfig } from "./config";
import WebSocket from 'ws';
import { EventEmitter } from "events";
import { WebsocketMessage, WebsocketMessageType } from "./WebsocketMessage";
export class WebsocketCommunication {
    private url: string;
    private authKey: string;
    private ws: WebSocket | null = null;
    private pingTimer: NodeJS.Timeout | null = null;
    private eventEmitter = new EventEmitter();
    constructor() {
        let config = getConfig();
        this.url = config['ServerWebsocketUrl']
        this.authKey = config['ServerAuthKey']
    }
    public send(message: WebsocketMessage) {
        this.ws?.send(JSON.stringify(message))
    }
    public start() {
        this.ws = new WebSocket(this.url);
        this.ws.on('open', () => {
            console.log("websocket connection is established")
        })
        this.ws.on('message', (message) => {
            let messageAsString = message.toString()
            console.log(messageAsString)
            let data: WebsocketMessage = JSON.parse(messageAsString)
            if (data.type == WebsocketMessageType.AUTH) {
                this.send(<WebsocketMessage>{
                    type: WebsocketMessageType.AUTH,
                    id: data.id,
                    data: { key: this.authKey, deviceId: getConfig()['DeviceId'] }
                })
                return
            }
            this.eventEmitter.emit('event', data)
        })
        this.ws.on('error', (error) => {
            console.log(error)
            this.ws?.close()
        })
        this.ws.on('close', () => {
            console.log("websocket connection is closed")
            this.ws = null;
            setTimeout(() => {
                this.start()
            }, 1000)
        })
        this.pingTimer != null && clearInterval(this.pingTimer)
        this.pingTimer = setInterval(() => {
            this.ws?.ping()
        }, 1000*30)
    }
    public on(event: 'event', listener: (message: WebsocketMessage) => void) {
        this.eventEmitter.on(event, listener)
    }
}