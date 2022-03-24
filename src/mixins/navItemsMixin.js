import {ADMIN, DISPETCHER} from "./CONSTANTS";

export default {
    computed: {
        navItems() {
            if (this.$store.state.user !== null) {
                return [
                    {
                        path: this.$router.resolve({
                            name: 'Dashboard',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                        isVisible: () => true,
                        name: 'Dashboard',
                        icon: 'appstore',
                    },
                    {
                        path: this.$router.resolve({
                            name: 'Employees',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                        isVisible: () => this.$store.state.user.role === '9hKaI9LIi83WYIcwiyR7',
                        name: 'Сотрудники',
                        icon: 'team',
                    },
                    {
                        path: this.$router.resolve({
                            name: 'Task',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                        isVisible: () => this.$store.state.user.role === 'DnoUL2zTUKYjaLxVTpyk',
                        name: 'Добавить задачу',
                    },
                    {
                        path: this.$router.resolve({
                            name: 'Tasks',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                        isVisible: () => this.$store.state.user.role === 'DnoUL2zTUKYjaLxVTpyk',
                        name: 'Задачи',
                    },
                    {
                        name: "Справочники",
                        isVisible: () => this.$store.state.user.role === '9hKaI9LIi83WYIcwiyR7',
                        guid: '1',
                        children: [
                            {
                                name: "Категории сотрудников",
                                path: this.$router.resolve({
                                    name: 'Roles',
                                    params: {
                                        userId: this.$store.state.user.uid.toString(),
                                    },
                                }).href,
                            },
                            {
                                name: 'Типы задач',
                                path: this.$router.resolve({
                                    name: 'TaskTypes',
                                    params: {
                                        userId: this.$store.state.user.uid.toString(),
                                    },
                                }).href,
                            },
                        ]
                    },
                    {
                        name: 'Все задачи',
                        isVisible: () => this.$store.state.user.role !== ADMIN && this.$store.state.user.role !== DISPETCHER,
                        path: this.$router.resolve({
                            name: 'RoleTasks',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                    },
                    {
                        name: 'Мои задачи',
                        isVisible: () => this.$store.state.user.role !== ADMIN && this.$store.state.user.role !== DISPETCHER,
                        path: this.$router.resolve({
                            name: 'InWorkTasks',
                            params: {
                                userId: this.$store.state.user.uid.toString(),
                            },
                        }).href,
                    },

                    // {
                    //     name: 'Основная информация',
                    //     icon: 'idcard',
                    //     guid: '123',
                    //     children: [
                    //         {
                    //             name: 'Мой профиль',
                    //             icon: 'user',
                    //             path: this.$router.resolve({
                    //                 name: 'Profile',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //         {
                    //             name: 'Профиль компании',
                    //             icon: 'trademark',
                    //             path: this.$router.resolve({
                    //                 name: 'CompanyProfile',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //     ],
                    // },
                    // {
                    //     name: 'Сотрудники',
                    //     icon: 'team',
                    //     path: this.$router.resolve({
                    //         name: 'Employes',
                    //         params: {
                    //             userId: this.$store.state.userModule.userData.id.toString(),
                    //         },
                    //     }).href,
                    // },
                    // {
                    //     name: 'Справочник',
                    //     guid: '125',
                    //     icon: 'book',
                    //     children: [
                    //         {
                    //             name: 'Склады',
                    //             icon: 'shop',
                    //             path: this.$router.resolve({
                    //                 name: 'Warehouses',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //         {
                    //             name: 'Категории',
                    //             icon: 'filter',
                    //             path: this.$router.resolve({
                    //                 name: 'Categories',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //         {
                    //             name: 'Скидки',
                    //             icon: 'gift',
                    //             path: this.$router.resolve({
                    //                 name: 'Sales',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //         {
                    //             name: 'Должности',
                    //             icon: 'folder',
                    //             path: this.$router.resolve({
                    //                 name: 'EmployeeRoles',
                    //                 params: {
                    //                     userId: this.$store.state.userModule.userData.id.toString(),
                    //                 },
                    //             }).href,
                    //         },
                    //     ],
                    // },
                ];
            }
            return []

        }
    }
}