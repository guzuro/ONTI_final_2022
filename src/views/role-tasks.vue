<template>
    <div class="role-tasks">
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
                    <div class="flex justify-between w-full">
                        <a-button @click="setInWork(item)">Взять в работу</a-button>
                    </div>
                    <!--                    <div class="flex justify-between w-full" v-if="item.executor">-->
                    <!--                        <b class="mr-5">Исполнитель</b>-->
                    <!--                        {{ item.executor }}-->
                    <!--                    </div>-->
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import TaskService from "../Services/TaskService";
    import TaskTypesService from "../Services/TaskTypesService";
    import UserService from "../Services/UserService";

    export default {
        name: "role-tasks",
        data() {
            return {
                tasks: [],
                tasksTypes: []

            }
        },
        methods: {
            setInWork(task) {
                UserService.setTaskToUser(this.$store.state.user.uid, task)
                    .then(() => {
                        TaskService.setExecutorToTask(this.$store.state.user.uid, task)
                    })
            }
        },
        async created() {
            this.tasks = await TaskService.getTasksByRole(this.$store.state.user.company_guid, this.$store.state.user.role)
            this.tasksTypes = await TaskTypesService.getTaskTypesCascade(this.$store.state.user.company_guid)
        }
    }
</script>

<style scoped>

</style>