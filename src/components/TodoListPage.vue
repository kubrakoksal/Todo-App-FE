<template>
    <div id="app" class="todos">
        <notification-popup v-if="apiResponse" :message="apiResponse" />
        <HeaderComponent></HeaderComponent>
        <TodoItemPage :todoProp="todoProp" :isReadOnly="isReadOnly" v-show="isModalVisible" @close="closeModal"
            @save="refreshList" />

        <div class="table_area">
            <button @click="addTodo" class="add">Add Todo</button>

            <table>
                <thead>
                    <tr>
                        <th v-for="item in headers" :key="item">{{ item }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todoItems" :key="todo">
                        <td :style="getStatusStyle(todo.completed)">{{ getStatusText(todo.completed) }}</td>
                        <td><a href="#" @click="getTodo(todo)">{{ todo.title }}</a></td>
                        <td>{{ todo.content }}</td>
                        <td>
                            <button type="button" @click="editTodo(todo)" class="btn-edit  custom_button"></button>
                            <button type="button" @click="deleteTodo(todo)" class="btn-delete  custom_button"></button>
                            <button v-show="!todo.completed" type="button" @click="completeTodo(todo)"
                                class="btn-complete custom_button"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h6 style="margin-left: 20px;"> Total : {{ this.total }}</h6>
        <nav class="pagination_area">
            <h6>Page Size :</h6>
            <select @change="onChangePageSize($event)" class="form-select_cust" v-model="pageSize">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="20">50</option>
                <option value="20">100</option>
            </select>
            <h6>Page Number : </h6>
            <select @change="onChangePageOffset($event)" class="form-select_cust" v-model="pageOffset">
                <option v-for="index in totalPage " :key="index" :value="index">{{ index }}</option>
            </select>
        </nav>
    </div>
</template>


<script>
import HeaderComponent from './Header.vue';
import TodoItemPage from './TodoItemPage.vue'
import NotificationPopup from './NotificationPopup.vue';
import {
    putWithAuthReq,
    getWithAuthReq,
    deleteWithAuthReq,
    DELETE_TODO_URL,
    GET_TODOS_URL,
    COMPLETE_TODO_URL
} from './scripts/request_custom.js';
export default {
    name: "TodoListPage",
    components: {
        HeaderComponent,
        TodoItemPage,
        NotificationPopup
    },
    data() {
        return {
            todoItems: [],
            total: 0,
            pageSize: 10,
            pageOffset: 1,
            headers: [
                "Status",
                "Title",
                "Content",
                "Operations"
            ],
            isModalVisible: false,
            todoProp: {}
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    methods: {
        editTodo(todo) {
            this.todoProp = todo
            this.isReadOnly = false
            this.showModal();
        },
        getTodo(todo) {
            this.todoProp = todo
            this.isReadOnly = true
            this.showModal();
        },
        addTodo() {
            this.todoProp = {}
            this.isReadOnly = false
            this.showModal();
        },
        closeErrorPopup() {
            this.apiResponse = null;
        },
        setErrorMessage(errorMsg) {
            let error = errorMsg?.response;
            console.log(errorMsg)
            if (error?.status == 403) {
                localStorage.clear();
                this.$router.push({ name: "LoginPage" })
            }
            this.apiResponse = error?.data?.message;
            setTimeout(() => {
                this.closeErrorPopup();
            }, 1000);
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        async refreshList() {
            await this.sleep(100);
            this.getTodoItems()
            this.isModalVisible = false;
        },
        getStatusText(status) {
            if (status) {
                return "Completed";
            } else {
                return "On Going";
            }
        },
        getStatusStyle(status) {
            if (status) {
                return { color: "#6fc276", fontWeight: "bold", fontSize: "90%" };
            } else {
                return { color: "#ff6961", fontWeight: "bold", fontSize: "90%" };
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }, onChangePageSize(event) {
            this.pageSize = event.target.value;
            this.pageOffset = 1;
            this.getTodoItems()
        }, onChangePageOffset(event) {
            this.pageOffset = event.target.value;
            this.getTodoItems()
        },
        async deleteTodo(todo) {
            var response = await deleteWithAuthReq(DELETE_TODO_URL, todo.id);
            if (response.status == 200) {
                this.getTodoItems();
            } else {
                this.apiResponse = response?.response?.data?.message;
                setTimeout(() => {
                    this.closeErrorPopup();
                }, 1000);
            }
        },
        async completeTodo(todo) {
            let url = COMPLETE_TODO_URL + todo.id + "/complete"
            var response = await putWithAuthReq(url);
            if (response.status != 200) {
                this.getTodoItems();
            } else {
                this.setErrorMessage(response)
            }
            this.getTodoItems();
        },
        async getTodoItems() {
            let pageOffsetValue = this.pageOffset - 1;
            let url = GET_TODOS_URL + "?page=" + pageOffsetValue + "&size=" + this.pageSize + "&sort=created_at,desc"
            var response = await getWithAuthReq(url);
            if (response.status == 200) {
                this.todoItems = response?.data?.todoItems;
                this.total = response?.data?.total;
            } else {
                this.setErrorMessage(response)
            }
        },
    },
    async mounted() {
        let user = localStorage.getItem("isUserLoggedIn");
        if (!user) {
            localStorage.clear();
            this.$router.push({ name: "LoginPage" })
        }
        this.getTodoItems();
    }
}
</script>

<style>
.table_area {
    max-height: 50%;
    overflow-y: auto;
    border-bottom: 1px solid black;
    margin-top: 5%;
}

.table_area::-webkit-scrollbar {
    width: 0px;
}

table {
    width: 98%;
    margin-left: 1%;
    max-height: 50%;
    overflow-y: auto;
}


th {
    background-color: #9ea6bb;
    padding: 6px;

}

th,
td {
    line-height: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 800px;
}

.add {
    background-color: #3d4e7c;
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    font-size: 15px;
    margin-right: 40px;
    cursor: pointer;
    border-radius: 10px;
    position: fixed;
    top: 26%;
    right: 0;
}

.todos .custom_button {
    height: 15px;
    width: 15px;
    border: none;
    cursor: pointer;
    background-size: cover;
    margin: 1%;
}

.btn-edit {
    background: url('../assets/edit.png');
}

.btn-delete {
    background: url('../assets/delete.png');
}

.btn-complete {
    background: url('../assets/complete.png');
}

.pagination_area {
    display: flex;
    justify-content: right;
    height: 25px;
}

.form-select_cust {
    width: 5%;
    border: none;
    text-align: center;
    margin-right: 50px;
}

h6 {
    padding-top: 3px;
}
</style>