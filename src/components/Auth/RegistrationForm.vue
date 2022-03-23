<template>
    <a-spin :spinning="loading">
        <div class="register-form">
            <p class="is-size-3 has-text-centered mt-5">Регистрация</p>
            <ValidationObserver v-slot="{ invalid }">
                <div class="flex flex-col">
                    <main-user-info-form v-model="user"/>
                    <a-button :disabled="invalid" class="ml-auto mt-5" @click="register"> Регистрация</a-button>
                </div>
            </ValidationObserver>
        </div>
    </a-spin>
</template>

<script>
    import {ValidationObserver} from 'vee-validate';
    import MainUserInfoForm from '../MainUserInfoForm.vue';
    import { v4 as uuidv4 } from 'uuid';

    export default {
        components: {
            ValidationObserver,
            MainUserInfoForm,
        },
        data() {
            return {
                user: {
                    password: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    company_guid: uuidv4()
                },
                loading: false
            }
        },
        methods: {
            async register() {
                this.loading = true
                this.$store.dispatch('DO_SIGN_UP', this.user)
                    .then(() => alert("Успешно"))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style scoped lang="scss">
    .register-form__field {
        margin-top: 10px;
    }
</style>
