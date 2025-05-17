import BackTo from '../BackTo';

export default function ActorLayout({ children }) {
  return (
    <div className="actor-layout">
      <div className="actor-content">{children}</div>
      <BackTo to="/actors">Back to Actors List</BackTo>
    </div>
  );
}