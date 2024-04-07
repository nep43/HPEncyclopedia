<template>
    <div>
        <h1>Livres</h1>
        <input type="text" v-model="search" placeholder="Rechercher un livre">
        <ul class="book-list">
            <li v-for="book in books" :key="book.id">
                <router-link :to="`/livres/${book.id}`">
                    <div class="book-item">
                        <img :src="book.attributes ? book.attributes.cover : ''" alt="book image">
                        <div class="book-name">{{ book.attributes ? book.attributes.title : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 1">Précédent</button>
        <button @click="nextPage" :disabled="isLastPage">Suivant</button>
    </div>
</template>

<script>
import { getBooks, searchBooks } from '../PotterDbAPI.js'
import _ from 'lodash'

export default {
    data() {
        return {
            books: [],
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
                    this.books = await searchBooks(newSearch)
                } else {
                    this.books = await getBooks(this.pageNumber)
                }
            }, 300),
            immediate: true
        }
    },
    methods: {
        async nextPage() {
            const nextPageNumber = this.pageNumber + 1
            const nextPageData = await getBooks(nextPageNumber)
            if (nextPageData.length > 0) {
                this.pageNumber = nextPageNumber
                this.books = nextPageData
                this.isLastPage = false
            } else {
                this.isLastPage = true
            }
        },
        async previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber--
                this.books = await getBooks(this.pageNumber)
                this.isLastPage = false
            }
        }
    },
    async mounted() {
        try {
            this.books = await getBooks(1)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: flex-start;
    align-content: space-between;
}

.book-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.book-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;
}

.book-item img{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;
}

.book-name {
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