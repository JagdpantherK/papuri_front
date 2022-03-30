<template lang="pug">
.settings
  .title General
  p(@click="logOut").clickable {{ $t("logOut")}}
  hr
  .title {{$t("userCredentials")}}
  .input-wrapper
    input(placeholder="Email" v-model="email" name="settings_email")
  .input-wrapper
    select(v-model="img")
      option(
        v-for="m in images"
        :key="m.id"
        :value="`${m.id}`")
        | {{ nameId(m.id, m.name) }}
  .input-wrapper
    input(placeholder="First Name" v-model="first_name")
  .input-wrapper
    input(placeholder="Last Name" v-model="last_name")
  .input-wrapper
    button.btn.black-btn(@click="save({email, img, first_name, last_name})") {{ $t('save') }}
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      email: '',
      first_name: '',
      last_name: '',
      img: '',
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      images: "media/getImages"
    })
  },
  methods: {
    ...mapActions({
      logOut: "logout",
      save: "saveUser",
      updateMedia: "media/updateMedia"
    }),
    nameId(id, name){
      return id+"-"+name
    },
  },
  mounted() {
    this.updateMedia()
    this.email = this.user.email
    this.last_name = this.user.last_name
    this.first_name = this.user.first_name
    this.img = this.user.img
  },
  watch: {
    user(val){
      this.email = val.email
      this.last_name = val.last_name
      this.first_name = val.first_name
      this.img = val.img
    }
  }
}
</script>

<style scoped>

</style>
