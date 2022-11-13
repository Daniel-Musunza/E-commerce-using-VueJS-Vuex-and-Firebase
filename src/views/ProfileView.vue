<template>
<div class="container">
  <ModalItem v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
  <ProfilePhotoPreview v-show="this.$store.state.profilePhotoPreview"/>
  <div  class="row">
    <img src="@/assets/img/logo.png" style = "height:200px; " class="logo" >
      <div class="row">
        <div class="col-md-6 offset-md-3">
        <div class="col-md-12">
          <div>
            <div>
              <h2>Account Settings</h2>
              <hr />
            </div>
            <div class="initials">
              <div>
              {{ $store.state.profileInitials }}
              </div>
              <div>
                <img class="br-06" :src="this.profilePhotoURL" width="100%" height="100%" />
             </div>
             <label key="" class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
                 <input type="file" ref="profilePhoto" class="w-0" @change="changeAvatar" accept=".png, .jpg, .jpeg" style="display: none; width: 10px"/>
              </label>
            </div>
            <span @click="openPreview" :class="{ 'button-inactive': !this.$store.state.profilePhotoFileURL}" style>{{ this.$store.state.profilePhotoName}}</span>
            <div v-if="admin" class="admin-badge">
             <span> <i class="fa-solid fa-user"></i> Admin</span>
            </div>
            <form>
              <TheLoader v-if="loading"/>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                type="text"
                class="form-control"
                id="firstName" v-model="firstName"
                />
              </div>
              <div class="form-group">
                <label for="lastName" >Last Name</label>
                <input
                type="text"
                class="form-control"
                id="lastName" v-model="lastName"
                />
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                <input
                type="text"
                class="form-control"
                id="username" v-model="username"
                />
              </div>
              <div class="form-group">
                <label for="email" >Email</label>
                <input
                disabled
                type="email"
                class="form-control"
                id="email" v-model="email"
                />
              </div>
              <div class="my-3">
                <button @click="updateProfile">Save Changes</button>
              </div>
            </form>
          </div>
         </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import ModalItem from "@/components/ModalItem"
import TheLoader from "@/components/TheLoader"
import ProfilePhotoPreview from "@/views/ProfilePhotoPreview.vue";
import firebase from "firebase/app"
import "firebase/storage";
import db from "@/firebase/firebaseInit";
export default {
    name: "ProfileView",
    components :{
        ModalItem,
        TheLoader,
        ProfilePhotoPreview
        
    },
    data() {
        return {
            modalMessage: "Changes were saved!",
            modalActive: false,
            photoAvailable: null,
            loading: null,
            file: null
        }
    },
    async mounted() {
      // this.currentUser.uid = this.$route.params.currentUser.uid;
      // this.currentUser = await this.$store.state.users.filter((currentUser) => {
      //   return currentUser.uid === this.uid;
      // })
      this.currentUser = await db.collection('users').doc(firebase.auth().currentUser.uid);
      this.$store.commit('setProfilePhotoState', this.currentUser.uid);
    },
    methods: {
      closeModal() {
        this.modalActive = !this.modalActive;
      },
    async changeAvatar() {
        const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
        this.file = this.$refs.profilePhoto.files[0];
        const fileName = this.file.name;
        this.$store.commit("photoFileNameChange", fileName);
        this.$store.commit("createPhotoFileURL", URL.createObjectURL(this.file));
        this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(  `documents/profileCoverPhotos/${this.$store.profilePhotoName}`);
          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
            console.log(snapshot);
          }, (err) => {
            console.log(err);
            this.loading = false;
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            await dataBase.update ({
              profileCoverPhoto: downloadURL,
              profileCoverPhotoName: this.profileCoverPhotoName,
            });
            await this.$store.dispatch("updateProfilePhoto", this.users.currentUser.uid);
            this.loading = false;
          }
          );
      },
      updateProfile(){
          this.loading = true;
          // this.updateUserInfo(false, null);
          this.$store.dispatch("updateUserSettings");
          this.modalActive = !this.modalActive;
          return;
      },
      openPreview() {
      this.$store.commit("openProfilePhotoPreview");
      },
    },
    computed: {
      firstName: {
        get() {
          return this.$store.state.profileFirstName;
        },
        set(payload){
          this.$store.commit("changeFirstName", payload);
        }
      },
      lastName: {
        get() {
          return this.$store.state.profileLastName;
        },
        set(payload){
          this.$store.commit("changeLastName", payload);
        }
      },
      username: {
        get() {
          return this.$store.state.profileUsername;
        },
        set(payload){
          this.$store.commit("changeUsername", payload);
        }
      },
      email: {
        get() {
          return this.$store.state.profileEmail;
        }
      },
      admin() {
          return this.$store.state.profileAdmin;
      }

    }

}
</script>

<style scoped>
        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }
        .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 0px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.001);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;
        }
        .col-md-12 {
          align-items: center;
        }
        .initials {
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: #303030;
                color: #fff;
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
        .admin-badge {
                display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #303030;
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;
                width: 30%;
            }
          button {
            display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #7880f1;
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;
                width: 40%;
          }
          .initials label {
           font-size: 18px;
           font-weight: 600;
          }
         .edit {
      display: flex;
      color: #7880f1;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      /* background-color: #fff; */
      transition: 0.5s ease all;
     }
     .edit:hover{
      color: #fff;
      background-color: #1cfd07;
     }
     @media (min-width:977px){
    .container {
      margin: 100px 100px 100px 450px;
    }
    .row {
      align-items:center;
    }
  }

</style>>
