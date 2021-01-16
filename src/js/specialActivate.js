import Vue from 'vue'
import Store from '../store/store.js'
import eventBus from './eventBus.js'

import testSpecial from '../components/Special/testSpecial.vue'
import wolf from '../components/Special/wolf.vue'

const specialComponentList = {
  testSpecial: testSpecial,
  wolf: wolf
}

{
  for (const component in specialComponentList) {
    Vue.component(`${component}`, () => null)
  }
  Store.state.reRender_SpecialComponents += 1;    
}

eventBus.on('specialCheck', (code) => {
  for (const component in specialComponentList) {
    Vue.component(`${component}`, specialComponentList[component])
  }
  Store.state.reRender_SpecialComponents += 1;  
})