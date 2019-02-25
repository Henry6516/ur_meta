import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-chalk/index.css'
import store from './store'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import router from './routes/router'
import VModal from 'vue-js-modal'
import Myecharts from './component/Myecharts'
import Myechart from './component/Myechart'
import Myechartlre from './component/Myechartlre'
import toExcel from '@/excel/json2excel'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/icon/iconfont.css'
import echarts from 'echarts'

Vue.use(VueQuillEditor)
Vue.use(VueHighlightJS)
Vue.use(Myechart)
Vue.use(Myechartlre)
Vue.use(Myecharts)
Vue.use(VModal)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$toExcel = toExcel
Vue.prototype.$echarts = echarts
/**
 * @description 为自定义滚动条全局注入自定义指令。自动判断该更新PerfectScrollbar还是创建它
 * @param {Element} el - 必填。dom元素
 */
const el_scrollBar = el => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    el._ps_ = new PerfectScrollbar(el, { suppressScrollX: true })
  }
}

Vue.directive('scrollBar', {
  inserted(el, binding) {
    const { arg } = binding
    if (arg === 'slim') {
      el = el.querySelector('.el-table__body-wrapper')
      if (!el) {
        return console.warn('未发现className为el-table__body-wrapper的dom')
      }
    }
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      console.error(
        `perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join(
          '、'
        )}`
      )
    }
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode) {
    const { arg } = binding
    if (arg === 'slim') {
      el = el.querySelector('.el-table__body-wrapper')
      if (!el) {
        return console.warn('未发现className为el-table__body-wrapper的dom')
      }
    }
    vnode.context.$nextTick(() => {
      try {
        el_scrollBar(el)
      } catch (error) {
        console.error(error)
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
