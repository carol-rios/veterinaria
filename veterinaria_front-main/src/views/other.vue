
<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card ref="form">
        <v-card-text>
         <div>
    <p class="font-weight-black">
      DATOS DEL PACIENTE
    </p></div>
        
          <v-text-field
            v-model="Nombre_Mascota"
            :rules="[() => !!Nombre_Mascota|| 'El nombre de la mascota es obligatorio']"
            :error-messages="errorMessages"
            label="Nombre mascota"
            required
          ></v-text-field>
          <v-text-field
            v-model="Propietario"
            :rules="[
              () => !!Propietario|| 'El propietario es obligatorio',
            ]"
            label="Nombre del Propietario"
            required
          ></v-text-field>
          <v-text-field
            v-model="Telefono"
            :rules="[
             () => !!Telefono || 'El teléfono es obligatorio',
             () => !!Telefono && Telefono.length <= 10 || 'El teléfono debe tener 10 caracteres',
             ]"
            label="Teléfono"
            counter="10"
            required
          ></v-text-field>
          <v-text-field
            v-model="Sintomas"
            :rules="[() => !!Sintomas || 'Los síntomas son obligatorio']"
            label="Síntomas"
            required
          ></v-text-field>
          <v-spacer></v-spacer>
           <label>Fecha</label>
           <v-spacer></v-spacer>
          <input class="position_left_input" v-model="Fecha" type="date">
          <v-spacer></v-spacer>
          <label>Hora</label>
          <v-spacer></v-spacer>
          <input class="position_left_input" v-model="Hora" type="time">
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn  
          color = "black  " dark
          @click="clear"
          >
           <v-icon dark left> mdi-arrow-left </v-icon>Limpiar formulario
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="Black" 
            text
            @click="submit"
          >
            <v-icon dark left> mdi-arrow-left </v-icon>Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <a href="admin1">
        <v-btn class="ma-6 container" color="black" dark > 
          <v-icon dark left> mdi-arrow-left </v-icon>Administrar citas 
        </v-btn>
      </a>
  </v-row>
  
</template>
   
<script>
 import axios from "axios"
  export default {
    data(){
      return{
      bd:0,
      cita:[],
      errorMessages: '',
      Nombre_Mascota: null,
      Propietario: null,
      Telefono: null,
      Sintomas: null,
      Fecha: null,
      Hora: null,
      formHasErrors: false,
      }
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      clear () {
        
        this.Nombre_Mascota = ''
        this.Propietario = ''
        this.Telefono=''
        this.Sintomas=''
        this.Fecha=''
        this.Hora=''
      
      },

      recibir(){
          let me = this;
          // let header = {headers:{}}
          axios.get(`cita`)
          .then((response) =>{
            console.log(response);
            me.cita = response.data.cita;
          })
          .catch(error => {
            console.log(error.response)
          });
      },

      submit () {
          alert('Funcionando enviar')
          if ( this.bd == 0){
            console.log('Guardando', this.bd);
            axios.post(
            `cita`,
            {
            Nombre_Mascota:this.Nombre_Mascota,
            Propietario:this.Propietario,
            Telefono:this.Telefono,
            Hora:this.Hora,
            Fecha:this.Fecha,
            Sintomas:this.Sintomas
            },
            )        
            .then((response) => {
            console.log(response);
            })   
          
            .catch((error) => {
              console.log (error.response);
            })
        } 
      }
    },
  }
  
</script>
<style scoped>
  
.v-card{
  background: linear-gradient(to bottom, rgb(227, 153, 255), rgb(227, 153, 255));
  height:100%;
  margin:0;
}



</style>