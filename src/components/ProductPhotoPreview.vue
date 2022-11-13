<template>
    <div class="modal" ref="modal">
      <div class="modal-content">
          <div @click="closeProductPreview" class="icon"><i class="fa-solid fa-xmark"></i></div>
          <img :src="this.productCoverPhoto" alt="">
      </div>
    </div>
  </template>

  <script>
  export default {
      name: "ProductPhotoPreview",
      methods: {
          closeProductPreview() {
              this.$store.commit("openProductPhotoPreview");
          },
      },
      computed: {
          productCoverPhoto() {
              return this.$store.state.productPhotoFileURL;
          }
      }

  }
  </script>

  <style scoped>
      .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 101;
          position: absolute;
          width: 100%;
          height:100%;
          top: 0;
          background-color: rgba(0, 0, 0, 0.7);
      }
      .modal-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 8px;
          width: 300px;
          padding: 40px 30px;
          background-color: #fff ;

      }
      p {
          text-align: center;
      }
      button{
          align-self:center;
      }
      .icon {
          right: 15px;
          color: #303030;
          top: 15px;

      }
      img {
          margin-top: 16px;
          display: block;
          width: auto;
          height: 100%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06);
      }
      </style>