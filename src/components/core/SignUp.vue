<template>
    <div class="container">
      <img src="@/assets/img/logo.png" style = height:200px class="logo" >
      <div class="row">
        <div class="col-md-6 offset-md-3">
        <div class="col-ls-12">
          <div>
            <div>
              <h3>Sign Up</h3>
              <hr />
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ this.errorMsg }}
            </div>
            <form>
              <TheLoader v-if="loading"/>
              <div class="form-group">
                <label>First Name</label>
                <input
                type="text"
                class="form-control"
                v-model.trim="firstName"
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                type="text"
                class="form-control"
                v-model.trim="lastName"
                />
              </div>
              <div class="form-group">
                <label>Username</label>
                <input
                type="text"
                class="form-control"
                v-model.trim="username"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                type="email"
                class="form-control"
                v-model.trim="email"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                type="password"
                class="form-control"
                v-model.trim="password"
                />
              </div>
              <div class="my-3">
                <button @click.prevent="register" type="submit" class="btn btn-primary">
                  SignUp
                </button>
              </div>
            </form>
            <h2>Have an Account Already <span ><router-link to="/signIn">SignIn</router-link></span></h2>
          </div>
         </div>
        </div>
      </div>
    </div>
  </template>
  <script>
      import firebase from "firebase/app"
      import TheLoader from "@/components/TheLoader"
      import "firebase/auth"
      import db from "@/firebase/firebaseInit"
      export default {
        name: "SignIn",
        components: {
          TheLoader
        },
          data() {
              return {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                errorMsg: "",
                error: null,
                loading: null
              };
          },
          methods: {
            async register() {
              this.loading= true;
              if (
                this.email !== ""&&
                this.password !== ""&&
                this.firstName !== ""&&
                this.lastName !== "" &&
                this.username !== ""
              ) {
                this.error = false;
                this.errorMsg = "";
                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword( this.email, this.password);
                const result = await createUser;
                const dataBase = db.collection("users").doc(result.user.uid);
                await dataBase.set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  username: this.username,
                  email: this.email,
                  // password: this.password
                });
                this.$router.push('/shop');
                this.loading = false;
                return;
              }
              this.error =true;
              this.errorMsg = "Please fill out all the fields!";
              this.loading = false;
              return;
            }
          },
      };
      </script>
      <style scoped>
    @media (min-width:977px){
    .container {
      margin: 100px 100px 100px 450px;
      align-items:center;
    }
  }
     </style>
