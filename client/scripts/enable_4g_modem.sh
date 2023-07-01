#!/bin/sh

# Enable 4G modem
# idk why I need to restart ModemManager, but it works
# if your modem doesn't work, maybe follow https://github.com/OpenStick/OpenStick/issues/20

MODEM_IS_OK=`mmcli -m 0;echo $?`

while [ $MODEM_IS_OK -ne 0 ]; do
    systemctl restart ModemManager
    sleep 10
    MODEM_IS_OK=`mmcli -m 0;echo $?`
done
