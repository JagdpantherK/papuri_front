<template lang="pug">
.p-5
  span {{ $t("audio") }} <br>
  small.secondary {{ $t("audioUploadText   ")}}
  br
  select( v-model="block.data.id" @change="save")
    option(
      v-for="m in media"
      :key="m.id"
      :value="nameId(m.id, m.name)"
      :selected="nameId(m.id, m.name) === block.data.id")
      | {{ nameId(m.id, m.name) }}
  br
  br
  audio(v-if="block.data.id && block.data.id !== 'undefined'" controls="true") Your browser does not support the audio element.
    source(:src="link(block.data.id)")
  p.secondary.center(v-else) Audio not selected

</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "AudioEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getAudios"
    })
  },
  methods: {
    save(){
      this.$emit("save", this.block)
    },
    nameId(id, name) {
      return id + "-" + name
    },
    link(id){
      return Axios.generateMediaLink(id.slice(0, id.indexOf("-")))
    }
  }
}
</script>

<style scoped lang="stylus">
select
  padding 0
  border-radius 0
</style>
