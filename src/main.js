import App from "./App.vue";
import { createApp } from "vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);
app
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyC4Wf6YgqgaqXtaHACUYyhlRNtMutMPHuk"
    }
  })
  .mount("#app");
