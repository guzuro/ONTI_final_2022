<template>
    <a-layout id="components-layout-demo-responsive">
        <a-layout-sider breakpoint="md" collapsed-width="0">
            <div class="logo"/>
            <a-menu mode="inline" :default-selected-keys="activeKey" :default-open-keys="activeGroup">
                <template v-for="item in navItems">
                    <template v-if="item.isVisible()">
                        <a-menu-item v-if="!item.children" :key="item.path" @click="navigateTo(item.path)">
                            <a-icon :type="item.icon"/>
                            <span>{{ item.name }}</span>
                        </a-menu-item>

                        <a-sub-menu v-else :key="item.guid">
            <span slot="title">
              <a-icon :type="item.icon"/>
              <span>{{ item.name }} </span>
            </span>
                            <a-menu-item v-for="menuChildren in item.children"
                                         :key="menuChildren.path"
                                         @click="navigateTo(menuChildren.path)">
                                <a-icon :type="menuChildren.icon"/>
                                <span>
                {{ menuChildren.name }}
              </span>
                            </a-menu-item>
                        </a-sub-menu>
                    </template>
                </template>
                <a-menu-item @click="doLogout()">
                    <a-icon type="close"/>
                    <span>Выход</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="textAlign: center">
                Per aspera ad astra
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>


<script>
    import navItemsMixin from "../mixins/navItemsMixin";

    export default {
        name: "DashboardLayout",
        mixins: [navItemsMixin],
        data() {
            return {
                activeGroup: []
            }
        },
        computed: {
            activeKey() {
                return [this.$route.path];
            }
        },
        methods: {
            navigateTo(path) {
                if (this.$route.path !== path) this.$router.push(path);
            },
            async doLogout() {
                await this.$store.dispatch('DO_LOGOUT')
                    .then(() => {
                        this.$router.push({
                            name: 'Login',
                        });
                    })
            }
        },
        created() {
            for (const item of this.navItems) {
                if (item.children) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const ch of item.children) {
                        if (this.$route.path === ch.path) {
                            this.activeGroup.push(item.guid);
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .ant-layout {
        height: 100%;
    }
</style>