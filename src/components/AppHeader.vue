<template>
    <div>
        <!-- ВЫПАДАЮЩИЙ СПИСКОК --> 
        <v-navigation-drawer width="180" fixed v-model="$store.state.DrawerVisible">
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
         </v-navigation-drawer>

         <!-- КНОПКИ В МЕНЮ -->
        <v-toolbar app dark class="primary">
            <v-toolbar-side-icon @click.stop="$store.state.DrawerVisible = !$store.state.DrawerVisible" class="hidden-md-and-up"></v-toolbar-side-icon>
            <router-link v-if="$store.state.Header" to="/" tag="span" style="cursor:pointer">
                <v-toolbar-title>
                    {{ $store.state.name + ' ' + $store.state.version }} 
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="$store.state.lang" class="hidden-sm-and-down">
                <v-btn v-for="(Item, i) in menuItems" :key="'btn' + i"  :to="Item.route" flat>
                    <v-icon left v-html="Item.icon"></v-icon>
                    {{ Item.title }}
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else class="hidden-sm-and-down">
                <v-btn shift v-for="(Item, i) in menuItems" :key="'btn' + i" color="" :to="Item.route" flat>
                    <v-icon left v-html="Item.icon"></v-icon>
                    {{ Item.title_ru }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>    
</template>

<script>
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
                icon: 'fas fa-cogs',
                title: 'Settings',
                title_ru: 'Настройки',
                route: 'Settings'
                },
                {
                icon: 'fas fa-comments',
                title: 'Chat',
                title_ru: 'Чат',
                route: 'TestPageChat'
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
    }
}
</script>

<style>

</style>
