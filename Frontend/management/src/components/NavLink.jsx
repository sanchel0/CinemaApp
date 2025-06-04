import { NavLink as NavLinkReactRouter } from 'react-router-dom';

export default function NavLink({ to, children, ...props }) {
  return (
    <NavLinkReactRouter 
        {...props}
        to={to} 
        className={({ isActive }) => isActive ? 'active-link' : undefined}
    >{children}
    </NavLinkReactRouter>
  );
}