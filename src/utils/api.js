/** @format */

// Base URL for our API, using environment variable for deployment flexibility
const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// Check if the response is ok
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// GET items
const getItems = () => {
  return request(`${baseUrl}/items`);
};

// POST items
const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

/* 
  IMPORTANT: For proper card deletion functionality, 
  please follow the deployment instructions in the README file.
*/
// DELETE items
const deleteItem = (_id) => {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getItems, addItem, deleteItem, checkResponse };
