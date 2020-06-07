
<template>
  <div class="container page-wrap">
    <div class="d-flex justify-content-start">
      <router-link to="/" class="nav-link back-btn">
        <img class="arrow_back" src="../assets/back.png">
          Volver
      </router-link>
    </div> 
    <div v-if="loading">
      <img class="loading" src="../assets/loader.png">
    </div>

    <div v-else>
      <h3 class="title-profile">Ficha del Paciente</h3>
      <div class="card patient-card">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <img class="user-profile" src="../assets/user1.png">
            </div>
            <div class="col-6 text-left">
              <h6 class="font-weight-bold">Nombre del Paciente</h6>
                <p v-if="patientsRecords[0]">{{patientsRecords[0].name}}</p>
              <h6 class="font-weight-bold">Fecha de nacimiento</h6>
                <p v-if="patientsRecords[0]">{{patientsRecords[0].dob}}</p>
              <h6 class="font-weight-bold">Estatura</h6>
                <p v-if="patientsRecords[0]">{{patientsRecords[0].height}}</p>
            </div>
          </div>
        </div>
      </div>
      <h3 class="subtitle-profile">Registro de ingresos del Paciente</h3>
      <div class="table-container">
        <div class="table-head-container">
          <table class="row" style="height:50px">
            <thead class="col-10 m-auto">
              <tr class="d-flex justify-content-between">
                <th>Fecha de ingreso</th>
                <th>Diagnostico</th>
                <th>Medico tratante</th>
                <th>Peso</th>
              </tr>
            </thead>
          </table>
        </div>
          <div class="table-body-container">
            <table class="row">
              <tbody class="col-10 m-auto">
              <tr v-for="record in patientsRecords" :key="record.id" class="table-row spaced">
                <td class="item-info celb-1">{{ record.date | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="item-info celb-2">{{record.diagnosis}} ({{record.diagnosisId}})</td>
                <td class="item-info celb-3">{{record.doctor}}</td>
                <td class="item-info cel-4">{{record.weight}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      
  </div>

</template>

<script>
export default {
  name: 'PacientProfile',
  props: {},
  data () {
    return {
      api: 'https://jsonmock.hackerrank.com/api/medical_records',
      patientsRecords : [],
      loading: true
    }
  },
  created: function ()  {
    this.fetchPatient()
  },
  methods: {
    fetchPatient: function () {
      this.$http.get(this.api+ `?userId${this.$route.query.patientID}`).then((response) => {
          const allRecords = response.data.data
          const formatedRecords = []
          allRecords.map((record) => {
            const formatedRecord = {
              id: record.id,
              name: record.userName,
              dob: record.userDob,
              height: record.meta.height,
              weight: record.meta.weight,
              date: this.formatDate(record.timestamp),
              doctor: record.doctor.name,
              diagnosis: record.diagnosis.name,
              diagnosisId: record.diagnosis.id,
              extras: record.vitals
            }
            // console.log(formatedRecord.date)
            formatedRecords.push(formatedRecord)
          })
          this.patientsRecords = this.sortByDate(formatedRecords)
          
      }).catch(error => { console.error(error) }).finally(() => (this.loading = false))
    },
    formatDate: function (date) {
      const formatDate = this.$moment(date).format();
      return formatDate;
    },
    sortByDate: function (arr) {
      arr.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB - dateA
      });
      return arr
    }
  }
}
</script>


<style scoped>
  .back-btn{
    display: inline-flex;
    align-items: center;
    font-size: medium;
  }
  .arrow_back{
    width: 5%;
    margin-right: 5px;
  }
  .title-profile{
    font-weight: 600;
    margin-bottom: 1em;
  }
  .subtitle-profile{
    font-weight: 500;
    margin-bottom: 1em;
    margin-top: 3em;
  }
  .patient-card{
    width: 60%;
    margin: auto;
    box-shadow: 0 6px 6px -6px black;
    padding-top: 15px;
    border-radius: 6px;
  }
  .user-profile{
    width: 50%;
  }

  .celb-1 {
    width: 340px;
  }
  .celb-2 {
    width: 290px;
  }
  .celb-3 {
    width: 330px;
  }
  .spaced{
    height: 50px;
  }
  
</style>
