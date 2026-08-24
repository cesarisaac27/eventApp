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


export const getEventApprovedMessages = async (slug) => {

    const response = await axios.get(
        `${API_URL}/public/events/${slug}/RetrieveApprovedMessages`
    );

    return response.data;
};


export const toggleMessageApproval = async (slug, messageId) => {

    const token = localStorage.getItem("token");

    const response = await axios.patch(
        `${API_URL}/owner/events/${slug}/messages/${messageId}/approval`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const deleteEventMessage = async (slug, messageId) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/owner/events/${slug}/messages/${messageId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};