<template>
    <div class="tasks">
        <a-list item-layout="horizontal" :data-source="tasks" class="w-full">
            <a-list-item slot="renderItem" slot-scope="item" class="w-full">
                <div class="flex flex-col">
                    <a-list-item-meta class="w-full">
                        <a slot="title">{{ item.description }}</a>
                        <a-avatar
                                slot="avatar"
                                src="https://www.reduceimages.com/img/share-icon.png"
                        />
                    </a-list-item-meta>
                    <div class="flex justify-between w-full">
                        <b class="mr-5">Тип</b>
                        <a-cascader
                                class="w-full"
                                :options="tasksTypes"
                                :default-value="item.taskType"
                                :disabled="true"
                        />
                    </div>
                    <div class="flex justify-between w-full" v-if="item.executor">
                        <b class="mr-5">Исполнитель</b>
                        {{ item.executor }}
                    </div>
                </div>
            </a-list-item>
        </a-list>

    </div>
</template>

<script>
    import TaskService from "../Services/TaskService";
    import TaskTypesService from "../Services/TaskTypesService";

    export default {
        name: "tasks",
        data() {
            return {
                tasks: [],
                tasksTypes: []
            }
        },
        methods: {
            async getTasks() {
                this.tasks = await TaskService.getTasks(this.$store.state.user.company_guid)
            },
        },
        async created() {
            this.tasksTypes = await TaskTypesService.getTaskTypesCascade(this.$store.state.user.company_guid)
            this.getTasks()
        }
    }
</script>

<style scoped>
    .ant-list-item {
        display: block !important;
    }
</style>