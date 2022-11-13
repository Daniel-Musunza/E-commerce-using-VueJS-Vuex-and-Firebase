<template>
    <div style="display: flex; flex-direction: column; height: 100vh" v-if="currentSender">
      <header>
        <div style="height: 85px; background-color: rgb(33, 206, 59);">
          <div class="header-image">
            <h6 class="mt-2" style="font-weight: 600"> {{currentSender[0].username }}'s Message</h6>
            <p>{{this.currentSender[0].email}}</p>
            <p><span>Phone No:</span> {{this.currentSender[0].senderPhoneNo}}</p>
          </div>
        </div>
      </header>
      <div style="padding-top: 10px; background-color: rgb(127, 225, 255); flex: 1; overflow-y: auto">
          <div
            class="text-inner"
          >
          <h2><span>Subject: </span>{{this.currentSender[0].messageSubject}}</h2>
          <p>{{this.currentSender[0].messageContent}}</p>
          <div class="date"><span>{{ new Date(currentSender[0].messageDate).toLocaleString("en-us", {dateStyle: "short"}) }} </span></div>
          </div>
      </div>
    </div>
  </template>

  <script>
    export default {
        name: "SenderMessages",
        data () {
            return {
                currentSender: null,
            }
        },
        async mounted() {
            this.currentSender = await this.$store.state.messages.filter((message) => {
            return message.messageID === this.$route.params.messageid;
        })
        }

    }
  </script>

<style scoped>
.bottom .container-sm form input{
  width: 500px;
  min-height: 50px;
  border-radius: 10px;
  margin-top: 400px;
  margin-left: 50px;
}
.header-image span {
  color:#303030;
}
.bottom {
  /* background-color: #efe9e2; */
  position: fixed;
  z-index: 999;
}
    .br-50 {
      border-radius: 50%;
    }
    .header-image {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
    }
    .text-outer {
      display: flex;
      flex-direction: column;
    }
    .text-inner {
      padding: 10px 10px 2px;
      /* border-radius: 0.5rem; */
      border-radius: 30px;
      background-color: #303030;
    }
    .textFrom {
      background: teal;
      color: white;
      margin: 0% 0% 20px 70%;
    }
    .textTo {
      background: lightcoral;
      color: black;
      margin: 0% 0% 20px 5%;
    }
    .pointer {
      cursor: pointer;
    }
    h2 {
      font-weight: 100px;
      color: #fff;
    }
    p {
      color: #fff;
    }
    span {
      color: rgb(60, 255, 0);
    }
    .date {
      text-align: right;
      color: rgb(60, 255, 0);
    }
    @media (max-width: 499px) {
      .text-outer {
        min-width: 600px;
      }
    }
</style>