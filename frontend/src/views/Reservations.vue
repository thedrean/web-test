<template>
  <div>
    <h1>Reservations</h1>
    <form id="reservation-form">
      <h2>Make A Reservation</h2>
      <input v-model="name" placeholder="Name">
      <input v-model="email" placeholder="Email">
      <br>
      <select v-model="partySize">
        <option disabled value="">Party Size</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <br>
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
      <span>Time</span>
      <select v-model="hour">
        <option disabled value="">HH</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
      </select>
      <select v-model="minute">
        <option disabled value="">mm</option>
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <br>
      <p class="error" v-if="error">{{error}}</p>
      <button @click.prevent="makeReservation()">Make Reservation</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Reservations',

  data: () => { 
    return { 
        partySize: "",
        month: "",
        day: "",
        year: "",
        hour: "",
        minute: "",
        name: "",
        email: "",
        date: "",
        time: "",
        checkedTime: "",
        error: ""
      }
    },
  methods: {
    async makeReservation () {
      const options = {
        name: this.name,
        email: this.email,
        partySize: this.partySize,
        date: this.month + '/' + this.day + '/' + this.year,
        time: this.hour + ':' + this.minute
      }
     
      try {
        await axios({
          method:'post',
          url: 'http://localhost:9090/reservation',
          data: options
        });
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
