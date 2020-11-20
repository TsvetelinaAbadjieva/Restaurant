<template>
  <div class="container">
    <div class="restaurants col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <h1>Restaurants</h1>
      <div class="list col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Thumbnail
          :props="restaurant"
          v-for="restaurant in restaurants"
          v-bind:key="restaurant.id"
          class="col-lg-12 col-md-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api-service";
import Thumbnail from "./Thumbnail.vue";
export default {
  components: {
    Thumbnail
  },
  name: "Restaurants",
  emits:['shownavlinks'],
  props: {
    msg: String
  },
  data() {
    this.$root.$emit("shownavlinks", true);

    return {
      loggedIn: sessionStorage.getItem("user") ? true : false,
      restaurants: []
    };
  },
  methods: {
    mapData() {
      this.restaurants = this.restaurants.map(restaurant => {
        let {
          id,
          name,
          type,
          description,
          image: {
            formats: {
              thumbnail: { url: url }
            }
          },
          dishes
        } = { ...restaurant };
        let mappedObj = {
          id: id,
          name: name,
          type: type,
          description: description,
          dishes: dishes,
          url: process.env.VUE_APP_BASE_URL + url.substring(1)
        };
        return mappedObj;
      });
      console.log("map", this.restaurants);
    }
  },
  async created() {
    try {
      this.restaurants = await ApiService.get("restaurants");
      this.mapData();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
