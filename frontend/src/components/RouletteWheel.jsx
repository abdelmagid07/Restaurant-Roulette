import { useEffect, useRef } from "react";

export default function RouletteWheel({ items, rotation, onSpinEnd }) {
    const canvasRef = useRef(null);
    const wheelRef = useRef(null);

    // Custom Palette 
    const colors = {
        gold: "#d4af37",      
        goldHighlight: "#fcd34d", 
        obsidian: "#09090b",  
        charcoal: "#18181b",  
        text: "#f8fafc",      
        textWin: "#000000",   
    };

    useEffect(() => {
        if (!window.Winwheel) return;

        // Create Winwheel instance 
        wheelRef.current = new window.Winwheel({
            canvasId: "wheelCanvas",
            numSegments: items.length,
            outerRadius: 150,
            centerX: 160,
            centerY: 160,
            textFontSize: 14,
            textMargin: 0,
            textFontFamily: "Inter, sans-serif",
            textFillStyle: colors.gold,
            strokeStyle: colors.gold, 
            lineWidth: 1,             
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
                duration: 5, 
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10 drop-shadow-lg">
                <svg width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 45L30 15H10L20 45Z" fill="#d4af37" stroke="#1c1917" strokeWidth="2" />
                    <circle cx="20" cy="15" r="6" fill="#fcd34d" stroke="#1c1917" strokeWidth="2" />
                </svg>
            </div>

            <div className="relative rounded-full p-1 bg-gradient-to-b from-yellow-600/30 to-transparent">
                <canvas
                    ref={canvasRef}
                    id="wheelCanvas"
                    width="320"
                    height="320"

                    className="rounded-full shadow-2xl border-4 border-zinc-800"
                ></canvas>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-yellow-600 shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}