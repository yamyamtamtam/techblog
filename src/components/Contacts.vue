<template>
  <a href="/contacts" target="_blank" class="contacts"></a>
</template>

<script>
export default {
  name: 'ContactComponent',
  data() {
    return{

    };
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{ display:inline-block;; width:auto; padding:0!important; background:transparent; color:#333; font-size:1rem; text-align:center; text-decoration:none; font-weight:bold; }

.contacts {
  display: inline-block;
  vertical-align: middle;
  color: #333;
  line-height: 1;
  position:fixed; 
  top:155px; 
  right:35px; 
  z-index:100;
  width: 2.13334em;
  height: 1.6em;
  border: 0.3em solid currentColor;
  background: #FFF;
  border-radius: 0.1em;
  box-sizing: content-box;
  overflow: hidden;
}

.contacts::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 1.5085em;
  height: 1.5085em;
  border: 0.3em solid currentColor;
  border-top-color: transparent;
  border-right-color: transparent;
  border-radius: 0 0 0 0.3em;
  box-sizing: content-box;
  transform: translate(-50%, -50%) rotate(-45deg) skew(10deg, 10deg);
}

  /*------スマホ--------*/
  @media screen and (max-width:767px){
.contacts {
  right:15px; 
}
  } 
</style>
