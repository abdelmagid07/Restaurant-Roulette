export default function Results({ winner, onClose, onSave }) {
    if (!winner) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">

            {/* Modal Container: Zinc-950 background with a subtle Gold border */}
            <div className="relative w-full max-w-sm mx-4 overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-950 p-10 text-center shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Top Decorative Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

                {/* Header Text */}
                <h2 className="text-amber-500/60 text-xs font-bold uppercase tracking-[0.4em] mb-6">
                    The Selection Is
                </h2>

                {/* Winner Name: Large Serif Font */}
                <div className="mb-10 relative">
                    <span className="absolute -inset-1 blur-xl bg-amber-500/10 rounded-full"></span>
                    <p className="relative text-4xl md:text-5xl font-serif text-white leading-tight drop-shadow-lg">
                        {winner}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 w-full">
                    <button
                        onClick={onSave}
                        className="group relative w-full overflow-hidden bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-black py-4 px-6 rounded-lg font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>Add to Favorites</span>
                        </span>
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                    </button>

                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-300 text-xs uppercase tracking-[0.2em] py-3 transition-colors duration-300"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}