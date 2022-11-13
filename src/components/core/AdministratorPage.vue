<template>
  <div class="container">
    <AdministrationNav />
    <div>
            <div>
              <h2>Administration</h2>
              <hr />
            </div>
            <h2>Add Admin</h2>
            <form >
              <div class="form-group">
                <input
                placeholder="Enter user email to make then an Admin"
                type="text"
                id="addAdmins"
                class="form-control"
                v-model="adminEmail"
                />
              </div>
              <span>{{this.functionMsg }}</span>
              <div class="my-3">
                <button @click.prevent="addAdmin" type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>  <!-- <Administration /> -->
    </div>
    </template>
    <script>
  import AdministrationNav from "@/components/core/AdministrationNav.vue";
  import firebase from "firebase/app"
  import "firebase/functions"
        export default {
          name: "AdministratorPage",
          components: { AdministrationNav},
            data() {
                return {
                    adminEmail: '',
                    functionMsg: null,
                };
            },
            methods: {
              async addAdmin() {
                const addAdmin = await firebase.functions().httpsCallable('addAdminRole');
                const result = await addAdmin({email: this.adminEmail})
                this.functionMsg = result.data.message;
              }
            }
        }
    </script>
  <style scoped>
    .container {
      /* margin: 50px 50px; */
      align-items:center;
      background-color: rgb(127, 225, 255);
    }
    h2 {
      font-weight: 500;
      text-align: center;
    }
  </style>