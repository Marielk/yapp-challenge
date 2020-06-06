<template>
    <div class="container page-wrap">
      <h1 id="title">Yapp Medical Challenge!</h1>
      <img id="main-img" src="../assets/diagnostic.svg">
      <div class="row">
        <div class="col-12 mt-5 mb-5">
          <h5>Buscar pacientes por nombre o apellido:</h5>
          <input id="nameInput" v-on:keyup.enter ="filterByUser()" v-on:keyup.delete = "fetchFirst()" placeholder="Bob...">
          <button v-on:click="filterByUser()" class="btn btn-info">Buscar</button>
        </div>
      </div>
    
      <div class="table-container">
          <div class="table-head-container">
            <table class="row" style="height:50px">
              <thead class="col-10 m-auto">
                <tr class="d-flex justify-content-between">
                  <th class="">Nombre del Paciente</th>
                  <th class="">Diagnostico</th>
                  <th class="">Medico tratante</th>
                  <th class="">...</th>
                </tr>
              </thead>
            </table>
          </div>
 
          <div class="table-body-container">
            <table class="row">
              <tbody class="col-10 m-auto">
                <tr v-for="patient in patientsData" :key="patient.id" class="table-row">
                  <td class="item-info cel-1">{{patient.name}}</td>
                  <td class="item-info cel-2">{{patient.diagnosis}}</td>
                  <td class="item-info cel-3">{{patient.doctor}}</td>
                  <td class="item-info cel-4">
                    <router-link :to="{ path: '/patient', query: { patientID: patient.id }}" class="nav-link">
                      <span class="btn-ficha">Ir a la </span> ficha
                      <img class="arrow btn-ficha" src="../assets/arrow.png">
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'StartPage',
  props: {},
  data () {
    return {
      api: 'https://jsonmock.hackerrank.com/api/medical_records',
      patientsData: []
    }
  },
  created: function ()  {
    this.fetchFirst()
  },
  methods: {
    fetchFirst: function () {
      this.$http.get(this.api).then((response) => {
        const allData = response.data.data
        this.patientsData = this.cleanData(allData)
      })
    },
    cleanData: function (data) {
      // elimina los pacientes repetidos del listado
      const reducedItems = [];
      data.map((patient, index) => {
        const patientResume = {
          name: patient.userName ,
          id: patient.userId,
          doctor: patient.doctor.name,
          diagnosis: patient.diagnosis.name
        }
        if (data[index+1]){
          if (patient.userId !== data[index+1].userId) {
            reducedItems.push(patientResume)
          } 
        } else {
          reducedItems.push(patientResume)
        }
      })
      return reducedItems   
    },
    filterByUser: function () {
     const input = document.getElementById('nameInput').value
      if (input.length >= 3) {
        this.patientsData = this.patientsData.filter((patient) => {
          const nameUpperCase = input.toUpperCase()
          if (patient.name.toUpperCase().includes(nameUpperCase) === true) {
            return patient
          }
        });
      } 
    },
  }
}

</script>

<style>
  .page-wrap{
    background-image: url('../assets/background.jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    padding: 0;
  }
  #title{
    background-color: cornflowerblue;
    height: 90px;
    border-radius: 5px;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  #main-img{
    width: 10%;
  }
  #nameInput{
    width: 290px;
    border: 1px solid cornflowerblue;
    height: 40px;
  }
  .table-container{
    background-color: aliceblue;
    border-radius: 5px;
    padding: 0;
    padding-bottom: 1em;
  }
  .table-head-container{
    background-color: cornflowerblue;
    color: white;
    border-radius: 5px;
    height: 50px;
    margin-bottom: 1em;
  }
  .table-row{
    border-bottom: 1px solid skyblue;
  }
  .item-info{
    text-align: start;
  }
  .cel-1{
    width: 340px;
  }
  .cel-2{
    width: 270px;
  }
  .cel-3{
    width: 198px;
  }
  .cel-4{
    word-break: initial;
  }
  .arrow{
    width: 20%;
  }
  .btn-ficha{
    display: none;
  }
  @media (min-width: 992px) { 
    .btn-ficha{
      display: inline-flex;
    }
  }
</style>
