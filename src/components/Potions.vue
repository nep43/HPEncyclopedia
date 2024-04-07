<template>
    <div>
        <h1>Alcools</h1>
        <input type="text" v-model="search" placeholder="Rechercher une boisson">
        <ul class="potion-list">
            <li v-for="potion in potions" :key="potion.id">
                <router-link :to="`/potions/${potion.id}`">
                    <div class="potion-item">
                        <img :src="potion.attributes ? potion.attributes.image : ''" alt="Image de la boisson">
                        <div class="potion-name">{{ potion.attributes ? potion.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 1">Précédent</button>
        <button @click="nextPage" :disabled="isLastPage">Suivant</button>
    </div>
</template>

<script>
import { getPotions, searchPotions } from '../PotterDbAPI.js'
import _ from 'lodash'

export default {
    data() {
        return {
            potions: [],
            search: '',
            error: null,
            pageNumber: 1,
            pageSize: 12,
            isLastPage: false
        }
    },
    watch: {
        search: {
            handler: _.debounce(async function (newSearch) {
                if (newSearch) {
                    this.potions = await searchPotions(newSearch)
                } else {
                    this.potions = await getPotions(this.pageNumber)
                }
            }, 300),
            immediate: true
        }
    },
    methods: {
        async nextPage() {
            const nextPageNumber = this.pageNumber + 1
            const nextPageData = await getPotions(nextPageNumber)
            if (nextPageData.length > 0) {
                this.pageNumber = nextPageNumber
                this.potions = nextPageData
                this.isLastPage = false
            } else {
                this.isLastPage = true
            }
        },
        async previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber--
                this.potions = await getPotions(this.pageNumber)
                this.isLastPage = false
            }
        }
    },
    async mounted() {
        try {
            this.potions = await getPotions(1)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.potion-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: space-between;
}

.potion-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.potion-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.potion-name {
    margin-top: 10px;
}

input[type="text"] {
    width: calc(100% - 40px);
    padding: 10px 20px;
    margin: 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}
</style>
