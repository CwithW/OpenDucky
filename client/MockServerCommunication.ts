// 用于无网络情况下的模拟服务器通信
import EventEmitter from 'events';
import { default as express } from 'express';
import * as WebsocketMessage from './WebsocketMessage';
import expressWs from 'express-ws';

export class MockServerCommunication {
    private app = expressWs(express()).app;
    private eventEmitter = new EventEmitter();
    constructor() {
        this.app.use(express.static('public'));
        let eventEmitter = new EventEmitter();

        this.app.get("/api/server/isServer", function (req, res) {
            res.send(JSON.stringify({ code: 200, data: false }));
        })
        this.app.ws('/user', function (ws, req) {
            ws.on('error', function error(err) {
                console.log(err);
                ws.close();
            });
            ws.on('message', function message(message) {
                let messageAsString = message.toString()
                console.log(messageAsString)
                let data: UserControlMessage = JSON.parse(messageAsString)
                eventEmitter.emit('event', <WebsocketMessage.WebsocketMessage>{
                    type: data.type,
                    data: data.data,
                })
        
            });
        })
    }
    start() {
        this.app.listen(80, function () {
            console.log('mock server listening on port 80!');
        });
    }
    on(event: 'event', listener: (message: WebsocketMessage.WebsocketMessage) => void) {
        this.eventEmitter.on(event, listener)
    }
}



interface UserControlMessage {
    deviceId: string;
    type: WebsocketMessage.WebsocketMessageType,
    data: any;
}


