<template>
  <div id="app" class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div>
      <Error/>
      <h2 class="header">GO TO A RESTAURANT</h2>
      <nav-links/>
    </div>
  </div>
</template>

<script>
import NavLinks from "./components/NavLinks.vue";
import Error from "./components/Error.vue";
export default {
  components: {
    NavLinks,
    Error
  },
  name: "App",
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transition: all 0.3s ease-in-out;
  .header {
    margin: 0;
    background: whitesmoke;
    width: 100vw;
    padding: 2rem 0 2rem 0;
  }
  h1,
  h2,
  h3 {
    margin: 2rem;
  }
  h1 {
    color: $color_;
  }
  h3 {
    font-size: 24px;
  }
  input,
  button {
    border-radius: 0;
    border: 1px solid rgba(155, 205, 153, 0.8);
  }
  .container {
    width: 80%;
    margin: 0 auto;
  }
  @media all and (max-width: 780px) {
    .container {
      width: 100%;
    }
  }
  button:hover {
    background: rgba(40, 131, 40, 0.884);
    color: whitesmoke;
    cursor: pointer;
  }
  .router-link {
    font-size: $router_link_font_size;
    color: $router_link_color;
    text-decoration: none;
    padding: 1rem;
  }
  .router-link.router-link-exact-active {
    color: $router_link_active_color;
  }
  .hidden {
    display: none;
  }
  .navigation {
    position: relative;
  }
  label {
    user-select: none;
  }
}
</style>
