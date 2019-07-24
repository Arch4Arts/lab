<template>
    <!-- Скрываем бар, когда открывается окно чата -->
    <div>  
        <!-- ВЫПАДАЮЩИЙ СПИСКОК --> 
        <!-- <v-navigation-drawer width="180" fixed v-model="$store.state.DrawerVisible">
            <v-list>
                <v-list-tile v-for="(Item, i) in menuItems" :key="'Drawer' + i" :to="Item.route">
                    <v-list-tile-action>
                        <v-icon v-html="Item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                            <v-list-tile-title v-if="$store.state.lang" v-text="Item.title" ></v-list-tile-title>
                            <v-list-tile-title v-else v-text="Item.title_ru"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
         </v-navigation-drawer> -->
        <Radial-Menu v-model="$store.state.DrawerVisible" class="hidden-md-and-up" />

         <!-- КНОПКИ В МЕНЮ -->
        <v-toolbar v-if="!(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs)" app dark class="primary">
            <!-- <v-toolbar-side-icon @click.stop="$store.state.DrawerVisible = !$store.state.DrawerVisible" class="hidden-md-and-up"></v-toolbar-side-icon> -->
            <router-link v-if="$store.state.Header" to="/" tag="span" style="cursor:pointer">
                <v-toolbar-title>
                    {{ $store.state.name + ' ' + $store.state.version }} 
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="$store.state.lang" class="hidden-sm-and-down">
                <v-btn v-for="(item, i) in menuItems" :key="'btn' + i"  :to="item.route" @click="openSettings(item.icon)" flat>
                    <v-icon left v-html="item.icon"></v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else class="hidden-sm-and-down">
                <v-btn shift v-for="(item, i) in menuItems" :key="'btn' + i" color="" :to="item.route" @click="openSettings(item.icon)" flat>
                    <v-icon left v-html="item.icon"></v-icon>
                    {{ item.title_ru }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>    
</template>

<script>
import RadialMenu from './RadialMenu'
export default {
    computed: {
        menuItems(){
            return [
                {
                icon: 'fas fa-question-circle',
                title: 'FAQ',
                title_ru: 'FAQ',
                route: 'FAQ'
                },
                {
                icon: 'fas fa-cog',
                title: 'Settings',
                title_ru: 'Настройки',
                route: ''
                },
                {
                icon: 'fas fa-book',
                title: 'Diary',
                title_ru: 'Дневник',
                route: 'Diary'
                },
                {
                icon: 'fas fa-save',
                title: 'Saves',
                title_ru: 'Сохранения',
                route: 'Saves'
                },]
        }
    },
    methods: {
        openSettings(icon){
            if (icon === 'fas fa-cog') this.$store.state.isOpenSettings = true
        }
    },
    components: {
        RadialMenu
    }
}
</script>

<style>

</style>
