import Vue from '../../node_modules/vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css' // Не менять, в free скидывать файлы от Pro
import 'material-design-icons-iconfont/dist/material-design-icons.css'

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
    iconfont: 'fa' && 'md',
  },
});
