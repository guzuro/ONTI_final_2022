<template>
    <div class="employee-list" v-if="this.$store.state.user && isMounted">
        <h1>Сотрудники</h1>
        <div class="flex justify-end">
            <a-button @click="employeeModalActive = true">
                Создать
            </a-button>
        </div>

        <a-table class="mt-5"
                 :columns="columns"
                 :data-source="employees"
                 :row-key="record => record.uid"
        >
            <template slot="role" slot-scope="role"> {{ rolesOptions.find(o => o.value === role).label }}</template>

            <span slot="action"
                  slot-scope="record"
            >
                <a @click="removeEmployee(record)">Delete</a>
            </span>
        </a-table>

        <a-modal v-model="employeeModalActive"
                 @ok="handleOk"
        >
            <main-user-info-form v-model="employee"/>
            <field-wrapper
                    class="mt-2"
                    field-title="Должность">
                <a-select v-model="employee.role"
                >
                    <a-select-option v-for="(role, index) in rolesOptions"
                                     :key="index"
                                     :value="role.value">
                        {{role.label}}
                    </a-select-option>
                </a-select>
            </field-wrapper>
        </a-modal>

    </div>
</template>

<script>
    import MainUserInfoForm from "../components/MainUserInfoForm";
    import FieldWrapper from "../components/FieldWrapper";
    import AuthService from "../Services/AuthService";
    import EmployeeService from "../Services/EmployeeService";
    import RolesService from "../Services/RolesService";

    const columns = [
        {
            title: 'Фамилия',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Имя',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Должность',
            dataIndex: 'role',
            key: 'role',
            scopedSlots: {customRender: 'role'}
        },
        {
            title: 'Действия',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];

    export default {
        name: "employee-list",
        components: {
            FieldWrapper,
            MainUserInfoForm
        },
        data() {
            return {
                isMounted: false,
                columns,
                employees: [],
                employeeModalActive: false,
                employee: {
                    email: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    role: '',
                    company_guid: this.$store.state.user.company_guid
                },
                rolesOptions: []
            }
        },
        methods: {
            getEmployees() {
                EmployeeService.getEmployees(this.$store.state.user.uid, this.$store.state.user.company_guid)
                    .then((response) => this.employees = response)
            },
            handleOk() {
                AuthService.signUp(this.employee)
                    .then(() => {
                        this.employeeModalActive = false
                        this.getEmployees()
                    })
            },
            removeEmployee(employee) {
                EmployeeService.deleteEmployee(employee.uid)
                    .then(this.getEmployees)
            },
            getRoles() {
                RolesService.getRolesOptions(this.$store.state.user.company_guid)
                    .then(res => this.rolesOptions = res)
            }
        },
        getOwnerLabel(value) {
            return this.rolesOptions.find(o => o.value === value).label
        },
        created() {
            this.getRoles()
            this.getEmployees()
        },
        mounted() {
            this.isMounted = true
        }
    }
</script>

<style scoped>

</style>