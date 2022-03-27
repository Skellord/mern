dump-base:
	mongodump --host localhost:27017 --db  tww --out=dumpbase

restore-base:
	mongorestore dumpbase/

git-fetch:
	git fetch && git reset --hard origin/master

build-backend:
	cd ./server/ && npm run build

build-frontend:
	cd ./client/ && npm run build

build-nginx:
	cd ./nginx/ && docker build -t nginx:1.0.0 .

start-backend:
	cd ./server/build && pm2 start index.js

start-frontend:
	cd ./client/ && pm2 start npm --name "next" -- start

prepare-prod:
	cd ./client/ && npm install --force \
	&& cd ../server/ && npm install --force

start-dev:
	cd ./server/ && npm run dev
