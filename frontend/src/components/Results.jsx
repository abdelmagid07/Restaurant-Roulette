export default function Results({ winner, restaurants, isLoading, onClose, onSave }) {
    if (!winner) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">

            {/* Modal Container*/}
            <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-950 p-6 md:p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-300">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

                <h2 className="text-amber-500/60 text-xs font-bold uppercase tracking-[0.4em] mb-4">
                    The Selection Is
                </h2>

                <div className="mb-6 relative">
                    <span className="absolute -inset-1 blur-xl bg-amber-500/10 rounded-full"></span>
                    <p className="relative text-3xl md:text-4xl font-serif text-white leading-tight drop-shadow-lg">
                        {winner}
                    </p>
                </div>

                {/* Restaurants List Section */}
                <div className="mb-8 text-left">
                    <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">
                        Top Recommendations
                    </h3>

                    {isLoading ? (
                        <div className="flex flex-col items-center py-4 space-y-2">
                            <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                            <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Finding the best spots...</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {restaurants.length > 0 ? (
                                restaurants.map((res, i) => (
                                    <a
                                        key={i}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block p-3 rounded-lg bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-white text-sm font-medium group-hover:text-amber-500 transition-colors">
                                                {res.name}
                                            </h4>
                                            <span className="text-amber-500 text-xs font-bold">
                                                ★ {res.rating}
                                            </span>
                                        </div>
                                        <p className="text-zinc-500 text-xs truncate">
                                            {res.address}
                                        </p>
                                    </a>
                                ))
                            ) : (
                                <p className="text-zinc-600 text-xs italic text-center py-4">
                                    No local spots found. Try another cuisine!
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={onSave}
                        className="group relative w-full overflow-hidden bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-black py-4 px-6 rounded-lg font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>Add to Favorites</span>
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                    </button>

                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-[0.2em] py-2 transition-colors duration-300"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}