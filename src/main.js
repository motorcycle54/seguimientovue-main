import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import TimeLine from './components/timeLine/TimeLine.vue';
import TimeLineItem from './components/timeLineItem/TimeLineItem.vue';

loadFonts()

const app = createApp(App)

app.component('time-line', TimeLine)
app.component('time-line-item', TimeLineItem)

  .use(router)
  .use(vuetify)
  .mount('#app')
