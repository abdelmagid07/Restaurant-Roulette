import { useState } from "react";
import CuisineInput from "./components/CuisineInput";
import RouletteWheel from "./components/RouletteWheel";
import Results from "./components/Results";
import Favorites from "./components/Favorites";
import useLocalStorage from "./hooks/useLocalStorage";
import { defaultRestaurants } from "./data/defaultRestaurants";

export default function App() {
  const [items, setItems] = useState(defaultRestaurants);
  const [winner, setWinner] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning || items.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
  };

  const handleSpinEnd = (text) => {
    setWinner(text);
    setIsSpinning(false);
  };

  const saveFavorite = () => {
    if (!winner) return;
    setFavorites([...favorites, winner]);
    setWinner(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/videos/pizza.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/50 z-10"></div>

      {/* Split Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 py-12 gap-10">
        
        {/* Left Text */}
        <div className="text-white max-w-lg space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
            🍽️ Let fate decide your eats
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
            Spin the wheel and discover your next meal!
          </p>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center gap-6 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl animate-bounce">🔻</div>

          <RouletteWheel
            items={items}
            rotation={isSpinning ? 1 : 0} // trigger spin
            onSpinEnd={handleSpinEnd}
          />

          <button
            onClick={spin}
            disabled={isSpinning}
            className={`w-full py-3 rounded-xl text-lg font-semibold text-white transition-all ${
              isSpinning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 hover:scale-105 active:scale-95"
            }`}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>

          <CuisineInput items={items} setItems={setItems} />
          <Favorites favorites={favorites} />

          <Results winner={winner} onClose={() => setWinner(null)} onSave={saveFavorite} />
        </div>
      </div>
    </div>
  );
}
