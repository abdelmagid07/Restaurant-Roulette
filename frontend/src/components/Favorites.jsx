export default function Favorites({ favorites, onClear }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-xs tracking-[0.2em] uppercase text-yellow-500 opacity-90 flex items-center gap-2">
                    My favorites
                </h3>
                {favorites.length > 0 && (
                    <button
                        onClick={onClear}
                        className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 hover:text-yellow-500 transition-colors duration-300"
                    >
                        Clear
                    </button>
                )}
            </div>

            <ul className="grid grid-cols-2 gap-2">
                {favorites.map((f, i) => (
                    <li
                        key={i}
                        className="relative group flex items-center justify-center text-center px-4 py-3 rounded-md bg-zinc-900/60 backdrop-blur-sm border border-yellow-600/20 hover:border-yellow-600/50 hover:bg-zinc-800/80 transition-all duration-300 ease-out"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"></div>

                        <span className="text-sm font-medium text-zinc-300 group-hover:text-yellow-100 tracking-wide z-10">
                            {f}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Empty state handling*/}
            {
                favorites.length === 0 && (
                    <div className="text-center py-4 border border-dashed border-zinc-800 rounded-md">
                        <span className="text-xs text-zinc-600 uppercase tracking-wider">No favorites selected</span>
                    </div>
                )
            }
        </div >
    );
}