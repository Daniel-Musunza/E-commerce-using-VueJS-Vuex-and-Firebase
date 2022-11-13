<template>
  <div class="pro-container">
    <AdministrationNav />
    <div class="create-post">
      <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" style="margin-top:200px;" />
      <TheLoader v-show="loading" />
      <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
          <p><span>Error:</span>{{ this.errorMsg }}</p>
        </div>
        <div class="blog-info">
          <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
          <br>
          <div class="upload-file">
            <label for="blog-photo">Upload Cover Photo</label>
            <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" style = "display: none;"/>
            <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
              Preview Photo
            </button>
            <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
          </div>
        </div>
        <textarea name="" id="" cols="30" rows="2" plaaceholder="Enter Blog Introduction"  v-model="blogIntro"></textarea>
        <br>
        <div class="editor">
          <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
        </div>
        <br>
        <div class="blog-actions">
          <button @click="uploadBlog">Publish Blog</button>
          <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
        </div>
      </div>
    </div>
    </div>
  </template>
  <script>
    import AdministrationNav from "@/components/core/AdministrationNav.vue";
    import BlogCoverPreview from "@/components/BlogCoverPreview";
    import TheLoader from "@/components/TheLoader";
    import firebase from "firebase/app";
    import "firebase/storage";
    import db from "@/firebase/firebaseInit";
    import Quill from "quill";
    window.Quill = Quill;
    const ImageResize = require("quill-image-resize-module").default;
    Quill.register("modules/imageResize", ImageResize);
    export default {
      name: "CreateBlog",
      data() {
        return {
          file: null,
          error: null,
          errorMsg: null,
          loading: null,
          editorSettings: {
            modules: {
              imageResize: {},
            },
          },
        };
      },
      components: {
        AdministrationNav,
        BlogCoverPreview,
        TheLoader,
      },
      methods: {
        fileChange() {
          this.file = this.$refs.blogPhoto.files[0];
          const fileName = this.file.name;
          this.$store.commit("fileNameChange", fileName);
          this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },
        openPreview() {
          this.$store.commit("openPhotoPreview");
        },
        imageHandler(file, Editor, cursorLocation, resetUploader) {
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}` );
          docRef.put(file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              Editor.insertEmbed(cursorLocation, "image", downloadURL);
              resetUploader();
            }
          );
        },
        uploadBlog() {
          if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
            if (this.file) {
              this.loading = true;
              const storageRef = firebase.storage().ref();
              const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
              docRef.put(this.file).on(
                "state_changed",
                (snapshot) => {
                  console.log(snapshot);
                },
                (err) => {
                  console.log(err);
                  this.loading = false;
                },
                async () => {
                  const downloadURL = await docRef.getDownloadURL();
                  const timestamp = await Date.now();
                  const dataBase = await db.collection("blogPosts").doc();
                  await dataBase.set({
                    blogID: dataBase.id,
                    blogHTML: this.blogHTML,
                    blogCoverPhoto: downloadURL,
                    blogCoverPhotoName: this.blogCoverPhotoName,
                    blogTitle: this.blogTitle,
                    blogIntro: this.blogIntro,
                    profileId: this.profileId,
                    date: timestamp,
                  });
                  await this.$store.dispatch("getPost");
                  this.loading = false;
                  this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
                }
              );
              return;
            }
            this.error = true;
            this.errorMsg = "Please ensure you uploaded a cover photo!";
            setTimeout(() => {
              this.error = false;
            }, 5000);
            return;
          }
          this.error = true;
          this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
          return;
        },
      },
      computed: {
        profileId() {
          return this.$store.state.profileId;
        },
        blogCoverPhotoName() {
          return this.$store.state.blogPhotoName;
        },
        blogTitle: {
          get() {
            return this.$store.state.blogTitle;
          },
          set(payload) {
            this.$store.commit("updateBlogTitle", payload);
          },
        },
        blogIntro: {
          get() {
            return this.$store.state.blogIntro;
          },
          set(payload) {
            this.$store.commit("updateBlogIntro", payload);
          },
        },
        blogHTML: {
          get() {
            return this.$store.state.blogHTML;
          },
          set(payload) {
            this.$store.commit("newBlogPost", payload);
          },
        },
      },
    };
    </script>

  <style scoped>
    form {
      display: block;
      width:100%;
      align-items: center;
      padding-bottom: 40 px;
    }
    h2 {
      text-align: center;
      color: #41b883;
      padding: 30px;
      padding-bottom: 0px;
      font-weight: bold;
    }
    input [type="text"] {
      flex: 10;
      padding: 10px;
      border:1px solid #41b884;
      outline:0;
    }
    input[type="text"] {
      margin-left: 10px;
      margin-right: 50px;
      margin-top: 30px;
    }
    input[type="submit"],button {
      flex: 2;
      background: #41b883;
      color: #fff;
      border: 1px #41b883 solid;
      cursor: pointer;
      margin-left: 10px;
      margin-top: 30px;
    }
    button {
      margin-top: 0;

    }
    .router-button {
      text-decoration: none;
      color: azure;
    }
    label,
    button,
    .router-button {
      transition: 0.5s ease-in-out all;
      align-self: center;
      font-size: 14px;
      cursor: pointer;
      border-radius: 20px;
      padding: 12px 24px;
      color: #fff;
      background-color: #303030;
      text-decoration: none;
    }
    label,
    button,
    .router-button :hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
    .container {
        display:flex;
        justify-content: space-between;
        padding-top: 20px;
        flex-wrap: wrap;
        position: relative;
        height: 100%;
        background-color: rgb(127, 225, 255);
        /* padding: 10px 25px 60px; */
    }
    .container .create-post{

        width:100%;
        min-width:250px;
        padding: 10px 12px;
        border: 1px solid #cce7d0;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.02);
        margin: 10px 0;
        transition: 0.2s ease;
        position: relative;
        height: 100%;
    }
    /* error styling */
    .invisible {
      opacity: 0 !important;
    }

    .err-message {
      width: 100%;
      padding: 12px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;

    }
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
    .blog-info {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }
    input:nth-child(1) {
      min-width: 200px;

    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
    }
    input:focus {
      outline: none;
      box-shadow: 0 1px 0 0 #303030;
    }
    .upload-file {
      flex:1;
      margin-left: 16px;
      position: relative;
      display: flex;
      flex-direction: row;
    }
    .preview {
      margin-left: 16px;
      text-transform: initial;
    }
    span {
      font-size: 12px;
      margin-left: 16px;
      align-self: center;
    }
    .editor {
      height:60vh;
      display: flex;
      flex-direction: column;
      background-color: #fff;
    }
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .blog-actions {
      margin-top: 32px;
    }
    button {
      margin-right: 16px;
    }
    textarea{
    width: 75%;
    padding: 12px 15 px;
    outline: none;
    margin-bottom: 28px;
    border:1px solid #e1e1e1;
    }
    /* button{
     background-color: #41b883;
     height: 20px;
     } */
    </style>
