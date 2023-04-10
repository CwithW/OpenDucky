// send data to usb hid gadget

import * as fs from 'fs';
import * as child_process from 'child_process';
import { getConfig } from "./config";
async function sendRaw(data: Buffer): Promise<boolean> {
    let filename = getConfig()['HidGadgetDeviceFile']
    // open the file every time in case of gadget switching.
    if (!fs.existsSync(filename)) {
        console.log("sendRaw: failed to open " + filename)
        return false;
    }
    let file = fs.openSync(filename, 'w')
    fs.writeSync(file, data)
    return true;
}

function keyboard_fill_report(hid_code: number): Array<number> {
    let result = [0, 0, hid_code, 0, 0, 0, 0, 0]
    return result;
}


export async function sendKey(hid_keyCode: number) {
    let report = keyboard_fill_report(hid_keyCode)
    await sendRaw(Buffer.from(report))
    report = keyboard_fill_report(0)
    await sendRaw(Buffer.from(report))
    
}

// child_process.execSync("./hid_gadget_test /dev/hidg0 keyboard", { input: String.fromCharCode(keyCode) + "\n--quit\n" })

export async function sendKeyDown(hid_keyCode: number) {
    let report = keyboard_fill_report(hid_keyCode)
    await sendRaw(Buffer.from(report))
}

export async function sendKeyUp(hid_keyCode: number) {
    //todo implement keyCode
    let report = keyboard_fill_report(0)
    await sendRaw(Buffer.from(report))

}