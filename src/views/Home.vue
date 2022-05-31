<template>
  <div class="container">

   <div class="header">
     <!-- Linking back to the login page for now! -->
      <router-link to="/" ><img :src="logoImg" alt="image" id="one"></router-link>
      <div class="settingsIcon" @click="showSettings()">
        <img :src="iconImg" alt="avatarImage" id="avatarImage" >
      </div>
   </div>
   <div class="body">
      <div class="profile">
        <img v-bind:src="avatarImg" alt="avatarImage" id="avatarImage" width="100px">
        <p>{{username}}</p>
        <div class="settings">
          <p id="logout"><router-link :to="history" >Ride History</router-link></p>
          <p id="logout"><router-link :to="router" >LogOut</router-link></p>
        </div>
      </div>
       <div class="left shiftLeft">

            <label>
              <gmap-autocomplete @place_changed="initMarker" id="from" class="myInput"></gmap-autocomplete>
              <button @click="addLocationMarker" id="btn">:From </button>
            </label>

            <label>
              <gmap-autocomplete @place_changed="initMarker" id="to" class="myInput"></gmap-autocomplete>
              <button @click="addLocationMarker" id="btn">:To &nbsp;&nbsp;&nbsp;&nbsp;</button>
            </label>

            <button id="request" @click="placeOrder()">Request Now!</button>
       </div>
       <div class="right">
         <div id="map">
            <gmap-map id="actualMap"
                :zoom="14"
                :center="center"
              >
              <gmap-marker
                :options="options"
                :key="index"
                v-for="(m, index) in locationMarkers"
                :position="m.position"
                @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
         </div>
       </div>
   </div>
  </div>
</template>

<script>

import axios from 'axios'
import logo from '../assets/images/logo.png'
import xIcon from '../assets/images/X.png'
import avatar from '../assets/images/avatar.png'
import hamburgerIcon from '../assets/images/hamburgerIcon.png'

export default {
  props: {
    username: [
      String
    ],
    id: [
      String
    ]
  },

  name: 'AddGoogleMap',

  data () {
    return {
      login: true,
      logoImg: logo,
      avatarImg: avatar,
      hamburger: hamburgerIcon,
      x: xIcon,
      iconImg: '',
      center: {
        lat: 6.6325,
        lng: 3.3910
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      order: {
        userName: '',
        userId: '',
        from: '',
        to: '',
        date: ''
      },
      router: '/',
      history: '/home/history'

    }
  },

  created () {
    this.order.userName = this.username
    this.order.userId = this.id
  },

  mounted () {
    this.locateGeoLocation()
    this.iconImg = this.hamburger
  },

  computed: {
  },

  methods: {

    initMarker (loc) {
      this.existingPlace = loc
    },

    addLocationMarker () {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
          label: {
            color: 'green'
          }
        }
        this.locationMarkers.push({ position: marker })
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },

    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      })
    },

    async placeOrder () {
      let from = document.getElementById('from').value
      let to = document.getElementById('to').value
      var currentDate = new Date()
      this.order.from = from
      this.order.to = to
      this.order.date = currentDate
      alert('Order Placed Sucessfully')
      alert('Searching for a rider!')
      try {
        await axios.post(
          'https://ugpbe.herokuapp.com/collection/Orders', {
            body: this.order
          })
        this.login = false
      } catch (error) {
      }
    },

    showSettings () {
      document.querySelector('.settingsIcon').classList.toggle('show')
      document.querySelector('.profile').classList.toggle('showProfile')
      if (this.iconImg === this.hamburger) {
        this.iconImg = this.x
      } else {
        this.iconImg = this.hamburger
      }
    }

  }

}
</script>

<style scoped lang="scss">

    .container {
        position: relative;
        color:"black";
        .header {
            height: 7vh;
            background: #CEE0AD;
            position: inherit;

            img {
                height: 100%;
                position: absolute;
                right: 0;
            }

            p{
              margin: 0;
              padding: 20px;
              font-size: 25px;
            }
            .settingsIcon {
              height: 40px;
              width: 40px;
              border-radius: 50%;
              margin: .7em .5em;
              position: absolute;
            }

            .settingsIcon.show {
              margin: .7em 13em;
            }
        }
    }

    .body {
        display: flex;

        .profile {
          background-color: #ffffff;
          width: 23vw;
          height: 28vh;
          position: relative;
          text-align: center;
          text-transform: capitalize;
          font-size: larger;
          padding: 12px;
          z-index: 2;
          opacity: .9;
          display: none;

          .settings {
            list-style: none;

            #logout a {
              text-decoration: none;
              text-transform: none;
              color: black;
            }
          }
        }
        .showProfile {
          display: block;
        }
        .left {
          display: grid;
            height: 40vh;
            width: 23vw;
            background-color: #CEE0AD;
            align-content: center;
            justify-content: center;
            position: relative;
            z-index: 2;
            opacity: .95;

          /* The search field */
        .myInput {
            box-sizing: border-box;
            background-repeat: no-repeat;
            font-size: 16px;
            padding: 14px 20px 12px 45px;
            border: none;
            border-bottom: 1px solid #ddd;
            width: 70%;
            margin: 15px;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
          }

        /* The search field when it gets focus/clicked on */
        .myInput:focus {
            outline: 3px solid #ddd;
          }

        #btn {
          padding: 15px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          outline: none;
          border: none;
          cursor: pointer;
          background-color: #F59320;
          background-image: linear-gradient(#F59320, rgba(235, 221, 17, .8));
          color: white;
          font-weight: bolder;
        }

        #btn:active, #request:active {
          outline: none;
          transform: scale(.9);
        }

        #request {
          padding: 15px;
          width: 90%;
          margin: auto;
          outline: none;
          border: none;
          cursor: pointer;
          background-color: #F59320;
          background-image: linear-gradient(#F59320, rgba(235, 221, 17, .8));
          color: white;
          font-weight: bolder;
          font-size: 24px;

        }
      }

    .right {
        background-color: rgb(173, 215, 255);
        width: 100vw;
        position: fixed;
        height: 93vh;
        z-index: 0;

        #actualMap {
          position: absolute;
          width: 100%;
          height: 100%;
        }
    }

}

</style>
