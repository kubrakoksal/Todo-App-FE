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
!! Change ip and based on your be app configurations (ex: ipconfig windows)<br>

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
