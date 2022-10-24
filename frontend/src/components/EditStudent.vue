<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Editar Aluno
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-10">
      <v-text-field
        v-model="studentName"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field>
      <v-text-field
        v-model="studentEmail"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="studentRa"
        :rules="raRules"
        label="Registro Acadêmico"
        required
      ></v-text-field>
      <v-text-field
        v-model="studentCpf"
        :rules="cpfRules"
        label="Cpf"
        required
      ></v-text-field>

      <div class="d-flex justify-end">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mt-5"
          @click="editStudent(studentId)"
        >
          Salvar
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
//MODAL PARA EDITAR ALUNOS
import axios from "../apis/axios";
export default {
  name: "EditStudent",
  props: {
    studentId: String,
  },
  data() {
    return {
      studentName: "",
      studentEmail: "",
      studentRa: "",
      studentCpf: "",
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Insira o nome do aluno"],
      email: "",
      emailRules: [
        (v) => !!v || "Insira o e-mail do aluno",
        (v) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
      ],
      ra: "",
      raRules: [(v) => !!v || "Insira o registro acadêmico do aluno"],
      cpf: "",
      cpfRules: [
        (v) => !!v || "Insira o cpf do aluno",
        (v) => /^[0-9]{11}$/.test(v) || "Insira um cpf válido",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  methods: {
    // get students list
    getStudents() {
      this.$emit("onEditStudent");
    },
    // open and close modal
    toggleModal() {
      this.$emit("onToggleModal");
    },
    // get student to set inputs
    async getStudent(id) {
      try {
        const response = await axios.post("student", { studentId: id });
        this.studentName = response.data.student.name;
        this.studentEmail = response.data.student.email;
        this.studentRa = response.data.student.academic_record;
        this.studentCpf = response.data.student.cpf;
      } catch (error) {
        console.log(error);
      }
    },
    // edit student and update on DB
    async editStudent(id) {
      if (
        !this.studentName ||
        !this.studentEmail ||
        !this.studentRa ||
        !this.studentCpf
      ) {
        alert("Preencha todos os campos");
      } else {
        axios
          .put("student", {
            studentId: id,
            name: this.studentName,
            email: this.studentEmail,
            academic_record: this.studentRa,
            cpf: this.studentCpf,
          })
          .then(() => {
            alert("Cadastro Atualizado!");
            this.toggleModal();
            this.getStudents();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getStudent(this.studentId);
    this.getStudents();
  },
  // watch the ids to change the student fields
  watch: {
    idAluno() {
      this.getStudent(this.idAluno);
    },
  },
};
</script>
