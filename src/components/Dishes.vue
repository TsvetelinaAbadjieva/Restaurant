<template>
  <div class="container">
    <div class="dishes">
      <div class="title">
        <h1>Welcome to {{name}} {{type}} kitchen</h1>
      </div>
      <div class="order-block col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="order col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <h5>Order</h5>
          </div>
          <table>
            <thead>
              <th>Dish</th>
              <th>Count</th>
              <th>Price</th>
            </thead>
            <tbody>
              <tr v-for="selected in selectedDishes" v-bind:key="selected.id">
                <td>{{selected.isSelected ? selected.name :''}}</td>
                <td>{{selected.isSelected ? selected.count :''}}</td>
                <td>{{selected.isSelected ? selected.price*selected.count :''}}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{{total_count}}</td>
                <td>{{total}}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button class="buy" @click="makeOrder">
              Buy
              <i class="fa fa-dollar"></i>
            </button>
            <button class="delete" @click="deleteSelection">
              Remove
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="dishes-list col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div
          class="thumbnail"
          :class="{selected:dish.isSelected}"
          v-bind:key="dish.id"
          v-for="dish in dishes"
        >
          <div>
            <img :src="dish.url" alt="dish">
          </div>
          <div class="name">{{dish.name}}</div>
          <div class="type">{{dish.type}}</div>
          <div class="description">{{dish.description}}</div>
          <div class="price">Price {{dish.price}}</div>

          <div class="controls col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="col-lg-6 col-md-6">
              <label for="selection" class="select-dish" @click="toggleSelected(dish)">
                <svg
                  width="3.5em"
                  height="3.5em"
                  viewBox="0 0 16 16"
                  class="bi bi-cart-dash"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M6 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                  ></path>
                </svg>
              </label>
              <input id="selection" type="checkbox">
            </div>
            <div class="count col-lg-6 col-md-6">
              <label for>Count</label>
              <input
                type="number"
                placeholder="Count"
                value="dish.count"
                min="0"
                v-model="dish.count"
                @input="validate(dish)"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api-service";
export default {
  name: "Dishes",
  data() {
    this.$root.$emit("shownavlinks", true);
    return {
      selected: false,
      selectedDishes: [],
      name: "",
      type: "",
      dishes: [],
      total: 0,
      total_count: 0
    };
  },
  methods: {
    validate(dish) {
      dish.count = dish.count <= 0 || dish.count == "" ? 0 : dish.count;
      if (dish.count == 0) {
        dish.isSelected = false;
      }
      this.calculateTotals();
      sessionStorage.setItem(
        "selectedDishes",
        JSON.stringify(this.selectedDishes)
      );
    },
    deleteSelection() {
      this.selectedDishes = [];
      this.dishes.forEach(item => {
        item.isSelected = false;
        item.count = 0;
      });
      sessionStorage.removeItem("selectedDishes");
      this.total = 0;
      this.total_count = 0;
    },
    toggleSelected(dish) {
      this.selected = !this.selected;
      this.total_count = this.selected ? this.total_count : 0;
      dish.count = this.selected ? 1 : dish.count;
      this.selectedDishes = this.selectedDishes.filter(
        item => item.id != dish.id
      );
      dish.isSelected = this.selected;
      if (dish.isSelected) {
        this.selectedDishes = [...this.selectedDishes, dish];
      }
      console.log("Selected", this.selectedDishes);
      this.totalCount();
      this.totalPrice();
      sessionStorage.setItem(
        "selectedDishes",
        JSON.stringify(this.selectedDishes)
      );
    },
    totalPrice() {
      this.total = this.selectedDishes.reduce((acc, item) => {
        item.count = !item.count ? 0 : item.count;
        return item.isSelected ? (acc += item.price * item.count) : acc;
      }, 0);
      this.total = Math.round(this.total * 100) / 100;
    },
    totalCount() {
      this.total_count = this.selectedDishes.reduce((acc, item) => {
        item.count = !item.count ? 0 : item.count;
        return item.isSelected ? (acc += parseInt(item.count)) : acc;
      }, 0);
    },
    calculateTotals() {
      this.totalCount();
      this.totalPrice();
    },
    getDataFromSessionStorage() {
      if (sessionStorage.getItem("selectedDishes")) {
        let selection = JSON.parse(sessionStorage.getItem("selectedDishes"));
        console.log(selection);
        selection.forEach(selected => {
          this.dishes = this.dishes.filter(dish => dish.id != selected.id);
        });
        this.dishes = [...this.dishes, ...selection];
        this.selectedDishes = selection;
      }
    },
    mapData() {
      this.dishes = this.dishes.map(dish => {
        let {
          id,
          name,
          price,
          description,
          image: {
            formats: {
              thumbnail: { url: url }
            }
          }
        } = { ...dish };
        return {
          id: id,
          name: name,
          price: price,
          description: description,
          url: process.env.VUE_APP_BASE_URL + url.substring(1),
          isSelected: false,
          count: 0
        };
      });
      this.getDataFromSessionStorage();
      this.totalPrice();
      this.totalCount();
    },
    async makeOrder() {
      try {
        if (!this.selectedDishes || this.selectedDishes.length == 0) {
          this.$root.$emit("api-status", {
            status: false,
            message: "Order is empty"
          });
          return;
        }

        let decoratedDishes = this.selectedDishes.map(dish => {
          return {
            full_price: dish.count * dish.price,
            count: dish.count,
            dish
          };
        });
        let data = {
          total_price: this.total,
          status: "Pending",
          users_permissions_user: JSON.parse(sessionStorage.getItem("user"))
            .user,
          dishes: decoratedDishes
        };
        const result = await ApiService.post("orders", data);
        this.deleteSelection();
        sessionStorage.removeItem('selectedDishes');
        console.log(result);
        this.$root.$emit("api-status", {
          status: true,
          message: "Order sucessful"
        });
      } catch (e) {
        console.log(e);
        this.$root.$emit("api-status", {
          status: false,
          message: e.message
        });
      }
    }
  },
  async created() {
    try {
      const results = await ApiService.get(
        "restaurants/" + this.$route.params.id
      );
      const { name, type, dishes } = { ...results };
      this.name = name;
      this.type = type;
      this.dishes = dishes;
      this.mapData();
      console.log(dishes);
    } catch (e) {
      console.log(e);
      this.$root.$emit("api-status", {
        status: false,
        message: e.message
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  @include container;
}
.thumbnail {
  @include thumbnail;
}
.selected {
  background: #1e402c;
  color: whitesmoke;
}

img {
  @include img;
  max-width: 450px;
}
.name {
  @include name;
}
.type {
  @include type;
}
.description {
  @include description;
}
button {
  @include button_default;
}
.order {
  border: 1px solid grey;
  padding: 2rem;
  overflow: auto;
}
.price {
  font-weight: bolder;
  font-size: 1.5rem;
  margin: 15px 0;
}
#selection {
  visibility: hidden;
}
.select-dish {
  cursor: pointer;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border-top: 1px solid rgb(160, 161, 160);
  padding: 15px 0;
}
.count {
  input {
    width: 80px;
    height: 40px;
    text-align: center;
    font-size: 1rem;
  }
  label {
    margin: 0 10px;
  }
}
table {
  margin: 0 auto;
}
table > thead > tr > th,
table > tbody > tr > td {
  text-align: center;
  min-width: 150px;
}
table > tbody > tr:last-child {
  border-top: 1px solid gray;
  text-align: left;
  font-weight: bold;
  & td:first-child {
    text-align: right;
  }
}
</style>
