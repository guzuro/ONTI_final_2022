<template>
    <div class="task">
        <field-wrapper field-title="Описание задачи">
            <a-input v-model="task.description"/>
        </field-wrapper>
        <field-wrapper class="mt-2" field-title="Тип задачи">
            <a-cascader :options="tasksTypes"
                        placeholder="Please select"
                        @change="handleOnChange"
            />
        </field-wrapper>

        <a-button class="mt-2" @click="addTask">Добавить задачу</a-button>
    </div>
</template>

<script>
    import TaskService from "../Services/TaskService";
    import FieldWrapper from "../components/FieldWrapper";
    import {v4 as uuidv4} from 'uuid';
    import TaskTypesService from "../Services/TaskTypesService";

    export default {
        name: "tasks",
        components: {
            FieldWrapper
        },
        data() {
            return {
                task: {
                    id: uuidv4().split('-')[0],
                    taskType: [],
                    description: '',
                },
                tasksTypes: []
            }
        },
        methods: {
            handleOnChange(value) {
                this.task.taskType = value
            },
            addTask() {
                TaskService.createTask(this.task, this.$store.state.user.company_guid)
                    .then(() => {
                        this.task = {
                            id: uuidv4().split('-')[0],
                            taskType: [],
                            description: '',
                        }
                        this.$message.info('Успешно');

                    })
            }
        },

        async created() {
            this.tasksTypes = await TaskTypesService.getTaskTypesCascade(this.$store.state.user.company_guid)
        }
    }
</script>

<style scoped>

</style>