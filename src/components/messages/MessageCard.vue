<template>
       <div class="pro">
           <div class="date"><span>{{ new Date(message.messageDate).toLocaleString("en-us", {dateStyle: "medium"}) }} </span></div>
           <div @click="deleteMessage" class="icon">
              <i class="fa-solid fa-trash"></i>
           </div>
            <router-link :to="{ name: 'senderMessages', params: { messageid: this.message.messageID }}">
                <div class="des">
                    <h3>{{message.username }}</h3>
                    <p> <span>Subject:</span> {{message.messageSubject}}</p>
                </div>
            </router-link>
       </div>
</template>
<script>
    export default {
      name: "MessageCard",
      props: ["message"],
      methods: {
        deleteMessage() {
         this.$store.dispatch("deleteMessage", this.message.messageID);
        },
      },
      // computed: {
      //   senderEmail: {
      //    get() {
      //     return this.$store.state.senderEmail;
      //    }
      //   },
      //   senderName: {
      //    get() {
      //     return this.$store.state.senderName;
      //    }
      //   },
      //   messageSubject: {
      //    get() {
      //     return this.$store.state.messageSubject;
      //    }
      //   },
      //   messageContent: {
      //    get() {
      //     return this.$store.state.messageContent;
      //    }
      //   },
      // }
    };
    </script>
    <style scoped>
  .pro {
        border-radius: 10px;
        margin-top: 20px;
        background-color: #303030;
        height: 60px;
      }
  .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;
      /* top: 10px; */
      right: 10px;
      position: absolute;
      z-index: 90;
     }
      .icon:hover{
      color: #fff;
      background-color: #fd0707;
      }
      span {
          color: rgb(60, 255, 0);
          font-size: 10px;
      }
      .date {
      transition: 0.5s ease all;
      right: 50px;
      position: absolute;
      z-index: 90;
      float: bottom;
     }
      .normal {
        background-color: #088178;
        color: #fff;
        margin-bottom: 15px;
        padding-block: 8px;
      }
      .des {
        padding: 10px;
        text-decoration: none;
      }
      p {
        color: #fff;
      }
      </style>
