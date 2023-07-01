client: 
	mkdir -p dist;cd client;sh build.sh;mv dist ../dist/client
client-pack:
	mkdir -p dist;cd client-pack;sh build.sh;mv dist ../dist/client-pack
server: 
	mkdir -p dist;cd server;sh build.sh; mv dist ../dist/server