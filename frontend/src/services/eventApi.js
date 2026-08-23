import axios from "axios";

const API_URL = "http://localhost:8080/api";


export const getMyEvent = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/owner/event`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const getEventMessages = async (slug) => {

    const response = await axios.get(
        `${API_URL}/public/events/${slug}/RetrieveMessages`
    );

    return response.data;
};