
<template>
  <v-data-table
    :headers="headers"
    :items="cita"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>ADMINISTRA TUS CITAS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="Nombre_Mascota"
                      label="Nombre mascota"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="Propietario"
                      label="Propietario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="Telefono"
                      label="Teléfono"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-text-field
                      v-model="Sintomas"
                      label="Sintomas"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-text-field
                      v-model="Fecha"
                      label="Fecha"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  > 
                    <v-text-field
                      v-model="Hora"
                      label="Hora"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estas seguro de que quieres eliminar esta cita?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="purple" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="borrar(item)"
      >
        mdi-delete
      </v-icon>
    </template>
   
  </v-data-table>
</template>


<script>
import axios from "axios"
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      cita:[],
      headers: [
        {
          text: 'Nombre Mascota',
          align: 'start',
          sortable: false,
          value: 'Nombre_Mascota',
        },
        { text: 'Propietario', value: 'Propietario' },
        { text: 'Teléfono', value: 'Telefono' },
        { text: 'Sintomas', value: 'Sintomas' },
         { text: 'Fecha', value: 'Fecha' },
          { text: 'Hora', value: 'Hora' },
        { text: 'Eliminar', value: 'actions', sortable: false },
      ],

    }),

   
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get(`cita`)
          .then((response) =>{
            this.cita = response.data.formulario;
            console.log(this.cita);
          
      });
      },
      
    
      deleteItem (item) {
        this.editedIndex = this.cita.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.cita.splice(this.editedIndex, 1)
        this.closeDelete()
      },
     
       borrar(cita){
     
      let id = cita._id;
      console.log(id);

      axios.delete(
        `cita/${id}`)
      .then(response => {
        console.log(response);
        this.cita = response.data.formulario;
        console.log(this.cita);
      })
      .catch(error => {
        console.log(error.response)
      });

    },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.cita[this.editedIndex], this.editedItem)
        } else {
          this.cita.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
  
.v-data-table{
  background: linear-gradient(to bottom, rgb(227, 153, 255), rgb(227, 153, 255));
  height:100%;
  margin:0;
}
</style>