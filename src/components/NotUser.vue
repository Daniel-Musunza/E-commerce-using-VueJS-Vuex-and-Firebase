<template>
    <div class="modal">
    <div class="modal-content">
        <button class="signIn">
            <router-link to="/signIn">Sign In</router-link>
        </button>
        <p>{{ this.signInMessage }}</p>
        <button @click="closeModal">Close</button>
    </div>
    </div>
</template>
<script>
    export default {
        props: ["signInMessage"],
        methods: {
            closeModal() {
                this.$emit("close-modal");
            }
        }
    }
</script>
<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 801;
    position: fixed;
    width: 100%;
    height:100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
/* .signIn {
    border-radius: 9px;
    background-color: rgb(85, 85, 223);
    color: inherit;
} */
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
    color: black;
}
</style>