// frontend/src/api/restaurants.js
export const fetchRestaurants = async (cuisine) => {
    try {
        // Replace with deployed backend URL later
        const BACKEND_URL = "http://localhost:5000";
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(
            `${BACKEND_URL}/api/restaurants?cuisine=${cuisine}&lat=${latitude}&lng=${longitude}`
        );

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        return data; // array of restaurants
    } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        // fallback: return a simple array
        return [
            { name: `${cuisine} Place #1`, rating: 4, address: "123 Main St", url: "#" },
            { name: `${cuisine} Place #2`, rating: 4, address: "456 Main St", url: "#" },
        ];
    }
};
