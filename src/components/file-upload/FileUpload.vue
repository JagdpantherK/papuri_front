<template lang="pug">
.file-upload
  h3(v-if="files.length > 0") {{ $t("fileUploadingStatus")}}
  ul
    template(v-for="file in files" :key="file.id")
      li {{ file.name }} - {{ size(file.uploadedSize) }}/{{ size(file.size) }} - {{ file.type }}
  input(type="file" ref="fileUploader" @change="fileSelected")
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FileUpload",
  computed: {
    ...mapGetters({
      files: 'media/uploadingFiles'
    })
  },
  methods: {
    ...mapActions({
      upload: 'media/upload',
    }),
    fileSelected(){
      console.log(this.$refs.fileUploader.files)
      this.$refs.fileUploader.files[0] && this.upload(this.$refs.fileUploader.files[0])
    },
    size(bytes){
      return this.bytesToSize(bytes)
    },
  },
  mounted() {}
}
</script>

<style scoped lang="stylus">

</style>
