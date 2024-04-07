<template>
    <div class="container">
        <div class="box">
            <img class="potion-image" v-if="potion.data && potion.data.attributes && potion.data.attributes.image" :src="potion.data.attributes.image" alt="Image de la boisson">
            <div class="content">
                <h1>{{ potion.data && potion.data.attributes ? potion.data.attributes.name : '' }}</h1>
                <p v-if="potion.data && potion.data.attributes && potion.data.attributes.type">Type: {{ potion.data.attributes.type }}</p>
                <p v-if="potion.data && potion.data.attributes && potion.data.attributes.effect">Effet: {{ potion.data.attributes.effect }}</p>
                <p v-if="potion.data && potion.data.attributes && potion.data.attributes.ingredients">Ingrédients: {{ potion.data.attributes.ingredients }}</p>
                <p v-if="potion.data && potion.data.attributes && potion.data.attributes.origin">Origine: {{ potion.data.attributes.origin }}</p>
                <p v-if="potion.data && potion.data.attributes && potion.data.attributes.description">Description: {{ potion.data.attributes.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getSinglePotion } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            potion: {},
            error: null
        }
    },
    async mounted() {
        try {
            const potionId = this.$route.params.id
            this.potion = await getSinglePotion(potionId)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.box {
    width: 600px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
}

.content {
    margin-top: 20px;
}

.potion-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
