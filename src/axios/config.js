import axios from "axios"

const infatecFetch = axios.create({
    baseURL: "https://localhost:7245",
})

export default infatecFetch