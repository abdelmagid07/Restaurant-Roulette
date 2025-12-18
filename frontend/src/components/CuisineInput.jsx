import { useState } from "react";

const presets = ["Italian", "Mexican", "Sushi", "Burgers", "Indian","Chinese"];

const CuisineInput = ({ items, setItems }) => {
    const [input, setInput] = useState("");

    const addCuisine = () => {
        if (!input.trim()) return;
        setItems([...items, input.trim()]);
        setInput("");
    };

    return (
        <div className="space-y-4 w-full">
            {/* Input Group */}
            <div className="flex gap-0 shadow-lg shadow-black/50">
                <input
                    className="w-full bg-zinc-900 border-y border-l border-zinc-800 text-zinc-200 placeholder:text-zinc-600 px-5 py-3 rounded-l-md focus:outline-none focus:border-yellow-600/50 focus:bg-zinc-900/80 transition-all duration-300 font-light tracking-wide"
                    placeholder="ENTER CUISINE..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCuisine()}
                />

                <button
                    onClick={addCuisine}
                    className="bg-yellow-600 hover:bg-yellow-500 text-zinc-900 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-r-md border-y border-r border-yellow-600 hover:border-yellow-500 transition-colors flex items-center gap-2"
                >
                    Add
                    {/* Small chevron for a premium functional feel */}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33331 8.33333L6.66665 5L3.33331 1.66667" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                    </svg>
                </button>
            </div>

            {/* Presets - Styled as minimalist ghost buttons */}
            <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Quick Select</p>
                <div className="flex flex-wrap gap-2">
                    {presets.map((cuisine) => (
                        <button
                            key={cuisine}
                            onClick={() => setItems([...items, cuisine])}
                            className="px-4 py-1.5 rounded-sm border border-zinc-800 hover:border-yellow-600/40 text-xs uppercase tracking-wider text-zinc-500 hover:text-yellow-500 hover:bg-zinc-900/50 transition-all"
                        >
                            {cuisine}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CuisineInput;