<template>
  <div v-if="seachWindow" v-on:click="SeachClose" class="closeButton">×</div>
  <div v-else v-on:click="SearchOpen" class="searchButton"></div>
  <div v-if="seachWindow" class="searchWindow">
    <div class="inner">
      <input v-model="searchText" v-on:input="searchStart" class="search" type="text" placeholder="キーワードを入力">
      <div v-show="loading" class="loader"></div>
      <div v-if="exist" v-show="!loading">
        <article v-for="post in posts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <p>投稿日:{{ post.date }}</p>
          <ul class="category">
            <li v-for="category in post.cat" :key="category.id">{{ category.name }}</li>
          </ul>
          <router-link v-bind:to="post.link">記事を読む</router-link>
        </article>
      </div>
      <div v-else v-show="!loading">
        <p class="searchNone">検索条件に合致する投稿はありません。</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchComponent',
  data() {
    return{
      posts: [],
      loading: false,
      seachWindow: false,
      searchText: '',
      exist: true
    };
  },
  methods: {
    searchStart(){
      let currentWord = this.searchText;
      this.loading = true;
      let vuedata = this;
      setTimeout(function(){ //2秒入力がない場合だけ検索する（１文字打つごとに検索されるのを防止）
        if(currentWord === vuedata.searchText){
          //console.log(currentWord);
          vuedata.loading = false;
          vuedata.posts = [];
          let forApi = 'https://api.yamyamtamtam.tech/wp-json/wp/v2/posts/?search=' + vuedata.searchText;
          axios
          .get(forApi)
          .then(function(response){
            vuedata.exist = true;
            vuedata.loading = false;
            if(response.data.length > 0){
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
            }else{
              vuedata.exist = false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        }
      }, 2000);
    },
    SearchOpen(){
      this.seachWindow = true;
    },
    SeachClose(){
      this.seachWindow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .searchWindow{ position:fixed; top:0; left:0; z-index:10; flex-wrap:wrap; width:100vw; height:100vh; margin:0 auto; background:rgba(0,0,0,0.8); animation:0.5s ease-in-out opacityShow; overflow-y:scroll; }
  @keyframes opacityShow {
    0%{ opacity:0; }
    100%{ opacity:100%; }
  }
  .inner{ width:95vw; margin:10% auto; overflow-y:scroll; }
  input{ width:100%;  padding:15px 10px; font-size:18px; overflow:initial; }
  article{ width:100%; border:1px solid #CCC; margin:30px 0 0; padding:30px; box-sizing:border-box; background:#FFF; }
  article:nth-of-type(3n){ margin:0 0 30px 0; }
  h2{ margin:0; font-size:1.4rem; }
  p{ margin:15px 0; font-size:0.8rem; }
  a{ display:block; width:100%; padding:10px 0; background:#333; color:#FFF; font-size:1rem; text-align:center; text-decoration:none; font-weight:bold; }
  .category{ display:flex; jusitfy-content:flex-start; flex-wrap:wrap; margin:0 0 10px; padding:0; }
  .category li{ list-style-type:none; background:#FFF; color:#333; font-size:11px; border:1px solid #AAA; border-radius:10px; padding:2px 8px; margin:0 5px 5px 0; }
  .closeButton{ position:fixed; top:30px; right:30px; z-index:100; font-size:48px; color:#FFF; font-weight:bold; cursor:pointer; text-shadow:0 0 5px #000; }
  .searchNone{ font-size:18px; color:#FFF; margin:30px 0 0; }
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
    color: #FFF;
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
  .searchButton {
      display: inline-block;
      position: fixed;
      top:90px;
      right:30px;
      width: 1em;
      height: 1em;
      color: #333;
      font-size: 50px;
      cursor: pointer;
  }
  .searchButton::before {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 0.7em;
      height: 0.7em;
      box-sizing: border-box;
      border: 0.15em solid currentColor;
      border-radius: 50%;
      background-color: #fff;
      content: "";
  }
  .searchButton::after {
      position: absolute;
      top: 0px;
      left: 40%;
      z-index: -1;
      transform: rotate(-50deg);
      width: 0.15em;
      height:0.9em;
      border-radius:5px;
      box-sizing: border-box;
      background-color: currentColor;
      content: "";
  }

  /*------スマホ--------*/
  @media screen and (max-width:767px){
    article{ width:100%; margin:30px 0 0; }
      .searchButton {
      right:10px;
    }
  } 
</style>
