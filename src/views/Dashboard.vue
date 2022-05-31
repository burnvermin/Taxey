<template>
  <div class="container">
      <div class="header">
          <h1>Admin</h1>
      </div>
      <div class="body">
          <button @click="showUsers"> Users </button>
          <div class="users">
              <div class="display" v-for="(users, index) in users" :key="index">
                  <p>Username: {{ users.body.Name }}</p>
                  <p>User Email{{ users.body.Email }}</p>
                  <p>User Phone Number: {{ users.body.PhoneNo }}</p>
                  <br />
              </div>
          </div>
          <hr>
          <button @click="showOrders"> Orders </button>
          <div class="orders">
                <div class="display" v-for="(orders, index) in orders" :key="index">
                  <p>UserId: {{ orders.body.userId }}</p>
                  <p>Username: {{ orders.body.userName }}</p>
                  <p>Location: {{ orders.body.from }}</p>
                  <p>Destination: {{ orders.body.to }}</p>
                  <p>TransactionId: {{ orders._id }}</p>
                  <p>Date and Time: {{ orders.body.date }}</p>
                  <br />
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import carImg from '../assets/images/car.png'
import tearDropImg from '../assets/images/tearDrop.png'
import taxey from '../assets/images/Taxey.png'

export default {
  props: {

  },
  data () {
    return {
      login: true,
      images: {
        car: carImg,
        tearDrop: tearDropImg,
        text: taxey
      },
      users: [],
      orders: []

    }
  },

  created () {
    this.getUsers()
    this.getOrders()
  },

  computed: {
  },

  mounted: function () {

  },
  methods: {

    async getUsers () {
      try {
        const response = await this.$http.get(
          'https://ugpbe.herokuapp.com/collection/Users'
        )
        // JSON responses are automatically parsed.
        this.users = response.data
      } catch (error) {
        console.log(error)
      }
    },

    async getOrders () {
      try {
        const response = await this.$http.get(
          'https://ugpbe.herokuapp.com/collection/Orders'
        )
        // JSON responses are automatically parsed.
        this.orders = response.data
      } catch (error) {
        console.log(error)
      }
    },

    showUsers () {
      var tog = document.querySelector('.users')
      tog.classList.toggle('show')
    },

    showOrders () {
      var tog = document.querySelector('.orders')
      tog.classList.toggle('show')
    }
  }

}
</script>

<style scoped lang="scss">
    .container {
        background: #000;
        color: #fff;
        margin: 0;
        padding: 2em;
        width: 100vw;
        height: 100vh;
        font-size: 18px;
        position: relative;
        overflow-x: hidden;
        .header {
            color: black;
            background-color: #CEE0AD;
            position: fixed;
            width: 100vw;
            left: 0;
            top: 0;
            h1 {
                margin: 0;
                padding: .5em 1em;
            }
        }

        .body {
            margin-top: 6em;

            .users {
                display: none;
                grid-template-columns: auto auto auto;

            }
            .orders {
                display: none;
                grid-template-columns: auto auto auto;

            }
            .display {
                padding: 30px;
            }

            button{
                padding:  5px 15px;
                text-transform: uppercase;
                cursor: pointer;
            }
            .show {
                display: grid;
            }

            hr {
                width: 75%;
            }
        }
    }
</style>
