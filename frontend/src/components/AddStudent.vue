<template>
  <v-card>
    <v-card-title data-test="titulo" class="text-h5 grey lighten-2">
      Novo Aluno
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
        v-model="studentRA"
        :rules="raRules"
        label="RA"
        required
      ></v-text-field>
      <v-text-field
        v-model="studentCpf"
        :rules="cpfRules"
        label="CPF"
        required
      ></v-text-field>
      <div class="d-flex justify-end">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mt-5"
          @click="AddStudent()"
        >
          Salvar
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import axios from "../apis/axios";
export default {
  name: "AddStudent",
  data() {
    return {
      studentName: "",
      studentEmail: "",
      studentRA: null,
      studentCpf: null,
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Insira o nome completo do aluno"],
      email: "",
      emailRules: [
        (v) => !!v || "Insira o e-mail do aluno",
        (v) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
      ],
      ra: null,
      raRules: [(v) => !!v || "Insira o registro acadêmico do aluno"],
      cpf: null,
      cpfRules: [
        (v) => !!v || "Insira o cpf do aluno",
        (v) => /^[0-9]{11}$/.test(v) || "Insira um cpf válido",
      ],
    };
  },
  methods: {
    // get student list
    getStudents() {
      this.$emit("onAddStudent");
    },
    // open and close modal
    toggleModal() {
      this.$emit("onToggleModal");
    },
    // add student to DB
    async AddStudent() {
      if (
        !this.studentName ||
        !this.studentEmail ||
        !this.studentRA ||
        !this.studentCpf
      ) {
        alert("Preencha todos os campos!");
      } else {
        // eslint-disable-next-line no-unused-vars

        axios
          .post("students", {
            name: this.studentName,
            email: this.studentEmail,
            academic_record: this.studentRA,
            cpf: this.studentCpf,
          })
          .then(() => {
            alert("Aluno cadastrado com sucesso!");
            this.toggleModal();
            this.$refs.form.reset();
            this.getStudents();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  mounted() {},
};
</script>
