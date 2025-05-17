import { Link } from 'react-router-dom';

const movies = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Avatar" }
];

export default function MoviesList() {
  return (
    <div>
      <h2>Películas</h2>
      <ul>
        {movies.map(m => (
          <li key={m.id}>
            <Link to={`/movies/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
