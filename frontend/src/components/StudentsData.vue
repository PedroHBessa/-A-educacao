<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            caption="Informação Geral"
            :headers="headers"
            :items="studentsList"
            :items-per-page="5"
            class="elevation-1 pa-6"
          >
            <template v-slot:item.acoes="el">
              <v-icon @click="editStudent(el.item.studentId)" class="mr-3">{{
                "mdi-account-edit"
              }}</v-icon>
              <v-icon
                @click="confirmModal(el.item.studentId)"
                color="error"
                class="mx-3"
                >{{ "mdi-delete" }}</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <div class="text-center">
        <v-dialog v-model="modal" width="500">
          <EditStudent
            :studentId="studentId"
            @onToggleModal="toggleModal"
            @onEditStudent="getStudents"
          />
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog v-model="confirmDeleteModal" max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Atenção!
            </v-card-title>
            <v-card-text
              >Tem certeza que deseja excluir o aluno selecionado?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="black darken-1"
                text
                @click="confirmDeleteModal = false"
              >
                Cancelar
              </v-btn>
              <v-btn color="red darken-1" text @click="removeStudent">
                Excluir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </div>
</template>

<script>
import axios from "../apis/axios";
import EditStudent from "../components/EditStudent";
export default {
  name: "StudentsData",
  modal: false,
  components: {
    EditStudent,
  },
  props: {
    studentsList: Array,
  },
  data() {
    return {
      headers: [
        {
          text: "Registro Acadêmico",
          value: "academic_record",
          align: "center",
        },
        { text: "Nome", value: "name", align: "center" },
        { text: "CPF", value: "cpf", align: "center" },
        { text: "Ações", value: "acoes", align: "center" },
      ],
      modal: false,
      studentId: "",
      confirmDeleteModal: false,
    };
  },
  methods: {
    // get student list
    getStudents() {
      this.$emit("onEditStudent");
    },
    // open and close modal
    toggleModal() {
      this.modal = !this.modal;
    },
    // open modal and pass id to edit student
    async editStudent(id) {
      try {
        this.toggleModal();
        this.studentId = id;
      } catch (error) {
        console.log(error);
      }
    },

    toggleDeleteModal() {
      this.confirmDeleteModal = !this.confirmDeleteModal;
    },

    confirmModal(id) {
      try {
        this.toggleDeleteModal();
        this.studentId = id;
      } catch (error) {
        console.log(error);
      }
    },

    // remove the student
    async removeStudent() {
      await axios
        .delete("student", { data: { studentId: this.studentId } })
        .then(() => {
          alert("Aluno removido!");
          this.confirmDeleteModal = false;
          this.getStudents();
        })
        .catch(() => {
          alert("Aluno não encontrado.");
        });
    },
  },
};
</script>
