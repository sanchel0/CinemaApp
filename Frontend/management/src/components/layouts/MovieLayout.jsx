import BackTo from '../BackTo';

export default function MovieLayout({ children }) {
  return (
    <div className="entity-layout">
      <div className="entity-content">{children}</div>
      <BackTo to="/movies">Back to Movies List</BackTo>
    </div>
  );
}