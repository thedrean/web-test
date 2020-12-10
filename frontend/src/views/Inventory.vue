<template>
  <div>
    <h1>Inventory</h1>
    <span>Select a date to see that weeks Inventory</span>
    <form id="inventory-form">
      <span>Date</span>
      <select v-model="month">
        <option disabled value="">MM</option>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sept</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>
      <select v-model="day">
        <option disabled value="">DD</option>
        <option value="01">1</option>
        <option value="02">2</option>
        <option value="03">3</option>
        <option value="04">4</option>
        <option value="05">5</option>
        <option value="06">6</option>
        <option value="07">7</option>
        <option value="08">8</option>
        <option value="09">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
      </select>
      <select v-model="year">
        <option disabled value="">YYYY</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
      <br>
      <p class="error" v-if="error">{{error}}</p>
      <button @click.prevent="getInventory()">See Inventory</button>
      <br>
      <br>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Slots Left</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inventory,i) in inventory" :key="i">
            <th scope="row">{{ inventory.date  }}</th>  
            <td>{{ inventory.slots_left }}</td> 
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Inventory',

  data: () => { 
    const today = new Date()
    const dd = today.getDate();
    const mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    return {
      month: mm,
      day: dd,
      year: yyyy,
      error: '',
      inventory: [],
    }
  },
  methods: {
    async getInventory () {
      const timestamp = new Date(this.year + "-" + this.month + "-" + this.day).getTime() / 1000
      try {
        await axios({
          method:'get',
          url: 'http://localhost:9090/inventory/' + timestamp,
          data: {}
        })
        .then((res) => {
          console.log('res', res)
          this.inventory = res.data
        })
      } catch (error) {
        this.error = error.response.data
      }
    }
  },
  async mounted() {
    try {
      await axios.get('http://localhost:9090/test')
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
