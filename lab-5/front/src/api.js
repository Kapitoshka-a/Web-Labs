// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/'; // Adjust if needed

// Get all establishments
export const fetchEstablishments = async (type="Святкові заходи") => {
    const response = await axios.get(`${API_URL}establishments/?type=${type}`);
    return response.data;
};

// Get establishment details
export const fetchEstablishmentDetails = async (slug) => {
    const response = await axios.get(`${API_URL}establishments/${slug}/`);
    return response.data;
};

// Fetch comments for a specific establishment
export const fetchComments = async (slug) => {
    const response = await axios.get(`${API_URL}establishments/${slug}/comments/`);
    return response.data;
};

// Create a new comment
export const createComment = async (slug, commentData) => {
    const commentWithAuthor = { ...commentData}; // Add the author field
    const response = await axios.post(`${API_URL}establishments/${slug}/comments/`, commentWithAuthor);
    return response.data;
};

// Update an existing comment
const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const config = {
            method,
            url: `${API_URL}${urlPath}`,
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error in API request:", error);
        throw error; // Rethrow the error for handling in calling code
    }
};

// Update an existing comment
export const updateComment = async (slug, commentId, commentData) => {
    const commentWithAuthor = { ...commentData }; // Ensure author is present
    return await baseRequest({
        urlPath: `establishments/${slug}/comments/${commentId}`,
        method: "PUT",
        body: commentWithAuthor,
    });
};

// Delete a comment
export const deleteComment = async (slug, commentId) => {
    await axios.delete(`${API_URL}establishments/${slug}/comments/${commentId}`);
};