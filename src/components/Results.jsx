export default function ResultModal({ winner, onClose, onSave }) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded space-y-4 text-center">
        <h2 className="text-xl font-bold">🎉 You got:</h2>
        <p className="text-2xl">{winner}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onSave}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            ❤️ Save Favorite
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
