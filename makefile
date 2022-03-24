dump-base:
	mongodump --host localhost:27017 --db  tww --out=dumpbase

restore-base:
	mongorestore dumpbase/
