<template lang="pug">
.p-5
  span {{$t("image")}} <br>
  small.secondary {{"audioUploadText"}}
  br
  select( v-model="block.data.imageId" @change="save")
    option(
      v-for="m in media"
      :key="m.id"
      :value="nameId(m.id, m.name)"
      :selected="nameId(m.id, m.name) === block.data.imageId")
      | {{ nameId(m.id, m.name) }}
  br
  br
  img.image.center(:src="link(block.data.imageId)")
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "ImageEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getImages"
    }),
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
.image
  width auto
  max-width 100%
  max-height 500px
</style>
