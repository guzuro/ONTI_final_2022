<template>
    <div class="employee-list" v-if="this.$store.state.user">
        <h1>Сотрудники</h1>
        <div class="flex justify-end">
            <a-button @click="employeeModalActive = true">
                Создать
            </a-button>
        </div>

        <a-table class="mt-5"
                 :columns="columns"
                 :data-source="employees"
        >
            <a slot="last_name" slot-scope="last_name">{{ last_name }}</a>
            <a slot="first_name" slot-scope="first_name">{{ first_name }}</a>
            <a slot="role" slot-scope="role">{{ role }}</a>

            <span slot="action"
                  slot-scope="record"
            >
                <a @click="removeEmployee(record)">Delete</a>
                <a @click="editEmployee(record)">Edit</a>
            </span>
        </a-table>

        <a-modal v-model="employeeModalActive"
                 @ok="handleOk"
        >
            <main-user-info-form v-model="employee"/>
            <field-wrapper
                    class="mt-2"
                    field-title="Должность">
                <a-select default-value="Менеджер"
                          v-model="employee.role"
                >
                    <a-select-option value="Администратор">
                        Администратор
                    </a-select-option>
                    <a-select-option value="Менеджер">
                        Менеджер
                    </a-select-option>
                    <a-select-option value="Кладовщик">
                        Кладовщик
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
                }
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
                console.log(employee)
            },
            editEmployee(employee) {
                console.log(employee)
            }
        },
        created() {
            this.getEmployees()
        }
    }
</script>

<style scoped>

</style>