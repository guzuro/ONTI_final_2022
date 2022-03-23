<template>
    <a-spin :spinning="loading">
        <div class="login-form">
            <p class="is-size-3 text-center mb-2">Войти в учетную запись</p>
            <ValidationObserver v-slot="{ invalid }">
                <div class="flex flex-col">
                    <ValidationProvider
                            name="E-mail"
                            immediate
                            rules="required|email"
                            v-slot="{ errors }"
                    >
                        <a-input
                                type="email"
                                v-model="loginUser.email"
                                placeholder="Email..."
                        />
                        <span class="text-red-900"> {{ errors[0] }} </span>
                    </ValidationProvider>
                    <ValidationProvider
                            name="Password"
                            immediate
                            rules="required|min:7"
                            v-slot="{ errors }"
                    >
                        <a-input
                                class="mt-5"
                                type="password"
                                v-model="loginUser.password"
                                placeholder="Password..."
                        />
                        <span class="text-red-900"> {{ errors[0] }} </span>
                    </ValidationProvider>
                    <a-button :disabled="invalid" class="ml-auto mt-5" @click="login">
                        Войти
                    </a-button>
                </div>
            </ValidationObserver>
        </div>
    </a-spin>
</template>

<script>
    import {ValidationObserver, ValidationProvider} from 'vee-validate';

    export default {
        components: {
            ValidationObserver,
            ValidationProvider,
        },
        data() {
            return {
                loginUser: {
                    email: 'admin@mail.ru',
                    password: 'admin@mail.ru',
                },
                loading: false
            }
        },
        methods: {
            login() {
                this.loading = true
                this.$store.dispatch('DO_LOGIN', this.loginUser)
                    .then(() => {
                        this.$router.push({
                            name: 'Dashboard',
                            params: {
                                userId: this.$store.state.user.uid,
                            },
                        });
                    })
                    .catch((error) => alert(error))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style scoped>
</style>
