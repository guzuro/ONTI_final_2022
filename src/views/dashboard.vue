<template>
    <div class="dashboard">
        <a-card title="Мой профиль" class="w-full">
            <div class="flex flex-col md:flex-row md:justify-between">
                <div class="flex flex-col">
                    <a-list-item>
                        <a-list-item-meta :description="user.first_name">
                            <div slot="title">Имя</div>
                        </a-list-item-meta>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta :description="user.last_name">
                            <div slot="title">Фамилия</div>
                        </a-list-item-meta>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta :description="rolesOptions.find(o => o.value === user.role).label">
                            <div slot="title">Должность</div>
                        </a-list-item-meta>
                    </a-list-item>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
    import RolesService from "../Services/RolesService";

    export default {
        name: "dashboard",
        data() {
            return {
                user: {...this.$store.state.user},
                rolesOptions: []
            }
        },
        created() {
            RolesService.getRolesOptions(this.$store.state.user.company_guid)
                .then(res => this.rolesOptions = res)
        }
    }
</script>

<style scoped>

</style>