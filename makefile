client: 
	mkdir -p dist;cd client;sh build.sh;mv dist ../dist/client
server: 
	mkdir -p dist;cd server;sh build.sh; mv dist ../dist/server