VERSION := 1.0.0

dump-base:
	mongodump --host localhost:27017 --db  tww --out=dumpbase

restore-base:
	mongorestore dumpbase/

git-fetch:
	git fetch && git reset --hard origin/master

build-backend:
	cd ./server/ && docker build -t skellord/tww:backend .

build-frontend:
	cd ./server/ && docker-compose up -d \
	&& cd ../client/ && docker build -t skellord/tww:frontend .

build-nginx:
	cd ./nginx/ && docker build -t nginx:1.0.0 .

start-backend:
	cd ./server && docker-compose up -d

start-frontend:
	docker-compose up -d

prepare-prod:
	cd ./client/ && npm install --force \
	&& cd ../server/ && npm install --force

start-dev:
	cd ./server/ && npm run dev

clean:
	docker-compose down \
	&& cd ./server && docker-compose down

create-network:
	docker network create tww-network

start-prod: start-backend start-frontend

docker-push:
	docker push skellord/tww -a

docker-pull:
	docker pull skellord/tww -a
