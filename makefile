VERSION := 1.0.0

dump-base:
	mongodump --host localhost:27017 --db  tww --out=dumpbase

restore-base:
	mongorestore dumpbase/

git-fetch:
	git fetch && git reset --hard origin/master

build-backend:
	cd ./server/ && docker build -t backend$(VERSION) .

build-frontend:
	cd ./client/ && npm run build

build-nginx:
	cd ./nginx/ && docker build -t nginx:1.0.0 .

start-backend:
	cd ./server && docker-compose up -d

start-frontend:
	cd ./client/ && pm2 start npm --name "next" -- start

prepare-prod:
	cd ./client/ && npm install --force \
	&& cd ../server/ && npm install --force

start-dev:
	cd ./server/ && npm run dev

clean:
	docker-compose down \
	&& cd ./server && docker-compose down
