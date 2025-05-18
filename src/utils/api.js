// Base URL for our mock API
const baseUrl = "http://localhost:3001";

// Check if the response is ok
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// GET items
const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

// POST items
const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

// DELETE items
const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export { getItems, addItem, deleteItem, checkResponse };
