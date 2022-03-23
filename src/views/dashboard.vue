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
                        <a-list-item-meta :description="user.phone">
                            <div slot="title">Номер телефона</div>
                        </a-list-item-meta>
                    </a-list-item>
                    <a-list-item>
                        <a-list-item-meta :description="user.role">
                            <div slot="title">Должность</div>
                        </a-list-item-meta>
                    </a-list-item>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data() {
            return {
                user: {...this.$store.state.user}
            }
        }
    }
</script>

<style scoped>

</style>