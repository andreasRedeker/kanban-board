# 看板 Kanban Board
___
Full Stack Webapp with Java, Spring Boot, MariaDB and Angular

## MariaDB Docker Setup
Run MariaDB Container
```shell
docker run --detach --name kanban-mariadb -p 3306:3306 --env MARIADB_ROOT_PASSWORD=my-secret-pw  mariadb:latest
```
Connect to MariaDB
```shell
docker exec -it kanban-mariadb mariadb --user root -pmy-secret-pw
```
Create Database
```roomsql
CREATE DATABASE kanban_db;
```