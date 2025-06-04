import BackTo from '../BackTo';

export default function EntityLayout({ children, entityName = 'entities', backTo = `/${entityName}` }) {
  return (
    <div className="entity-layout">
      <div className="entity-content">{children}</div>
      <BackTo to={backTo}>Back to {entityName[0].toUpperCase() + entityName.slice(1)} List</BackTo>
    </div>
  );
}