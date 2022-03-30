<template lang="pug">
.p-5
  span Test
  br
  input(v-model="block.data.title" @change="save" placeholder="title")
  hr
  span.clickable(@click="addOption") {{$t("addOption")}}
  hr
  template(v-for="(opt, index) in block.data.options")
    span -&nbsp;
    input(:value="opt" @change="changeOpt($event, index)" placeholder="option")
    br

</template>

<script>
import {debounce} from "@/components/editor/blocks/functions";

export default {
  name: "TestEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  methods: {
    changeOpt(evt, index){
      let block = this.block
      block.data.options[index] = evt.target.value
      this.save()
    },
    save(){
      debounce( () => {
        this.$emit("save", this.block)
      }, 1000)()
    },
    addOption(){
      let block = this.block
      block.data.options.push('')
    }
  },
}
</script>

<style scoped lang="stylus">
input
  padding 2px
</style>
