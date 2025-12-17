import { useState } from "react";

const presets = ["Italian", "Mexican", "Sushi", "Burgers", "Indian"];

const CuisineInput = ({items, setItems}) => {
  const [input, setInput] = useState("");

  const addCuisine = () => {
    if (!input.trim()) return;
    setItems([...items, input.trim()]);
    setInput("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Add a cuisine"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addCuisine}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setItems([...items, cuisine])}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CuisineInput
