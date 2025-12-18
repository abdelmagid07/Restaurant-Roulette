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
    <div className="h-screen bg-black text-slate-200 font-sans overflow-hidden relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover opacity-60"
      >
        <source src="/videos/pizza.mp4" type="video/mp4" />
      </video>

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 z-10"></div>

      {/* Main Container: Split screen with no gaps */}
      <div className="relative z-20 flex flex-col lg:flex-row h-full">

        {/* LEFT SECTION (40%) - Floating Text area */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-12 md:px-20 space-y-10">
          <div className="space-y-4">
            <p className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold border-l border-amber-500/50 pl-4">
              Private Dining
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] drop-shadow-2xl">
              Let Fate <br />
              <span className="italic text-white/80">Curate Your Palate</span>
            </h1>
          </div>
          <p className="text-lg text-gray-400 font-light max-w-sm leading-relaxed">
            The ultimate arbiter of taste. Surrender your decision to the obsidian wheel.
          </p>
        </div>

        {/* RIGHT PANEL (60%) - Full Height Side Panel */}
        <div className="w-full lg:w-[60%] h-full relative">

          {/* The Panel Border (Goes top to bottom) */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-500/40 to-transparent z-30"></div>

          {/* The Panel Content: Final Fit for Zero-Scroll */}
          <div className="h-full bg-black/20 backdrop-blur-sm flex flex-col items-center justify-start lg:justify-center py-4 px-8 md:px-16 overflow-hidden relative">

            {/* Decorative background glow centered on the wheel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-xl flex flex-col items-center gap-4 relative z-10">

              {/* The Wheel Section */}
              <div className="transform scale-[0.85] md:scale-[0.95] transition-transform duration-700">
                <RouletteWheel
                  items={items}
                  rotation={isSpinning ? 1 : 0}
                  onSpinEnd={handleSpinEnd}
                />
              </div>

              {/* Form Controls */}
              <div className="w-full space-y-4 mt-0">
                <button
                  onClick={spin}
                  disabled={isSpinning}
                  className={`w-full py-4 rounded-none text-xs font-bold tracking-[0.3em] uppercase transition-all duration-700 border border-amber-500/20
                            ${isSpinning
                      ? "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 text-black hover:tracking-[0.4em] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    }`}
                >
                  {isSpinning ? "Selecting Destination..." : "Initiate Selection"}
                </button>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <CuisineInput items={items} setItems={setItems} />
                  <Favorites favorites={favorites} onClear={() => setFavorites([])} />
                </div>
              </div>
            </div>

            <Results
              winner={winner}
              onClose={() => setWinner(null)}
              onSave={saveFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}