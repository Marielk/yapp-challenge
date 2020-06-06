
<template>
  <div class="container-table100">
    <p>Pacientes works!</p>
    <div>User {{ $route.query.patientID }}</div>
    <li class="nav-item">
      <router-link to="/" class="nav-link">Volver</router-link>
    </li>
      <div class="wrap-table100">
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">Class name</th>
                  <th class="cell100 column2">Type</th>
                  <th class="cell100 column3">Hours</th>
                  <th class="cell100 column4">Trainer</th>
                  <th class="cell100 column5">Spots</th>
                </tr>
              </thead>
            </table>
          </div>
 
          <div class="table100-body js-pscroll">
            <table>
              <tbody>
                <tr class="row100 body">
                  <td class="cell100 column1">Like a butterfly</td>
                  <td class="cell100 column2">Boxing</td>
                  <td class="cell100 column3">9:00 AM - 11:00 AM</td>
                  <td class="cell100 column4">Aaron Chapman</td>
                  <td class="cell100 column5">10</td>
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
  props: {
    
  }
}
</script>


<style scoped>

</style>
