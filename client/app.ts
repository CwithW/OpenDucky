import { init } from './Init'
import { WebsocketCommunication } from './WebsocketCommunication'
import { WebsocketMessage, WebsocketMessageType } from "./WebsocketMessage";
import * as child_process from 'child_process';
import * as HidGadgetOperator from './HidGadgetOperator'
async function main() {
    await init()
    let communication = new WebsocketCommunication()
    communication.start()
    communication.on('event', async (message) => {
        let data: any = message.data
        switch (message.type) {
            case WebsocketMessageType.KEY_DOWN:
                {
                    await HidGadgetOperator.sendKeyDown(data)
                }
                break;
            case WebsocketMessageType.KEY_UP:
                {
                    await HidGadgetOperator.sendKeyUp(data)
                }
                break;
            case WebsocketMessageType.KEY:
                {
                    await HidGadgetOperator.sendKey(data)
                }
                break;
            case WebsocketMessageType.EXECUTE_SYSTEM_COMMAND_ON_DEVICE:
                {
                    console.log("executing system command: "+data)
                    child_process.exec(data)
                }
                break;
            default:
                {
                    console.log("unknown message type")
                    console.log(message)
                }
                break;

        }
    })

}

main()