#!/bin/sh


# do not open hotspot if connected to wifi
sleep 5
nmcli | grep -q 'wlan0: connected to' && exit 0

AP_CON="openducky-ap"
AP_SSID="OpenDucky"
AP_PASSWORD="12345678"
AP_ADDRESS=${AP_ADDRESS:-"192.168.69.1/24"}
AP_CHANNEL=${AP_CHANNEL:-"3"}

# delete if existing
nmcli connection delete "$AP_CON" > /dev/null

# create profile
nmcli connection add \
    type wifi ifname wlan0 con-name "$AP_CON" \
    ssid "$AP_SSID" autoconnect no \
    ipv4.addresses "$AP_ADDRESS" \
    ipv4.method shared \
    wifi.mode ap \
    wifi.band bg wifi.channel "$AP_CHANNEL" \
    wifi-sec.key-mgmt wpa-psk \
    wifi-sec.proto rsn \
    wifi-sec.group ccmp wifi-sec.pairwise ccmp \
    wifi-sec.psk "$AP_PASSWORD"

# connect to profile is creating ap
nmcli connection up "$AP_CON"