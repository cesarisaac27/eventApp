import axios from "axios";

const API_URL = "http://localhost:8080/api/owner";

export const getMyEvent = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/event`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};