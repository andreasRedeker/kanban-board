## Development Environment
In order to run the project local, add the following VM option: 
```shell
-Dspring.profiles.active=dev
```

For IntelliJ Community Edition:
(Run) Configuration -> Edit -> Modify options -> Java -> Add VM options -> enter the VM option from above

## Docker
```shell
docker build -t kanban-backend .
```

```shell
docker run -p 8080:8080 kanban-backend
```