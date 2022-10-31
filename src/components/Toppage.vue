<template>
  <Meta></Meta>
  <div v-show="loading" class="loader"></div>
  <div class="wrap">
    <Search></Search>
    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>投稿日:{{ post.date }}</p>
      <ul class="category">
        <li v-for="category in post.cat" :key="category.id">{{ category.name }}</li>
      </ul>
      <router-link v-bind:to="post.link">記事を読む</router-link>
    </article>
  </div>
</template>

<script>
import axios from 'axios'
import Meta from './Meta.vue'
import Search from './Search.vue'
export default {
  name: 'ToppageComponent',
  components: {
    Meta,
    Search
  },
  data() {
    return{
      posts:[],
      loading:true
    };
  },
  created(){
    this.postList();
  },
  methods: {
    postList(){
      let vuedata = this;
      vuedata.posts = [];
      axios
      .get('https://yamyamtamtam.tech/wp/wp-json/wp/v2/posts?context=embed&per_page=100')
      .then(function(response){
        vuedata.loading = false;
        for(let i = 0; i <= response.data.length; i++){
          //console.log(response.data[i]);
          let postDateObj = new Date(response.data[i].date);
          let catDatas = [];
          for(let k = 0; k < response.data[i].cat_info.length; k++){
            catDatas.push(response.data[i].cat_info[k]);
          }
          vuedata.posts.push(
            {
              id : response.data[i].id,
              title : response.data[i].title.rendered,
              link : '/post/' + response.data[i].id,
              date : postDateObj.getFullYear() + '年' + (postDateObj.getMonth() + 1) + '月' + postDateObj.getDate() + '日',
              cat : catDatas
            }
          )
        }
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
  .wrap{ display:flex; justify-content:flex-start; align-items:stretch; flex-wrap:wrap; width:90%; margin:0 auto; }
  article{ width:calc(100% / 3 - 20px); border:1px solid #CCC; margin:0 30px 30px 0; padding:30px; box-sizing:border-box; }
  article:nth-of-type(3n){ margin:0 0 30px 0; }
  h2{ margin:0; font-size:1.4rem; }
  p{ margin:15px 0; font-size:0.8rem; }
  a{ display:block; width:100%; padding:10px 0; background:#333; color:#FFF; font-size:1rem; text-align:center; text-decoration:none; font-weight:bold; }
  .category{ display:flex; jusitfy-content:flex-start; flex-wrap:wrap; margin:0 0 10px; padding:0; }
  .category li{ list-style-type:none; background:#FFF; color:#333; font-size:11px; border:1px solid #AAA; border-radius:10px; padding:2px 8px; margin:0 5px 5px 0; }
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
  /*------スマホ--------*/
  @media screen and (max-width:767px){
    article{ width:100%; margin:0 0 30px; }
  } 
</style>
