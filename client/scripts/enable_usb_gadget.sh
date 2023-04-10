#!/bin/bash

# disable rndis,adb and enable hid

# gc的实现会导致被识别成adb 要修改vendorid和productid

# check if hid is already enabled
gc -l | grep -q 'hid' && exit 0

gc -d
#gc -r adb
#gc -r rndis.1
gc -c
gc -a hid
gc -e

HID_GADGET_FINE=`ls /dev/hidg* 2>/dev/null | wc -l`
while [ $HID_GADGET_FINE -eq 0 ]; do
    gc -d;gc -e
    sleep 1
    HID_GADGET_FINE=`ls /dev/hidg* 2>/dev/null | wc -l`
done