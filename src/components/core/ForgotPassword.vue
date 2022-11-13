<template>
    <div class="container">
      <img src="@/assets/img/logo.png" style = height:200px class="logo" >
        <ModalItem v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <TheLoader v-if="loading"/>
      <div class="row">
        <div class="col-md-6 offset-md-3">
        <div class="col-md-12">
          <div>
            <h2>Back to <span ><router-link to="/signIn">SignIn</router-link></span></h2>
            <div>
              <label>Reset Password</label>
              <h5>Forgot your password? Enter your email to reset it!</h5>
              <hr />
            </div>
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <label>Email</label>
                <input
                type="email"
                class="form-control"
                v-model="email"
                />
              </div>
              <div class="my-3">
                <button type="submit" class="btn btn-primary">
                  Reset
                </button>
              </div>
            </form>
          </div>
         </div>
        </div>
      </div>
    </div>
    </template>

    <script>
        import ModalItem from "@/components/ModalItem"
        import TheLoader from "@/components/TheLoader"
        import firebase from "firebase/app"
        import "firebase/auth"
        export default {
            name: "ForgotPassword",
            data() {
                return {
                email: "",
                modalActive: false,
                modalMessage: "",
                loading: null
                }
            },
            components: {
                ModalItem,
                TheLoader
            },
            methods: {
              resetPassword() {
                this.loading= true;
                firebase.auth().sendPasswordResetEmail(this.email).then(() => {
                  this.modalMessage = "If your account exists, you'll receave a email";
                  this.loading = false;
                  this.modalActive = true;
                }).catch(err => {
                  this.modalMessage = err.message;
                  this.loading = false;
                  this.modalActive = true;
                })
              },
                closeModal() {
                    this.modalActive = !this.modalActive;
                    this.email = "";
                }
            }
        }
    </script>
      <style scoped>
 @media (min-width:977px){
    .container {
      margin: 100px 100px 100px 450px;
      align-items:center;
    }
  }
      </style>
