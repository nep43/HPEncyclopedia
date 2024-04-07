<template>
    <div>
        <h1>Spells</h1>
        <input type="text" v-model="search" placeholder="Search a spell">
        <ul class="spell-list">
            <li v-for="spell in spells" :key="spell.id">
                <router-link :to="`/spells/${spell.id}`">
                    <div class="spell-item">
                        <img :src="spell.attributes ? spell.attributes.image : ''" alt="Spell image">
                        <div class="spell-name">{{ spell.attributes ? spell.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 1">Previous</button>
        <button @click="nextPage" :disabled="isLastPage">Next</button>
    </div>
</template>

<script>
import { getSorts, searchSorts } from '../PotterDbAPI.js'
import _ from 'lodash'

export default {
    data() {
        return {
            spells: [],
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
                    this.spells = await searchSorts(newSearch)
                } else {
                    this.spells = await getSorts(this.pageNumber)
                }
            }, 300),
            immediate: true
        }
    },
    methods: {
        async nextPage() {
            const nextPageNumber = this.pageNumber + 1
            const nextPageData = await getSorts(nextPageNumber)
            if (nextPageData.length > 0) {
                this.pageNumber = nextPageNumber
                this.spells = nextPageData
                this.isLastPage = false
            } else {
                this.isLastPage = true
            }
        },
        async previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber--
                this.spells = await getSorts(this.pageNumber)
                this.isLastPage = false
            }
        }
    },
    async mounted() {
        try {
            this.spells = await getSorts(1)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.spell-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: space-between;
}

.spell-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.spell-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.spell-name {
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
