import Vue from 'vue'
import Store from '../../store/store'
import eventBus from '../eventBus.js'

const specialComponentList = {
  testSpecial: () => import('../../components/Special/testSpecial.vue'),
  wolf: () => import('../../components/Special/wolf.vue')
}

{
  for (let key in specialComponentList) {
    Vue.component(`${key}`, () => null)
  }
  Store.state.reRender_SpecialComponents += 1;    
}

eventBus.on('specialCheck', (code) => {
  for (let key in specialComponentList) {
    console.log(Vue)
    Vue.component(`${key}`, specialComponentList[key])
  }
  Store.state.reRender_SpecialComponents += 1;  
})