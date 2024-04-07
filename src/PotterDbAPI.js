import axios from 'axios'

const API_URL = 'https://api.potterdb.com/v1'

export async function getPotions(pageNumber = 0) {
    const response = await axios.get(`${API_URL}/potions?page[size]=12&page[number]=${pageNumber}`);
    return response.data.data;
}

export async function getSinglePotion(id) {
    const response = await axios.get(`${API_URL}/potions/${id}`)
    return response.data
}

export async function searchPotions(name) {
    const response = await axios.get(`${API_URL}/potions?filter[name_cont]=${name}`);
    return response.data.data;
}

export async function getSorts(pageNumber = 0) {
    const response = await axios.get(`${API_URL}/spells?page[size]=12&page[number]=${pageNumber}`);
    return response.data.data;
}

export async function getSort(id) {
    const response = await axios.get(`${API_URL}/spells/${id}`)
    return response.data
}

export async function searchSorts(name) {
    const response = await axios.get(`${API_URL}/spells?filter[name_cont]=${name}`);
    return response.data.data;
}

export async function getBooks(pageNumber = 0) {
    const response = await axios.get(`${API_URL}/books?page[size]=12&page[number]=${pageNumber}`);
    return response.data.data;
}

export async function getSingleBook(id) {
    const response = await axios.get(`${API_URL}/books/${id}`)
    return response.data
}

export async function searchBooks(name) {
    const response = await axios.get(`${API_URL}/books?filter[title_cont]=${name}`);
    return response.data.data;
}

export async function getCharacters(pageNumber = 0) {
    const response = await axios.get(`${API_URL}/characters?page[size]=12&page[number]=${pageNumber}`);
    return response.data.data;
}

export async function getSingleCharacter(id) {
    const response = await axios.get(`${API_URL}/characters/${id}`)
    return response.data.data;
}

export async function searchCharacters(name) {
    const response = await axios.get(`${API_URL}/characters?filter[name_cont]=${name}`);
    return response.data.data;
}

export async function getChapters(id) {
    const response = await axios.get(`${API_URL}/books/${id}/chapters`)
    return response.data.data
}