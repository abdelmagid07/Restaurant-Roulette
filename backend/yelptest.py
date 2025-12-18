import os
import requests
from dotenv import load_dotenv

# Load .env
load_dotenv()

# Debug: print env loading
YELP_API_KEY = os.getenv("YELP_API_KEY")
print("Yelp API Key loaded:", YELP_API_KEY[:5] + "...")  # print first 5 chars only

if not YELP_API_KEY:
    raise RuntimeError("Yelp API key not loaded! Check your .env file.")

# Yelp endpoint
YELP_URL = "https://api.yelp.com/v3/businesses/search"

# Map cuisines to Yelp categories
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

# Test parameters
test_cuisine = "sushi"      # You can change to any cuisine
lat, lng = 40.7128, -74.0060  # NYC coordinates

# Get Yelp category
category = CUISINE_TO_YELP.get(test_cuisine.lower())
if not category:
    raise ValueError(f"Unknown cuisine: {test_cuisine}")

# Prepare headers and params
HEADERS = {"Authorization": f"Bearer {YELP_API_KEY}"}
params = {
    "categories": category,
    "latitude": str(lat),     # stringify to avoid issues
    "longitude": str(lng),
    "radius": 10000,
    "limit": 10,
    "sort_by": "rating",
}

print("Making request to Yelp API...")
print("Headers:", HEADERS)
print("Params:", params)

try:
    res = requests.get(YELP_URL, headers=HEADERS, params=params, timeout=10)
    print("Status code:", res.status_code)
    print("Response text (first 500 chars):", res.text[:500])  # limit output
    res.raise_for_status()
    data = res.json()
    businesses = data.get("businesses", [])
    print(f"Found {len(businesses)} businesses:")
    for i, b in enumerate(businesses, start=1):
        print(f"{i}. {b['name']} - Rating: {b['rating']} - Address: {' '.join(b['location']['display_address'])}")
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
