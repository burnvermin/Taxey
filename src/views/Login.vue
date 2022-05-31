<template>
  <div class="container">

   <div class="bg">
       <img v-bind:src="images.tearDrop" alt="image" id="one">
       <img v-bind:src="images.car" alt="image" id="two">
       <img v-bind:src="images.text" alt="image" id="three">
   </div>
   <div v-if="login" class="login">
        <form>
            <div class="form-control">
                <label>E-mail or Username</label>
                <input type="text" required v-model="existingUsers.email">
            </div>

            <div class="form-control">
                <label>Password</label>
                <input type="password" required v-model="existingUsers.password">
            </div>

            <p id="errorMsg"></p>

            <router-link :to="router" ><button class="btn" @click="check()">Login</button></router-link>

            <p class="text">Don't have an acount? <a href="#" @click="register()">Register</a> <span id="forgotPasword" style="display : none"> or <a href="/">Forgot  Password</a></span></p>
        </form>
   </div>
   <div v-else class="signUp">
        <form>
            <div class="form-control">
                <input type="text" required  v-model="newUser.Name">
                <label>Name</label>
            </div>

            <div class="form-control">
                <input type="email" required v-model="newUser.Email">
                <label>Email</label>
            </div>

            <div class="form-control">
                <input type="number" required  v-model="newUser.PhoneNo">
                <label>Phone Number</label>
            </div>

            <div class="form-control">
                <input type="password" required  v-model="newUser.Password">
                <label>Password</label>
            </div>

            <a href="/" @click="signUp ()"><button class="btn">Sign Up</button></a>

            <p class="text">Already have an acount? <a href="#" @click="Login()">Login</a> </p>
        </form>
   </div>

  </div>
</template>

<script>

import carImg from '../assets/images/car.png'
import tearDropImg from '../assets/images/tearDrop.png'
import taxey from '../assets/images/Taxey.png'
import axios from 'axios'

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
      router: '',
      users: [],
      existingUsers: {
        email: '',
        password: '',
        id: ''

      },
      newUser: {
        Name: '',
        Password: '',
        Email: '',
        PhoneNo: ''

      }

    }
  },

  created () {
    this.getData()
    console.log(this.users)
  },

  computed: {

  },

  mounted: function () {

  },
  methods: {
    register () {
      this.login = false
    },
    Login () {
      this.login = true
    },

    check () {
      var err = document.getElementById('errorMsg')
      var fP = document.getElementById('forgotPasword')
      for (var i = 0; i < this.users.length; i++) {
        if ((this.existingUsers.email === this.users[i].body.Name || this.users[i].body.Email) && (this.existingUsers.password === this.users[i].body.Password)) {
          if (this.existingUsers.email === 'admin' && this.existingUsers.password === 'admin') {
            this.router = '/dashboard'
          } else {
            this.existingUsers.id = this.users[i]._id
            this.router = '/home'
            this.$emit('id', this.existingUsers.id)
            this.$emit('name', this.users[i].body.Name)
          }
        } else {
          err.innerHTML = 'Account not found'
          fP.style.display = 'block'
        }
      }
    },

    async getData () {
      try {
        const response = await this.$http.get(
          'https://ugpbe.herokuapp.com/collection/Users'
        )
        // JSON responses are automatically parsed.
        this.users = response.data
        console.log(this.users)
      } catch (error) {
        console.log(error)
      }
    },

    async signUp () {
      try {
        await axios.post(
          'https://ugpbe.herokuapp.com/collection/Users', {
            body: this.newUser
          })
      } catch (error) {
        console.log(error)
      }
      this.$router.go()
    }
  }

}
</script>

<style scoped lang="scss">
    @keyframes drop-in {
        0% {
        transform: translateY(-200%);
        }
        100% {
        transform: translateY(0%);
        }
    }
        @keyframes slide-in {
        0% {
        transform: translateX(400%);
        }
        100% {
        transform: translateX(0%);
        }
    }
        @keyframes fade-up {
        0% {
        transform: translateY(200%);
        opacity: 0;
        }
        100% {
        transform: translateY(0%);
        opacity: 1;
        }
    }
        @keyframes appear {
        0% {
        opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
        opacity: 1;
        }
    }
 .container {
     background-color: #CEE0AD;
     width: fill;
     height: 110vh;
     overflow: auto;
     justify-content: center;
     align-content: center;
     .bg {
        display: grid;
        position: static;
        top: 10%;
        align-content: center;

        #one, #two, #three {
            margin: auto;
            position: relative;
        }

        #one {
            padding: 10px;
            animation: drop-in .5s ease-in;
        }
        #two {
            animation: slide-in .75s ease-in;
        }
        #three {
            animation: fade-up 1s;
        }
     }

 }

 .login, .signUp {
        background-color: rgba(0, 0, 0, .2);
        padding: 20px 40px;
        border-radius: 5px;
        width: 15vw;
        margin: auto;
        margin-top: 8em;
        animation: appear 2s ease;

    a {
        text-decoration: none;
        color: #0D8D11;
    }

    .btn {
        cursor: pointer;
        display: inline-block;
        width: 100%;
        background: #0D8D11;
        color: white;
        padding: 15px;
        font-family: inherit;
        font-size: 16px;
        border: 0;
        border-radius: 5px;

        a {
            color: white;
        }
    }

    .btn:focus {
        outline: 0;
    }

    .btn:active {
        transform: scale(.98);
    }

    .text {
        margin-top: 30px;
    }

    .form-control {
        position: relative;
        margin: 20px 0 40px;

        input {
            background-color: transparent;
            border: 0;
            border-bottom: 2px #fff solid;
            display: block;
            width: 100%;
            padding: 15px 0;
            font-size: 18px;
            color: #fff ;
        }

        label {
            position: absolute;
            top: -5px;
            left: 0;
            font-weight: bold;

            span {
                display: inline-block;
                font-size: 18px;
                min-width: 5px;
                transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
        }

        input:focus, input:valid {
            outline: 0;
            border-bottom-color: #CEE0AD;
        }

        input:focus + label span, input:valid + label span {
            color: #CEE0AD;
            transform: translateY(-30px);
        }
    }
 }

</style>
