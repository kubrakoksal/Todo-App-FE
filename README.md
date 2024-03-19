# Todo List Application FE
This application is a demo FE project includes following operations
- Login
- Register
- CRUD Todo Operations

## Technology Stack
- Vue.js

## Installation
### PreRequests
1. Docker (for Dockerized database, front-end, and back-end applications)
2. bentonam/couchbase-docker and kkoksal/todo-app-be [ref](https://github.com/kubrakoksal/Todo-App) 

### Build and Run App Locally (To use run you can skip this step)
```bash
git clone https://github.com/kubrakoksal/Todo-App-FE.git
cd Todo-App-FE
npm install
npm run serve
```

### Run Todo App FE (Docker)
```bash
docker run -d -p 8081:8081 -e PORT=8081 -e VUE_APP_IP={{ip}} -e VUE_APP_PORT=8080  kkoksal/todo-app-fe npm run serve
```
!! Change VUE_APP_IP and VUE_APP_PORT based on your be app configurations (ex: ipconfig windows)<br>
http://ip:port/login (http://localhost:8081/login)

# Usage
REGISTER <br>
![image](https://github.com/kubrakoksal/Todo-App-FE/assets/47196852/f590958b-071f-48bd-b9e0-5e9a869738f4)
LOGIN <br>
![image](https://github.com/kubrakoksal/Todo-App-FE/assets/47196852/f53f89a5-def2-4666-b466-4de2939e90e8)
TODO LIST PAGE <br>
![image](https://github.com/kubrakoksal/Todo-App-FE/assets/47196852/efe620e7-9c29-40b5-a752-8e21291a446c)

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


