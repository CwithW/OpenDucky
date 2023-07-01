import { WebSocket } from 'ws';
import {default as express} from 'express';
import expressWs from 'express-ws';
import EventEmitter from 'events';
import * as WebsocketMessage from './WebsocketMessage';

const app = expressWs(express()).app;
app.use(express.static('public'));

const ServerAuthKey = "OpenDucky"
const eventBus = new EventEmitter();

const clients: Array<Client> = [];

class Client {
    private ws: WebSocket;
    public authed: boolean = false;
    public lastActive: number = Date.now() * 1000;
    public deviceId: string = "";
    private id = 1;
    constructor(ws: WebSocket) {
        this.ws = ws;
    }
    public send(message: WebsocketMessage.WebsocketMessage) {
        message.id = this.id++;
        this.ws.send(JSON.stringify(message));
    }
    public kick() {
        this.ws.close();
    }
    public handleMessage(message:WebsocketMessage.WebsocketMessage){
        //todo
    }
    public active(){
        this.lastActive = Date.now() * 1000;
        eventBus.emit(this.deviceId, "active")
    }
}


app.ws('/device', function (ws, req) {
    let client = new Client(ws);
    clients.push(client);
    ws.on('error', function error(err) {
        console.log(err);
        ws.close();
    });
    ws.on("close", function close() {
        eventBus.emit(client.deviceId, "offline")
        clients.splice(clients.indexOf(client), 1);
    });
    ws.on('message', function message(message) {
        let messageAsString = message.toString()
        console.log(messageAsString)
        let data: WebsocketMessage.WebsocketMessage = JSON.parse(messageAsString)
        if (data.type == WebsocketMessage.WebsocketMessageType.AUTH) {
            let authInfo = data.data;
            if (authInfo.key != ServerAuthKey) {
                console.log("Auth failed with invalid key: " + authInfo.deviceId)
                client.kick();
                return;
            }
            client.authed = true;
            client.deviceId = authInfo.deviceId;
            console.log("Auth success: " + authInfo.deviceId)
            eventBus.emit(client.deviceId, "online")
        }
        if (!client.authed) {
            console.log("Tried to send message without auth: " + client.deviceId)
            return;
        }
        client.active()
        client.handleMessage(data);
    });
    ws.on("ping", function ping() {
        client.active()
    })
    client.send(<WebsocketMessage.WebsocketMessage>{ type: WebsocketMessage.WebsocketMessageType.AUTH, data: null })
});


setTimeout(function () {
    for (let i = 0; i < clients.length; i++) {
        let client = clients[i];
        if (client.lastActive < Date.now() - 1000 * 60 * 60) {
            client.kick();
        }
    }
}, 1000 * 60);



app.get("/api/server/isServer", function (req, res) {
    res.send(JSON.stringify({code:200,data:true}));
})

app.get("/api/device/:deviceId/lastActive", function (req, res) {
    let deviceId = req.params.deviceId;
    let client = clients.find(c => c.deviceId == deviceId);
    if (client) {
        res.send(JSON.stringify({code:200,data:client.lastActive}));
    } else {
        res.send(JSON.stringify({code:200,data:-1}));
    }
})


// user does not need to auth. the deviceId is the auth key since we do not provide a way to list devices
interface UserControlMessage {
    deviceId: string;
    type: WebsocketMessage.WebsocketMessageType,
    data: any;
}
app.ws('/user', function (ws, req) {
    ws.on('error', function error(err) {
        console.log(err);
        ws.close();
    });
    ws.on('message', function message(message) {
        let messageAsString = message.toString()
        console.log(messageAsString)
        let data: UserControlMessage = JSON.parse(messageAsString)
        let client = clients.find(c => c.deviceId == data.deviceId);
        if (!client) {
            console.log("User tring to control nonexistent device: " + data.deviceId)
            return;
        }
        client.send(<WebsocketMessage.WebsocketMessage>{
            type: data.type,
            data: data.data,
        })

    });
})




app.listen(8000, function () {
    console.log('server listening on port 8000!');
});