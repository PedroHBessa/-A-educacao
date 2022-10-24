<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Bem-vindo, {{ user }}</h3>
    </v-subheader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  methods: {},
  async mounted() {
    this.user = localStorage.getItem("user");
    this.getStudents();
  },
};
</script>

<style scoped></style>
