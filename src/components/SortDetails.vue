<template>
    <div class="container">
        <div class="box">
            <img class="spell-image" v-if="spell.attributes && spell.attributes.image" :src="spell.attributes.image" alt="Spell image">
            <div class="content">
                <h1>{{ spell.attributes ? spell.attributes.name : '' }}</h1>
                <p v-if="spell.attributes && spell.attributes.category">Category: {{ spell.attributes.category }}</p>
                <p v-if="spell.attributes && spell.attributes.creator">Creator: {{ spell.attributes.creator }}</p>
                <p v-if="spell.attributes && spell.attributes.effect">Effect: {{ spell.attributes.effect }}</p>
                <p v-if="spell.attributes && spell.attributes.hand">Hand Movement: {{ spell.attributes.hand }}</p>
                <p v-if="spell.attributes && spell.attributes.incantation">Incantation: {{ spell.attributes.incantation }}</p>
                <p v-if="spell.attributes && spell.attributes.duration">Duration: {{ spell.attributes.duration }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getSorts } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            spell: null,
            error: null
        }
    },
    async mounted() {
        try {
            const spellId = this.$route.params.id
            this.spell = await getSorts(spellId)
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
}

.box {
    max-width: 600px;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
}

.content {
    margin-top: 20px;
}

.spell-image {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
}
</style>
