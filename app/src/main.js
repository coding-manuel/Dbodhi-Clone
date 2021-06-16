import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const DbodhiApp = createApp(App).use(store).use(router);
DbodhiApp.mount("#app");
