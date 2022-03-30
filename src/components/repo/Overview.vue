<template lang="pug">
a( @click="fetchReadClick")
  button.btn.black-btn() {{$t("read")}}
.stats Count: {{ info.files_count }} Size: {{ size(info.files_size) }}
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "Overview",
  computed: {
    ...mapGetters({
      info: "repo/getInfo",
      repo: "repos/getCurrent"
    })
  },
  methods: {
    ...mapMutations({
      makeCurrentReading: "repos/makeCurrentReading"
    }),
    ...mapActions({
      setReading: "repos/setReading"
    }),
    size(bytes) {
      return this.bytesToSize(bytes)
    },
    async fetchReadClick(){
      await this.setReading({
        username: this.repo.user_name,
        repo: this.repo.name
      })
      await this.$router.push({
        name: 'CurrentBook',
        params: {
          internal: true
        }
      })
    }
  },
  mounted() {
    this.setTitle()
  }
}
</script>
