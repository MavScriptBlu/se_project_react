// Base URL for our mock API
const baseUrl = "http://localhost:3001";

// Get all clothing items
export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`).then(processServerResponse); // Added backticks here
};

// Add a new clothing item
export const addClothingItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(processServerResponse);
};

// Helper function to check response
const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`); // Added backticks here
};

// Delete a clothing item endpoint
export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
