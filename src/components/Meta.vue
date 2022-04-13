<template>
  <div></div>
</template>

<script>
export default {
  name: 'MetaComponent',
  props: [ 'pageTitle' ],
  mounted() {
    this.setMeta();
  },
  watch: { 
    '$route' () {
      this.setMeta();
    },
    'pageTitle' (){
      this.setMeta();
    }
  },
  methods : {
    setMeta(){
    let route = this.$route;
      if(this.pageTitle){
        let metaTitle = this.pageTitle;
        document.title = metaTitle;
      }else if(route.meta.title){
        let metaTitle = route.meta.title;
        document.title = metaTitle;
      }
      if(route.meta.description){
        let metaDescription = route.meta.description;
        document.querySelector("meta[name='description']").setAttribute('content', metaDescription);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
