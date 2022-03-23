<template>
    <div class="task-types">

        <a-button @click="isModalActive = true" class="mb-2"> Добавить</a-button>

        <a-modal v-model="isModalActive">
            <field-wrapper fieldTitle="Тип">
                <a-input v-model="taskType.name"/>
            </field-wrapper>
            <a-divider/>

            <field-wrapper fieldTitle="Название этапа">
                <a-input v-model="stage.name"/>
            </field-wrapper>
            <field-wrapper fieldTitle="Фиксированный норматив">
                <a-input-number v-model="stage.standart"/>
            </field-wrapper>
            <field-wrapper fieldTitle="Значение к базе, %">
                <a-input-number v-model="stage.multiply"/>
            </field-wrapper>
            <field-wrapper fieldTitle="Владельцы задачи">
                <a-select mode="tags" class="w-full" placeholder="Выберите должности"
                          @change="(values) => stage.owners = values">
                    <a-select-option v-for="role in rolesOptions"
                                     :key="role.value"
                    >
                        {{ role.label }}
                    </a-select-option>
                </a-select>
            </field-wrapper>
            <a-button class="my-2" @click="handleAddStageClick">Добавить этап</a-button>
            <a-divider/>
            Этапы типа:
            <div v-for="(stage, index) in taskType.stages"
                 :key="index"
                 class="mb-2"
            >
                <span @click="removeTaskTypeStage(index)">-</span>
                <div class="flex justify-between mb-2">
                    <b> Этап:</b> <span>{{stage.name}}</span>
                </div>
                <div class="flex justify-between">
                    <b> Категория:</b>
                    <ul>
                        <li v-for="(owner, idx) in stage.owners" :key="idx">
                            {{ getOwnerLabel(owner) }}
                        </li>
                    </ul>
                </div>
                <a-divider/>
            </div>

            <template slot="footer">
                <a-button key="submit" @click="addTaskType">
                    Сохранить
                </a-button>
            </template>
        </a-modal>


        <a-table :columns="columns" :data-source="data">
            <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <div v-for="(stage, index) in record.stages"
                     :key="index"
                     class="mb-2"
                >
                    <div class="flex justify-between mb-2">
                        <b> Этап:</b> <span>{{stage.name}}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <b> Категория:</b>
                        <ul>
                            <li v-for="(owner, idx) in stage.owners" :key="idx">
                                {{ getOwnerLabel(owner) }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex justify-between mb-2" v-if="stage.standart">
                        <b> Фиксированный норматив:</b>
                        <span>{{stage.standart}}</span>
                    </div>
                    <div class="flex justify-between mb-2" v-if="stage.multiply">
                        <b> Значение к базе, %</b>
                        <span>{{stage.multiply}}</span>
                    </div>
                    <a-divider/>
                </div>
            </div>
        </a-table>
    </div>
</template>

<script>
    import FieldWrapper from "../components/FieldWrapper";
    import RolesService from "../Services/RolesService";
    import {cloneDeep} from 'lodash'
    import TaskTypesService from "../Services/TaskTypesService";

    const columns = [
        {title: 'Тип', dataIndex: 'name', key: 'name'},
    ];

    export default {
        name: "task-types",
        components: {
            FieldWrapper
        },
        data() {
            return {
                cloneDeep,
                columns,
                isModalActive: false,
                taskType: {
                    uid: '',
                    name: '',
                    stages: []
                },
                stage: {
                    name: '',
                    standart: null,
                    multiply: null,
                    owners: [],
                },
                data: [],
                rolesOptions: []
            }
        },
        methods: {
            handleAddStageClick() {
                this.taskType.stages.push(cloneDeep(this.stage))
                this.stage = {
                    name: '',
                    standart: null,
                    multiply: null,
                    owners: [],
                }
            },
            getOwnerLabel(value) {
                return this.rolesOptions.find(o => o.value === value).label
            },
            getRoles() {
                RolesService.getRolesOptions(this.$store.state.user.company_guid)
                    .then(res => this.rolesOptions = res)
            },
            removeTaskTypeStage(index) {
                this.taskType.stages.splice(index, 1)
            },
            addTaskType() {
                TaskTypesService.addType(this.taskType, this.$store.state.user.company_guid)
                    .then(this.getTaskTypes)
                    .then(() => {
                        this.taskType = {
                            uid: '',
                            name: '',
                            stages: []
                        }
                        this.stage = {
                            name: '',
                            standart: null,
                            multiply: null,
                            owners: [],
                        }
                        this.isModalActive = false
                    })
            },
            async getTaskTypes() {
                this.data = await TaskTypesService.getTypes(this.$store.state.user.company_guid)
            }
        },
        created() {
            this.getRoles()
            this.getTaskTypes()
        }
    }
</script>

<style scoped>

</style>