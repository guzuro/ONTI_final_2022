<template>
    <div class="roles-list">
        <a-spin :spinning="spinning">
            <div class="roles-list">
                <a-button
                        @click="handleAddRoleButtonClick"
                        class="mb-5"
                >Добавить должность
                </a-button>
                <div v-if="roles && roles.length" class="flex flex-wrap">
                    <div v-for="(role, index) in roles" :key="index"
                         class="mb-2 w-1/3">
                        <a-card hoverable>
                            <template slot="actions" class="ant-card-actions">
                                <a-icon key="edit" type="edit" @click="handleEditRoleButtonClick(role)"/>
                            </template>
                            <a-card-meta :title="role.name"
                                         :description="`Стоимость: ${role.cost_month} у.е/мес`"
                            />
                        </a-card>
                    </div>
                </div>
                <div v-else>Роли еще не созданы</div>
                <a-modal v-model="isModalActive"
                         :title="modalMode === 'new' ? 'Добавить' : 'Редактировать'">
                    <field-wrapper fieldTitle="Название должности">
                        <a-input v-model="role.name"/>
                    </field-wrapper>
                    <field-wrapper class="mt-2" fieldTitle="Стоимость в мес, у.е/мес">
                        <a-input v-model="role.cost_month"/>
                    </field-wrapper>
                    <field-wrapper class="mt-2" fieldTitle="Стоимость в час, у.е/мес">
                        <a-input disabled v-model="role.cost_hour"/>
                    </field-wrapper>
                    <template slot="footer">
                        <a-button key="submit" @click="modalMode === 'new' ? createRole() : updateRole()">
                            Сохранить
                        </a-button>
                    </template>
                </a-modal>
            </div>
        </a-spin>
    </div>
</template>

<script>
    import RolesService from "../Services/RolesService";
    import FieldWrapper from "../components/FieldWrapper";

    export default {
        name: "roles-list",
        components: {
            FieldWrapper
        },
        data() {
            return {
                roles: null,
                spinning: false,
                isModalActive: false,
                modalMode: "new",
                role: {
                    name: '',
                    cost_month: 0,
                    cost_hour: 0
                }
            }
        },
        watch: {
            'role.cost_month'(value) {
                this.role.cost_hour = (value / 20) / 8
            },
            'isModalActive'(state) {
                if (!state) {
                    this.role = {
                        uid: '',
                        name: '',
                        cost_month: 0,
                        cost_hour: 0
                    }
                }
            }
        },
        methods: {
            handleAddRoleButtonClick() {
                this.modalMode = 'new'
                this.isModalActive = true
            },
            handleEditRoleButtonClick(role) {
                this.modalMode = 'edit'
                this.role = role
                this.isModalActive = true
            },
            createRole() {
                RolesService.createRole(this.role, this.$store.state.user.company_guid)
                    .then(this.getRoles)
                    .finally(() => this.isModalActive = false)
            },
            updateRole() {
                RolesService.updateFields(this.role.uid, {...this.role})
                    .then(this.getRoles)
                    .finally(() => this.isModalActive = false)
            },
            async getRoles() {
                try {
                    this.spinning = true
                    this.roles = await RolesService.getRoles(this.$store.state.user.company_guid)
                } finally {
                    this.spinning = false
                }
            }
        },
        async created() {
            this.getRoles()
        }
    }
</script>

<style scoped>

</style>