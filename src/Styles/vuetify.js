import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

import { NordLight, CustomDark } from './themes'

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
    themes: {
      dark: CustomDark, // Default
      light: NordLight, // Default
    },
  },
  icons: {
    iconfont: 'fa' && 'md',
  },
});
