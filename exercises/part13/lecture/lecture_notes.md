### create a fly app with postgres
````
youqin@youqin-Latitude-7490:~/Downloads/CSM_HU/FullStackCourse_HUMSCS/exercises/part13$ flyctl postgres create
? Choose an app name (leave blank to generate one): fullstack-relational-db
automatically selected personal organization: youqinSun
? Select region: Stockholm, Sweden (arn)
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
Creating postgres cluster in organization personal
Creating app...
Setting secrets on app fullstack-relational-db...
Provisioning 1 of 1 machines with image flyio/postgres:14.6@sha256:9cfb3fafcc1b9bc2df7c901d2ae4a81e83ba224bfe79b11e4dc11bb1838db46e
Waiting for machine to start...
Machine 59185770ef7583 is created
==> Monitoring health checks
  Waiting for 59185770ef7583 to become healthy (started, 3/3)

Postgres cluster fullstack-relational-db created
  Username:    postgres
  Password:    wq73LUbyp65Jok3
  Hostname:    fullstack-relational-db.internal
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:wq73LUbyp65Jok3@fullstack-relational-db.internal:5432

Save your credentials in a secure place -- you won't be able to see them again!

Connect to postgres
Any app within the youqinSun organization can connect to this Postgres using the above connection string

Now that you've set up Postgres, here's what you need to understand: https://fly.io/docs/postgres/getting-started/what-you-should-know/
````

### A psql concole connection to the database can be opened as follows
````
flyctl postgres connect -a fullstack-relational-db

Connecting to fdaa:1:1dd1:a7b:e8:930f:f089:2... complete
psql (14.6 (Debian 14.6-1.pgdg110+1))
Type "help" for help.
````

### local connection to the database should first be enabled by tunneling the localhost port 5432 to the Fly.io database port using the following command
````
flyctl proxy 5432 -a fullstack-relational-db 

Update available 0.0.456 -> v0.0.458.
Run "flyctl version update" to upgrade.
Proxying local port 5432 to remote [fullstack-relational-db.internal]:5432
````

### Using the psql console

#### the main psql command \d, which tells you the contents of the database:
````
postgres=# \d
Did not find any relations.
````

#### create a table for notes:
````
postgres=# CREATE TABLE notes (
id SERIAL PRIMARY KEY,
content text NOT NULL,
important boolean,
date time
);
````

#### \d command, which tells us what tables are in the database:
````
postgres=# \d
List of relations
Schema |     Name     |   Type   |  Owner   
--------+--------------+----------+----------
public | notes        | table    | postgres
public | notes_id_seq | sequence | postgres
(2 rows)
````
#### \d notes, we can see how the notes table is defined:
````
postgres=# \d notes
server closed the connection unexpectedly
	This probably means the server terminated abnormally
	before or while processing the request.
The connection to the server was lost. Attempting reset: Succeeded.
postgres=# \d notes
                                     Table "public.notes"
  Column   |          Type          | Collation | Nullable |              Default              
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('notes_id_seq'::regclass)
 content   | text                   |           | not null | 
 important | boolean                |           |          | 
 date      | time without time zone |           |          | 
Indexes:
    "notes_pkey" PRIMARY KEY, btree (id)
````
#### add some content to the table:
````
postgres=# insert into notes (content, important) values ('Relational databases rule the world', true);
INSERT 0 1
postgres=# insert into notes (content, important) values ('MongoDB is webscale', false);
INSERT 0 1
````

####  see what the created content looks like:
````
postgres=# select * from notes;
 id |               content               | important | date 
----+-------------------------------------+-----------+------
  1 | Relational databases rule the world | t         | 
  2 | MongoDB is webscale                 | f         | 
(2 rows) 
````

### destroy the database from the console
````
postgres=# drop table notes;
DROP TABLE
postgres=# \d
Did not find any relations.
````

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lIiwiaWQiOjEsImlhdCI6MTY3NjkwNDAwM30.zQSgRTLvfOl8Q3FVN8MbbCS7w951cBtvYDPWp5tryno",
"username": "me",
"name": "my name"
}
````
````

````
````

````
````

````
````

````
````

````
````

````
````

````
````

````
````

````
````

````
````
