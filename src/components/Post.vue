<template>
  <Meta v-bind:pageTitle="title"></Meta>
  <div v-show="loading" class="loader"></div>
  <div class="wrap">
    <article>
      <h2>{{ title }}</h2>
      <p>投稿日:{{ date }}</p>
      <div class="post-content" v-html="content"></div>
    </article>
  </div>
</template>

<script>
import axios from 'axios'
import Meta from './Meta.vue'
export default {
  name: 'PostComponent',
  components: {
    Meta
  },
  emits: [ 'pageTitle' ],
  data() {
    return{
      title : '',
      content : '',
      date : '',
      loading:true
    };
  },
  created() {
    this.postContent();
  },
  methods: {
    postContent(){
      let vuedata = this;
      let forApi = this.$route.path;
      forApi = 'http://localhost:8888/techblog/wp/wp-json/wp/v2/posts/' + forApi.replace('/post/','');
      axios
      .get(forApi)
      .then(function(response){
        vuedata.loading = false;
        let postDateObj = new Date(response.data.date);
        //console.log(response.data);
        vuedata.title = response.data.title.rendered,
        vuedata.content = response.data.content.rendered,
        vuedata.date = postDateObj.getFullYear() + '年' + (postDateObj.getMonth() + 1) + '月' + postDateObj.getDate() + '日'
        //console.log(vuedata.content);
      })
      .catch(function(error) {
        console.log(error);
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap{ width:90%; margin:0 auto; }
  article{ width:100%; margin:0 0 30px 30px; }
  article:nth-of-type(3n){ margin:0 0 30px 0; }
  h2{ margin:0; font-size:1.4rem; }
  p{ margin:15px 0; font-size:0.8rem; }
  a{ display:block; width:100%; padding:10px 0; background:#333; color:#FFF; font-size:1rem; text-align:center; text-decoration:none; font-weight:bold; }
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
  }
  .loader {
    color: #333;
    font-size: 10px;
    margin: 60px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  .loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 3.5em;
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

</style>
