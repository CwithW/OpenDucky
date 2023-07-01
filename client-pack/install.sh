#!/bin/sh -e

# 1. move nodejs
tar -zxf node*.tgz
rm -rf node*.tgz
mv node* /root/node
chmod +x /root/node/bin/node

# 2. move client
mv ./client /root/client

# 3. write autostart into /etc/rc.local
cat <<EOF > /etc/rc.local
#!/bin/sh -e

cd /root/client
/root/node/bin/node app.js
EOF
chmod +x /etc/rc.local

# 4. it is done
echo "done"
reboot