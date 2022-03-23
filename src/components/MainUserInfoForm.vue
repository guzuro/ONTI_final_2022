<template>
    <div class="main-value-info-form">
        <ValidationProvider name="E-mail" immediate rules="required|email" v-slot="{ errors }">
            <field-wrapper class="mt-5" :fieldTitle="'E-mail'">
                <a-input placeholder="Email" maxlength="30" v-model="value.email"></a-input>
                <span class="text-red-900"> {{ errors[0] }} </span>
            </field-wrapper>
        </ValidationProvider>
        <ValidationProvider name="Пароль" immediate rules="required|min:7" v-slot="{ errors }">
            <field-wrapper class="mt-5" :fieldTitle="'Пароль'">
                <a-input placeholder="Пароль" type="password" password-reveal v-model="value.password"></a-input>
                <span class="text-red-900"> {{ errors[0] }} </span>
            </field-wrapper>
        </ValidationProvider>
        <ValidationProvider name="Фамилия" immediate rules="required" v-slot="{ errors }">
            <field-wrapper class="mt-5" :fieldTitle="'Фамилия'">
                <a-input placeholder="Фамилия" type="text" v-model="value.last_name"></a-input>
                <span class="text-red-900"> {{ errors[0] }} </span>
            </field-wrapper>
        </ValidationProvider>
        <ValidationProvider name="Имя" immediate rules="required" v-slot="{ errors }">
            <field-wrapper class="mt-5" :fieldTitle="'Имя'">
                <a-input placeholder="Имя" type="text" v-model="value.first_name"></a-input>
                <span class="text-red-900"> {{ errors[0] }} </span>
            </field-wrapper>
        </ValidationProvider>
        <ValidationProvider name="Номер телефона" immediate rules="required" v-slot="{ errors }">
            <field-wrapper :fieldTitle="'Номер телефона'" class="mt-5">
                <a-input placeholder="Номер телефона" type="text" v-model="value.phone"></a-input>
                <span class="text-red-900"> {{ errors[0] }} </span>
            </field-wrapper>
        </ValidationProvider>

    </div>
</template>

<script>
    import {ValidationProvider} from 'vee-validate';
    import FieldWrapper from './FieldWrapper.vue';

    export default {
        components: {
            FieldWrapper,
            ValidationProvider,
        },
        props: ['value'],
    }
</script>
