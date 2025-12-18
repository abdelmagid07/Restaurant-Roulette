# Restaurant Roulette

## View on Vercel - Works on Startup
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://restaurant-roulette-inky.vercel.app/)

---

## Features

- **Dynamic Roulette Wheel**: GSAP-powered canvas animation that randomly selects a cuisine.
- **Yelp Integration**: Fetches top-rated restaurants based on user current location and the selected cuisine.
- **Customizable Cuisines**: Add personal food categories to the wheel.
- **Favorite Picks**: Save best results to local storage for future reference.

---

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Winwheel.js](http://dougtesting.net/winwheel/docs)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/) (Python)
- **API Integration**: [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3)
- **Deployment**: [Render](https://render.com/)

---

## Project Structure

```text
RestaurantRoulette/
├── backend/
│   ├── app.py              # Flask server & Yelp API logic
│   ├── requirements.txt    # Python dependencies
│   └── Procfile            # Deployment config for Render
└── frontend/
    ├── src/
    │   ├── components/     # Roulette, Input, Results, Favorites
    │   ├── api/            # Backend communication logic
    │   ├── hooks/          # Custom useLocalStorage hook
    │   └── App.jsx         # Main app
    ├── public/
    │   └── libs/           # External libraries - Winwheel.min.js
    └── tailwind.config.js  
```

---
## Workflow and AI tools
AI-assistant tools were used intentionally to accelerate development and maintain full ownership and understanding of the codebase.

- **ChatGPT & Claude**  
  Used for architecture brainstorming, API integration guidance, and debugging support (e.g., Flask and React frontend communication, deployment issues, and error diagnosis).

- **GitHub Copilot**  
  Used for boilerplate generation and inline code suggestions during React and Flask development.

All core logic, architectural decisions, and final implementations were reviewed, modified, and validated manually.  
No no-code, low-code, or automated app-generation tools were used.

---
## License
This project is licensed under the MIT License.