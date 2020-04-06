import Vue from "vue"
import VueRouter from "vue-router"
import Main from "./Pages/Main.vue"
import FAQ from "./Pages/FAQ.vue"
// import TestPageChat from "./components/Chat/TestPage.vue"
import Diary from "./Pages/DiaryInput.vue"
// import Settings from "./Pages/Settings.vue"
// import Saves from "./Pages/Saves"
// import InitialSettings from "./Pages/InitialSettings"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/', // Корень
            name: '',
            component: Main
        },
        // {
        //     path: '/Settings',
        //     name: 'Settings',
        //     component: Settings
        // },
        {
            path: '/FAQ',
            name: 'FAQ',
            component: FAQ
        },
        {
            path: '/Diary',
            name: 'Diary',
            component: Diary
        },
        // {
        //     path: '/Saves',
        //     name: 'Saves',
        //     component: Saves
        // },
        // {
        //     path: '/InitialSettings',
        //     name: 'InitialSettings',
        //     component: InitialSettings
        // },
    ],
})