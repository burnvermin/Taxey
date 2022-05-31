<template>
  <div class="container">

   <div class="bg">

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
      }

    }
  },
  computed: {
  },

  mounted: function () {

  },
  methods: {
  }

}
</script>

<style scoped lang="scss">

</style>
