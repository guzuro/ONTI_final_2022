<template>
    <div class="field-wrapper flex flex-col">
        <span class=""> {{ fieldTitle }} </span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            fieldTitle: {
                type: String,
                required: true
            }
        },
    }
</script>
