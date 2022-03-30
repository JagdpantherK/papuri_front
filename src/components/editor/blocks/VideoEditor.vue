<template lang="pug">
.p-5
  span {{ $t("video")}} <br>
  small.secondary {{ $t("audioUploadText")}}
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
  video.video(v-if="block.data.id && block.data.id !== 'undefined'" controls="true") {{$t(doesNotSupportVideo)}}
    source(:src="link(block.data.id)")
  p.secondary.center(v-else) {{$t("notSelected")}}
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "VideoEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getVideos"
    })
  },
  methods: {
    save(){
      this.$emit("save", this.block)
    },
    nameId(id, name){
      return id+"-"+name
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
.video
  width 100%
</style>
