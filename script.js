import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIXann9tnLSILNwjFs1A2RlleK4G7GVuU",
  authDomain: "dummyapp-28b69.firebaseapp.com",
  projectId: "dummyapp-28b69",
  storageBucket: "dummyapp-28b69.appspot.com",
  messagingSenderId: "57906151598",
  appId: "1:57906151598:web:0cd7976a366e9591b42d3f"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Declaring productList before using it
const productList = document.getElementById("products");

async function displayProducts() {
    productList.innerHTML = "";

    try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        // Check if there are any products
        if (querySnapshot.empty) {
            const noProducts = document.createElement("li");
            noProducts.textContent = "No products found.";
            productList.appendChild(noProducts);
            return;
        }
        // Loop through products and create list items
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            console.log(product);
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${product.Image}" alt="${product.Name}">
                <span>${product.Name}</span>`;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching products: ", error);
        const errorItem = document.createElement("li");
        errorItem.textContent = "Error fetching products.";
        productList.appendChild(errorItem);
    }
};

displayProducts();