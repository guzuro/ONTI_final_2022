<template>
    <div class="in-work-tasks">
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
    import UserService from "../Services/UserService";
    import TaskTypesService from "../Services/TaskTypesService";

    export default {
        name: "in-work-tasks",
        data() {
            return {
                tasks: [],
                tasksTypes: []
            }
        },
        async created() {
            this.tasks = await UserService.getTasksInWork(this.$store.state.user.uid)
            this.tasksTypes = await TaskTypesService.getTaskTypesCascade(this.$store.state.user.company_guid)
        }
    }
</script>

<style scoped>

</style>