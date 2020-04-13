import Vue from '../../node_modules/vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

// import { NordLight, NordDark, CustomDark } from './themes'

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
    // themes: {
    //   dark: NordDark, // Default
    //   light: NordLight, // Default
    // },
  },
  icons: {
    iconfont: 'fa' && 'md',
  },
});
