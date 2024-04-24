import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

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
const storage = getStorage(app);
// Get started
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const productCategory = document.getElementById("category");
const imgFileInput = document.getElementById("image-file");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newProduct = {
        Name: nameInput.value,
        Category: productCategory.value,
    };

    try {
        // Upload image to Firebase Storage
        const file = imgFileInput.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        // Get download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        // Add image URL to newProduct object
        newProduct.Image = imageUrl;
        // Add product document to Firestore
        const docRef = await addDoc(collection(db, "Products"), newProduct);
        console.log("Document written with ID: ", docRef.id);
        alert("Product added successfully!");
        form.reset();
    } catch (error) {
        console.error("Error adding product: ", error);
        alert("An error occurred while adding the product.");
    }
});
