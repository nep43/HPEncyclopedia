<template>
    <div class="container">
        <div class="box">
            <img class="character-image" v-if="character.data && character.data.attributes && character.data.attributes.image" :src="character.data.attributes.image" alt="Image du personnage">
            <div class="content">
                <h1>{{ character.data && character.data.attributes ? character.data.attributes.name : '' }}</h1>
                <p v-if="character.data && character.data.attributes && character.data.attributes.house">Maison: {{ character.data.attributes.house }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.species">Espèce: {{ character.data.attributes.species }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.role">Rôle: {{ character.data.attributes.role }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.school">École: {{ character.data.attributes.school }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.blood_status">Statut du sang: {{ character.data.attributes.blood_status }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.birth">Naissance: {{ character.data.attributes.birth }}</p>
                <p v-if="character.data && character.data.attributes && character.data.attributes.death">Mort: {{ character.data.attributes.death }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getSingleCharacter } from '../PotterDbAPI.js'


export default {
    data() {
        return {
            character: {},
            error: null
        }
    },
    async mounted() {
        try {
            const characterId = this.$route.params.id
            this.character = await getSingleCharacter(characterId)
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

.character-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
