<template>
  <Meta v-bind:pageTitle="title"></Meta>
  <div v-show="loading" class="loader"></div>
  <div class="wrap">
    <Search></Search>
    <article>
      <h2>{{ title }}</h2>
      <p class="date">投稿日:{{ date }}</p>
      <ul class="category">
        <li v-for="category in cat" :key="category.id">{{ category.name }}</li>
      </ul>
      <div class="post-content" v-html="content"></div>
    </article>
  </div>
</template>

<script>
import axios from 'axios'
import Meta from './Meta.vue'
import Search from './Search.vue'
export default {
  name: 'PostComponent',
  components: {
    Meta,
    Search
  },
  emits: [ 'pageTitle' ],
  data() {
    return{
      title : '',
      content : '',
      date : '',
      cat : [],
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
        for(let i = 0; i < response.data.cat_info.length; i++){
          vuedata.cat.push(response.data.cat_info[i]);
        }
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
  article{ width:100%; margin:0; }
  h2{ margin:0; font-size:1.6rem; }
  .date{ font-size:0.9rem; }
  .category{ display:flex; jusitfy-content:flex-start; flex-wrap:wrap; margin:0; padding:0; }
  .category li{ list-style-type:none; background:#FFF; color:#333; font-size:11px; border:1px solid #AAA; border-radius:10px; padding:2px 8px; margin:0 5px 5px 0; }
  .post-content >>> h3{ margin:40px 0 20px; font-size:1.1rem; line-height:2; letter-spacing:1px; border-bottom:1px solid #333; }
  .post-content >>> h4{ border-left:2px solid #333; padding:0 0 0 10px; margin:20px 0; }
  .post-content >>> h5{ background:#DDD; padding:5px 10px; margin:20px 0 0; }
  .post-content >>> p{ margin:0; font-size:1.0rem; line-height:1.8; letter-spacing:0.1px; }
  .post-content >>> ul li{ margin:0; font-size:1.0rem; line-height:1.8; letter-spacing:0.3px; }
  .post-content >>> img{ max-width:100%; height:auto; }
  .post-content >>> a{  }
  .post-content >>> pre{ margin:0 0 40px; } 
  .post-content >>> pre code{ display:block; width:100%; font-size:0.8rem; background:#333; color:#FFF; padding:20px; box-sizing:border-box; overflow:scroll; }
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
