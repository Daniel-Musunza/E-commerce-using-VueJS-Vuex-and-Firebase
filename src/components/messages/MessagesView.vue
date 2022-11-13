<template>
<div class="container">
     <AdministrationNav />
    <div>
            <MessageCard
            :message ="message"
            v-for="(message, index) in messages"
            :key="index"
            />
    </div>
</div>
</template>
<script>
import AdministrationNav from "@/components/core/AdministrationNav.vue";
import MessageCard from '@/components/messages/MessageCard.vue';
export default {
    name: "MessageView",
    components: {
        MessageCard,
        AdministrationNav,
    },
    computed: {
    messages() {
       return this.$store.state.messages;
    },
   },
   created() {
    this.$store.dispatch('getMessages');
  }
}
</script>
<style scoped>
    .container {
        margin-top: 30px;
        background-color: rgb(127, 225, 255);
    }
</style>