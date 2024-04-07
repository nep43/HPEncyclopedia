<template>
    <div class="container">
        <div class="box">
            <img class="book-image" v-if="book.data && book.data.attributes && book.data.attributes.image" :src="book.data.attributes.image" alt="Image du livre">
            <div class="content">
                <h1>{{ book.data && book.data.attributes ? book.data.attributes.title : '' }}</h1>
                <p v-if="book.data && book.data.attributes && book.data.attributes.author">Auteur: {{ book.data.attributes.author }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.published">Publié: {{ book.data.attributes.published }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.pages">Pages: {{ book.data.attributes.pages }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.publisher">Éditeur: {{ book.data.attributes.publisher }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.isbn">ISBN: {{ book.data.attributes.isbn }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.language">Langue: {{ book.data.attributes.language }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {getSingleBook} from '../PotterDbAPI.js'

export default {
    data() {
        return {
            book: {},
            error: null
        }
    },
    async mounted() {
        try {
            const bookId = this.$route.params.id
            this.book = await getSingleBook(bookId)
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

.book-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}
</style>
