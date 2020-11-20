<template>
  <div class="container col-lg-8 col-md-8 col-sm-12 col-xs-12">
    <div class="wrapper">
      <div class="login-form">
        <h3>Login</h3>
        <div class="form-group">
          <label for="email">
            <i class="material-icons prefix">email</i>
            <span>Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            v-model="email"
            v-on:change="validate"
          >
        </div>
        <div class="error-message-block col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <p
            class="error"
            v-if="errors.email.error && errors.email.error.email"
          >{{errors.email.error.message}}</p>
        </div>
        <div class="form-group">
          <label for="password">
            <i class="material-icons prefix">lock</i>
            <span>Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            v-model="password"
            v-on:change="validate"
          >
        </div>
        <div class="error-message-block">
          <p
            class="error"
            v-if="errors.password.error && errors.password.error.minLength"
          >{{errors.password.error.message}}</p>
        </div>
        <div class="error-message-block">
          <p class="error" v-if="errors.credentials">{{errors.credentials.message}}</p>
        </div>

        <div class="form-group">
          <button @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api-service";
import Validators from "../services/validators";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      baseUrl: process.env.VUE_APP_BASE_URL,
      errors: { email: "", password: "", credentials: "" }
    };
  },
  methods: {
    validate: function(e) {
      let name = e.target.name;
      let value = e.target.value.trim();
      let error = "";

      switch (name) {
        case "email": {
          error = Validators.email(name, value);
          this.errors.email = { ...this.errors.email, error };
          break;
        }
        case "password": {
          error = Validators.minLength(name, value, 4);
          this.errors.password = { ...this.errors.password, error };
        }
      }
    },
    login: async function(e) {
      e.preventDefault();
      if (
        (this.errors.email && this.errors.email.error) ||
        (this.errors.password && this.errors.password.error)
      )
        return;
      try {
        const data = await ApiService.post("auth/local/", {
          identifier: this.email,
          password: this.password
        });
        if (data) {
          this.$root.$emit("shownavlinks", true);
          this.$router.replace("/restaurants");
          this.$root.$emit("api-status", { status: true, message: 'Login sucessful' });
        }
      } catch (e) {
        console.log("API Err", e);
        this.$root.$emit("api-status", { stauts: false, message: 'Invalid credentials' });
        this.errors.credentials = {
          message: "Please, provide valid credentials"
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 50%;
  margin: 0 auto;
}
h3 {
  align-self: flex-start;
}
.login-form {
  margin-top: 1rem;
  padding: 30px;
  color: rgb(246, 244, 244);
  background: rgba(33, 73, 33, 0.884);
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  justify-content: center;
}
.form-group {
  width: 80%;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  position: relative;
}
label {
  margin-right: 1rem;
  align-self: flex-start;
  width: 180px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  position: relative;
  i.material-icons {
    position: absolute;
    top: 0;
    font-size: 2rem;
  }
  span {
    position: absolute;
    left: 30px;
    top: 0;
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
}
input {
  height: 45px;
  padding: 0.5rem;
  max-width: 300px;
  position: relative;
  left: 30px;
  width: 100%;
}
.error {
  color: $error_background_color;
  margin: 0;
}
.error-message-block {
  width: 300px;
  align-self: start;
}
button {
  width: 180px;
  height: 55px;
  padding: 0.5rem;
  text-align: center;
  margin: 0.5rem 0;
}
@media all and (max-width: 780px) {
  .container {
    width: 100%;
  }
  .login-form {
    padding: 0;
  }
  .form-group {
    width: auto;
    flex-direction: column;
    align-content: center;
    span {
      display: none;
    }
    label {
      i.material-icons {
        top: 10px;
        left: -10px;
      }
    }
  }
}
</style>
