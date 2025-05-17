import { Link } from 'react-router-dom';

export default function BackTo({ to, children  }) {
  return (
    <div className="back-to">
      <Link to={to} className="back-link">
        ⬅️ {children}
      </Link>
    </div>
  );
}