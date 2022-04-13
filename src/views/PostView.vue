<template>
    <Post @pageTitle = "$attrs['titleChange']"></Post>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'

export default {
  name: 'PostView',
  components: {
    Post
  }
}
</script>
