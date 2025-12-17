import { useEffect, useRef } from "react";

export default function RouletteWheel({ items, rotation, onSpinEnd }) {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (!window.Winwheel) return;

    // Create Winwheel instance
    wheelRef.current = new window.Winwheel({
      canvasId: "wheelCanvas",
      numSegments: items.length,
      outerRadius: 150,
      textFontSize: 16,
      segments: items.map((item, i) => ({
        fillStyle: i % 2 === 0 ? "#FFCDD2" : "#F8BBD0",
        text: item,
      })),
      animation: {
        type: "spinToStop",
        duration: 3,
        spins: 5,
        callbackFinished: (win) => {
          if (onSpinEnd) onSpinEnd(win.text);
        },
      },
    });

    // Draw initial wheel
    wheelRef.current.draw();
  }, [items]);

  // Spin wheel externally
  useEffect(() => {
    if (rotation && wheelRef.current) {
      wheelRef.current.stopAnimation(false); // stop any current animation
      wheelRef.current.startAnimation();
    }
  }, [rotation]);

  return (
    <canvas
      ref={canvasRef}
      id="wheelCanvas"
      width="320"
      height="320"
      className="rounded-full shadow-lg"
    ></canvas>
  );
}
