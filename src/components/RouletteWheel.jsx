import { useEffect, useRef } from "react";

export default function RouletteWheel({ items, rotation, onSpinEnd }) {
    const canvasRef = useRef(null);
    const wheelRef = useRef(null);

    // Luxury Palette Definition
    const colors = {
        gold: "#d4af37",      // Metallic Gold
        goldHighlight: "#fcd34d", // Lighter Gold for winning
        obsidian: "#09090b",  // Zinc-950 (Almost black)
        charcoal: "#18181b",  // Zinc-900
        text: "#f8fafc",      // White text for contrast
        textWin: "#000000",   // Black text on gold background
    };

    useEffect(() => {
        if (!window.Winwheel) return;

        // Create Winwheel instance with Premium Styling
        wheelRef.current = new window.Winwheel({
            canvasId: "wheelCanvas",
            numSegments: items.length,
            outerRadius: 150,
            centerX: 160,
            centerY: 160,
            textFontSize: 14,
            textMargin: 0,
            textFontFamily: "Inter, sans-serif", // Consider 'Playfair Display' if you have it
            textFillStyle: colors.gold,
            strokeStyle: colors.gold, // Gold lines between segments
            lineWidth: 1,             // Thin, elegant lines
            segments: items.map((item, i) => ({
                // Alternating deep dark shades
                fillStyle: i % 2 === 0 ? colors.obsidian : colors.charcoal,
                text: item,
            })),
            pins: {
                number: items.length,
                fillStyle: colors.gold,
                outerRadius: 4,
                responsive: true, // Scales with wheel
            },
            animation: {
                type: "spinToStop",
                duration: 5, // Slower, heavier spin feels more expensive
                spins: 8,
                callbackFinished: (win) => {
                    // Flash the winner in Gold
                    win.fillStyle = colors.goldHighlight;
                    win.textFillStyle = colors.textWin;
                    wheelRef.current.draw();
                    if (onSpinEnd) onSpinEnd(win.text);
                },
            },
            pointerAngle: 0,
        });

        wheelRef.current.draw();
    }, [items]);

    // Spin logic remains the same, just resetting to luxury colors
    useEffect(() => {
        if (rotation && wheelRef.current) {
            wheelRef.current.segments.forEach((seg, i) => {
                if (seg) {
                    seg.fillStyle = i % 2 === 0 ? colors.obsidian : colors.charcoal;
                    seg.textFillStyle = colors.gold;
                }
            });

            wheelRef.current.stopAnimation(false);
            wheelRef.current.rotationAngle = wheelRef.current.rotationAngle % 360;
            wheelRef.current.startAnimation();
        }
    }, [rotation]);

    return (
        <div className="relative group mt-2">
            {/* The Pointer - Updated to a Gold Sharp Spike */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10 drop-shadow-lg">
                <svg width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Inner Diamond Shape */}
                    <path d="M20 45L30 15H10L20 45Z" fill="#d4af37" stroke="#1c1917" strokeWidth="2" />
                    {/* Top Cap */}
                    <circle cx="20" cy="15" r="6" fill="#fcd34d" stroke="#1c1917" strokeWidth="2" />
                </svg>
            </div>

            {/* Container for the glow effect */}
            <div className="relative rounded-full p-1 bg-gradient-to-b from-yellow-600/30 to-transparent">
                <canvas
                    ref={canvasRef}
                    id="wheelCanvas"
                    width="320"
                    height="320"
                    // Tailwind styles for Glass/Premium look:
                    // 1. Shadow-2xl for depth
                    // 2. A subtle gold glow (shadow-amber-900/20)
                    // 3. Dark border to separate from video
                    className="rounded-full shadow-2xl border-4 border-zinc-800"
                ></canvas>

                {/* Center Hub Cap (The middle of the wheel) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-yellow-600 shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}