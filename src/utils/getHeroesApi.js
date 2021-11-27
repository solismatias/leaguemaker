import axios from 'axios'

const getHeroesApi = async (value) => {
    // const URL = "https://superheroapi.com/api/4535411936538144/search/"
    const URL = "https://cors-everywhere.herokuapp.com/https://superheroapi.com/api/4535411936538144/search/"
    const response = await axios.get(URL + value);
    if (response.data.response === "error") {
        return false
    } else {
        return response
    }
}

export { getHeroesApi }