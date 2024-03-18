<template>
    <div class="modal-backdrop-cust">
        <div class="modal_cust">
            <header class="modal_header">
                <input class="title" type="text" v-model="titleValue" placeholder="Example Title"
                    :disabled="isReadOnly" />
                <button type="button" class="btn-close" @click="close"></button>
            </header>

            <textarea class="content" v-model="contentValue" placeholder="Type something here..."
                :disabled="isReadOnly"></textarea>
            <footer class="modal_footer">
                <button type="button" class="btn_cust" @click="saveTodoItem">Save</button>
                <button type="button" class="btn_cust" @click="close">Close</button>
            </footer>
        </div>
    </div>
</template>

<script>
import {
    putWithAuthReq,
    postWithAuthReq,
    EDIT_TODO_URL,
    ADD_TODO_URL
} from './scripts/request_custom.js';
export default {
    props: {
        todoProp: Object,
        isReadOnly: {
            type: Boolean,
            default: false
        }
    },
    name: 'TodoItemPage',
    data() {
        return {
            titleValue: "",
            contentValue: ""
        }
    },
    watch: {
        todoProp: {
            handler(newVal) {
                this.titleValue = newVal?.title || '';
                this.contentValue = newVal?.content || '';
            },
            deep: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save() {
            this.$emit('save');
        },
        async saveTodoItem() {

            if (this.todoProp?.id == null) {
                this.addTodoItem()
            } else {
                this.editTodoItem()
            }
        },
        async editTodoItem() {
            let url = EDIT_TODO_URL + this.todoProp?.id
            let body = { content: this.contentValue, title: this.titleValue }
            var response = await putWithAuthReq(url, body);
            if (response.status == 200) {
                this.save()
            } else {
                alert(response?.response?.data?.message)
                this.close()
            }
        },
        async addTodoItem() {
            let url = ADD_TODO_URL
            let body = { content: this.contentValue, title: this.titleValue }
            var response = await postWithAuthReq(url, body);
            if (response.status == 200) {
                this.save()
            } else {
                alert(response?.response?.data?.message)
                this.close()
            }
        }
    }
};

</script>

<style>
.modal-backdrop-cust {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal_cust {
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 80%;
}

.modal_header {
    padding: 15px;
    display: flex;
    border-bottom: 1px solid #eeeeee;
}

.modal_footer {
    padding: 4px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #eeeeee;
}


.title {
    width: 90%;
    height: 80%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 10px;
    resize: none;
    border: none;
    font-size: 1rem;
}

.content {
    width: 100%;
    height: 100%;
    display: block;
    margin-bottom: 10px;
    resize: none;
    border: none;
    font-size: 16px;
}

.btn_cust {
    background-color: #3d4e7c;
    border: none;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 10px;
    width: 100px;
    margin-left: 15px;
}
</style>