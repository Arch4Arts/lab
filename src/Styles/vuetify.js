import Vue from '../../node_modules/vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

// import '@fortawesome/fontawesome-free/css/all.css' // Не менять, в free скидывать файлы от Pro

Vue.use(Vuetify, {
  directives: {
    Touch,
}});

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
      dark: true,
  },
  icons: {
    iconfont: 'mdiSvg',
  },
});
