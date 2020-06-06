<template>
  <div>
    <div class="container">
      <h1>Yapp Medical Challenge!</h1>
      <div class="row">
        <input>
      </div>
    </div>
    <div class="wrap-table100">
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">Nombre del Paciente</th>
                  <th class="cell100 column2">Diagnostico</th>
                  <th class="cell100 column3">Medico tratante</th>
                  <th class="cell100 column4">Ver ficha</th>
                </tr>
              </thead>
            </table>
          </div>
 
          <div class="table100-body js-pscroll">
            <table>
              <tbody>
                <tr v-for="patient in patientsData" :key="patient.id" class="row100 body">
                  <td class="cell100 column1">{{patient.userName}}</td>
                  <td class="cell100 column2">{{patient.diagnosis.name}}</td>
                  <td class="cell100 column3">{{patient.doctor.name}}</td>
                  <td class="cell100 column4">
                    <router-link :to="{ path: '/patient', query: { patientID: patient.userId }}" class="nav-link">ver pacientes</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    <li class="nav-item">
    </li>
  </div>
</template>

<script>
export default {
  name: 'StartPage',
  props: {},
  data () {
    return {
      id: 1,
      api: 'https://jsonmock.hackerrank.com/api/medical_records',
      patientsData: {}
    }
  },
  created: function ()  {
    this.test()
  },
  methods: {
    test: function () {
      this.$http.get(this.api).then((response) => {
        this.patientsData = response.data.data
        console.log(response)
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
