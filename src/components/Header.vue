<template>
<header>
  <h1><router-link to="/">技術等メモブログ</router-link></h1>
  <p>ちょっとずつモダンなWeb技術を習得していきたいブログ</p>
</header>
</template>

<script>
export default {
  name: 'AllHeader'

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header{ margin:40px 0; }
  header a { color:#333; text-decoration:none; }
  h1{ margin:0 0 20px; font-size:2.1rem; text-align:center; }
  p{ font-size:1rem; text-align:center; }
</style>
