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
  for (let component in specialComponentList) {
    Vue.component(`${component}`, () => null)
  }
  Store.state.reRender_SpecialComponents += 1;    
}

eventBus.on('specialCheck', (code) => {
  for (let component in specialComponentList) {
    Vue.component(`${component}`, specialComponentList[component])
  }
  console.log('Load')
  Store.state.reRender_SpecialComponents += 1;  
})