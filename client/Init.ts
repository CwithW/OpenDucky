// init 4G modem and usb gadget

import * as child_process from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const execFile = promisify(child_process.execFile)
export async function init() {
    let current_dir = __dirname
    let script_dir = path.join(current_dir, 'scripts')
    execFile('sh', [path.join(script_dir, 'enable_4g_modem.sh')]).then((stdout) => {
        console.log("enable 4G modem is finished")

    })
    execFile('sh', [path.join(script_dir, 'enable_usb_gadget.sh')]).then((stdout) => {
        console.log("enable usb gadget is finished")
    })
    // fs.chmodSync("hid_gadget_test","777")
}
