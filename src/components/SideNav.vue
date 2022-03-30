  <template lang="pug">
.side-nav(:class="{closed: !open, absolute: !isFixed}")
  .cont
    a.bars( v-if="!isFixed && (isFixed || !open)" @click="toggleMenu")
      font-awesome-icon(icon="bars")
    span.close.clickable( v-if="!isFixed" @click="close")
      font-awesome-icon(icon="times")
    ul.list
      li(
        v-if="user && loggedIn"
        )
        AvatarIcon(
          :user="user"
          :size="40"
          )
        router-link(
          :to="{name: 'Activity', params: {username: user_name}}"
          ).title &nbsp; {{ user.user_name }}
      li Тема: &nbsp;
        select(@change="onThemeChange($event)" :value="theme")
          option( v-for="t in themes" :value="t.name") {{ t.translated }}
      li
        router-link(:to="{name: 'Popular'}").navbar-item AllRepos
      li
        router-link(:to="{name: 'Media'}").navbar-item Media

      li(v-if="!loggedIn")
        router-link(:to="{name: 'Login'}" ).navbar-item Login
      li
        label isFixed
        input(type="checkbox" :checked="isFixed" @change="isFixedChanged($event)")
      li(@click="testnotifications")
        label Push Test Notification
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import AvatarIcon from "./profile/AvatarIcon";

export default {
  name: "SideNav",
  components: {AvatarIcon},
  data(){
    return {
      themes: [
        {
          name: "dark",
          translated: "Темная"
        },{
          name: "light",
          translated: "Светлая"
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      open: "getMenuState",
      theme: "getTheme",
      loggedIn: "getLoggedIn",
      user: "getUser",
      isFixed: "isMenuFixed"
    }),
    user_name() {
      return this.user ? this.user.user_name: ''
    }
  },
  methods: {
    ...mapMutations(["setTheme", "toggleMenu", "setFixedMenu"]),
    close(){
      this.toggleMenu()
    },
    testnotifications(){
      this.$store.dispatch("notification/pushNotification", {title: "test", body: "some text tto test"})
    },
    isFixedChanged(e){
      this.setFixedMenu(e.target.checked)
    },
    onThemeChange(event) {
      this.setTheme(event.target.value)
    },
    toggleMenu(){
      this.$store.commit("toggleMenu")
    }
  }
}
</script>

<style lang="stylus" scoped>
.side-nav
  color $text_color
  background $background_color
  max-width 100vw
  min-width $sidenav_width
  z-index 900
  height 100vh
  box-shadow 1px 1px 10px $light_shadow_color
  transition  .5s
  left 0
  .cont
    padding 10px
    .close
      float right
    ul
      list-style none
      padding 0
      li
        padding 11px
        border-bottom 1px solid $light_lines_color
        a
          color $text_color
          text-decoration none
          font-size 16px
          font-weight 500
.bars
  border-radius 3px
  padding 5px
  margin 3px
  color $text_color
  text-decoration none
  transition .3s
  float right
  transform translate(40px, -10px)
  background $background_color
.closed
  transform translateX(-300px)
</style>
