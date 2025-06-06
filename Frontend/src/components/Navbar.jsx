import NavLink from './NavLink';

export default function Navbar() {
   return (
    <nav>
        <div>
            <NavLink to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>
            🎬 MovieApp
            </NavLink>
        </div>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/actors">Actors</NavLink>
      <NavLink to="/directors">Directors</NavLink>
      <NavLink to="/genres">Genres</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cinemas">Cinemas</NavLink>
      <NavLink to="/auditoriums">Auditoriums</NavLink>
      <NavLink to="/showtimes">Showtimes</NavLink>
      <NavLink to="/locations">Locations</NavLink>
    </nav>
  );
}