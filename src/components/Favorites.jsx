export default function Favorites({ favorites }) {
  return (
    <div>
      <h3 className="font-bold mb-2">❤️ Favorites</h3>
      <ul className="list-disc pl-5">
        {favorites.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
