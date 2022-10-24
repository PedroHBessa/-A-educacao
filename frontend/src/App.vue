<template>
  <v-app id="inspire">
    <div v-if="isLoading">
      <div
        class="text-center d-flex align-center justify-center"
        style="height: 100vh"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
    <div v-else>
      <div v-if="!isAuth">
        <Auth @onAuth="auth" />
      </div>
      <div v-else>
        <Sidebar :drawer="drawer" />
        <v-main style="background: #f5f5f540">
          <v-container class="py-8 px-6" fluid>
            <router-view></router-view>
          </v-container>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Auth from "./views/Auth.vue";
import axios from "./apis/axios";

export default {
  name: "App",
  components: {
    Sidebar,
    Auth,
  },
  data: () => ({
    isAuth: false,
    isLoading: null,
  }),
  methods: {
    async auth() {
      await axios
        .get("me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.status) {
            this.isAuth = true;
          } else {
            this.isAuth = false;
          }
        });
    },
  },
  async mounted() {
    await this.auth();
  },
};
</script>
