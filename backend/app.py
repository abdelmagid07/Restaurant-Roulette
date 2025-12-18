from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from functools import lru_cache

load_dotenv()

app = Flask(__name__)
CORS(app)  # allow frontend to call this API

YELP_API_KEY = os.getenv("YELP_API_KEY")
YELP_URL = "https://api.yelp.com/v3/businesses/search"

# Map wheel results to Yelp categories
CUISINE_TO_YELP = {
    "indian": "indpak",
    "chinese": "chinese",
    "italian": "italian",
    "arab": "arab",
    "greek": "greek",
    "mexican": "mexican",
    "sushi": "sushi",
    "burgers": "burgers",
}

HEADERS = {"Authorization": f"Bearer {YELP_API_KEY}"}

# Simple in-memory cache for API responses
@lru_cache(maxsize=100)
def fetch_yelp(cuisine, lat, lng):
    category = CUISINE_TO_YELP.get(cuisine.lower())
    if not category:
        return []

    params = {
        "categories": category,
        "latitude": lat,
        "longitude": lng,
        "radius": 10000,  # 10km
        "limit": 10,
        "sort_by": "rating",
    }

    print(f"DEBUG: Fetching for {cuisine} at {lat}, {lng}")
    print(f"DEBUG: API Key loaded: {'Yes' if YELP_API_KEY else 'No'}")
    if YELP_API_KEY:
        print(f"DEBUG: API Key starts with: {YELP_API_KEY[:5]}...")

    try:
        res = requests.get(YELP_URL, headers=HEADERS, params=params, timeout=5)
        print(f"DEBUG: Yelp Status Code: {res.status_code}")
        if res.status_code != 200:
            print(f"DEBUG: Yelp Error Response: {res.text}")
            
        res.raise_for_status()
        data = res.json().get("businesses", [])
        print(f"DEBUG: Found {len(data)} businesses")
        # Filter/format data for frontend
        businesses = [
            {
                "name": b["name"],
                "rating": b["rating"],
                "image": b.get("image_url", ""),
                "address": " ".join(b["location"]["display_address"]),
                "url": b["url"]
            }
            for b in data
        ]
        return businesses
    except Exception as e:
        print("Yelp API error:", e)
        return []

@app.route("/api/restaurants")
def get_restaurants():
    cuisine = request.args.get("cuisine")
    lat = request.args.get("lat")
    lng = request.args.get("lng")

    if not cuisine or not lat or not lng:
        return jsonify({"error": "Missing parameters"}), 400

    try:
        lat, lng = float(lat), float(lng)
    except ValueError:
        return jsonify({"error": "Invalid coordinates"}), 400

    businesses = fetch_yelp(cuisine, lat, lng)

    # Fallback hardcoded restaurants if Yelp fails or empty
    if not businesses:
        businesses = [{"name": f"{cuisine.title()} Place #{i+1}", "rating": 4, "address": "123 Main St", "image": "", "url": "#"} for i in range(5)]

    return jsonify(businesses)

if __name__ == "__main__":
    app.run(debug=True)
