<template>
  <div class="container">
      <div class="header">
          <h1>Ride History</h1>
      </div>
      <div class="body">
          <div class="orders">
                <div class="display" v-for="(order, index) in orders" :key="index">
                  <p>Location: {{ order.body.from }}</p>
                  <p>Destination: {{ order.body.to }}</p>
                  <p>TransactionId: {{ order._id }}</p>
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
    username: [
      String
    ],
    id: [
      String
    ]
  },

  data () {
    return {
      login: true,
      images: {
        car: carImg,
        tearDrop: tearDropImg,
        text: taxey
      },
      orders: []

    }
  },

  created () {
    console.log(this.id)
    this.getOrders()
  },

  computed: {

  },

  mounted () {
    this.getHistory()
  },
  methods: {

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

    getHistory () {
      for (var i = 0; i <= this.orders.length; i++) {

      }
    }
  }

}
</script>

<style scoped lang="scss">
    .container {
        background: #000;
        position: fixed;
        overflow: auto;
        color: #fff;
        margin: 0;
        padding: 2em;
        width: 100vw;
        height: 130vh;
        font-size: 18px;
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
