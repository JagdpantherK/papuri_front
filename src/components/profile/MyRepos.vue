<template lang="pug">
router-link.clickable(:to="{name: 'CreateRepo'}") {{$t("createNewBook")}}
BookList
</template>

<script>
import BookList from "../repo/RepoList";

export default {
  name: "MyRepos",
  components: {BookList},
  computed: {
  },
  methods: {
  },
  mounted() {}
}
</script>

<style scoped>

</style>
