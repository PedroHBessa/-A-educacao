<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Consulta de Alunos</h3>
      <div class="text-center">
        <v-dialog v-model="modal" width="500">
          <AddStudent
            @onToggleModal="toggleModal"
            @onAddStudent="getStudents"
          />
        </v-dialog>
      </div>
      <v-btn @click="toggleModal()" color="success">
        Cadastrar Aluno
      </v-btn>
    </v-subheader>
    <br />
    <StudentsData :studentsList="studentsList" @onEditStudent="getStudents" />
  </div>
</template>

<script>
import axios from "../apis/axios";
import AddStudent from "../components/AddStudent";
import StudentsData from "../components/StudentsData";
export default {
  nome: "Alunos",
  components: {
    AddStudent,
    StudentsData,
  },
  data() {
    return {
      studentsList: [],
      modal: false,
    };
  },
  methods: {
    // get students list
    async getStudents() {
      try {
        const response = await axios.get("students");
        this.studentsList = response.data.students;
      } catch (error) {
        console.log(error);
      }
    },
    toggleModal() {
      this.modal = !this.modal;
    },
  },
  async mounted() {
    this.getStudents();
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
