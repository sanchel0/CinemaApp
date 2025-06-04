import BackTo from '../BackTo';

export default function ActorLayout({ children }) {
  return (
    <div className="entity-layout">
      <div className="entity-content">{children}</div>
      <BackTo to="/actors">Back to Actors List</BackTo>
    </div>
  );
}