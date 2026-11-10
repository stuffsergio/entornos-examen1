import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import BasilIcon from "./BasilIcon";

const links = [
  { to: "/", label: "Inicio", current: (path) => path === "/" },
  { to: "/#temario", label: "Temario", current: (path) => path.startsWith("/tema") },
  {
    to: "/cuestionarios",
    label: "Cuestionarios",
    current: (path) => path.startsWith("/cuestionarios"),
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header className="nav">
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="Entornos, inicio" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <BasilIcon name="book-open-outline" size={18} />
          </span>
          <span className="brand-name">Entornos</span>
        </Link>

        <nav className="nav-desktop" aria-label="Principal">
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} aria-current={link.current(pathname) ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/tema/1" className="nav-cta">
          <BasilIcon name="play-outline" size={14} />
          Estudiar
        </Link>

        <details className="nav-mobile" ref={menuRef}>
          <summary aria-label="Abrir el menú">
            <BasilIcon className="nav-ico-open" name="menu-outline" size={22} />
            <BasilIcon className="nav-ico-close" name="cross-outline" size={22} />
          </summary>
          <div className="nav-panel">
            <div className="nav-panel-brand" aria-hidden="true">
              <span className="brand-mark">
                <BasilIcon name="book-open-outline" size={18} />
              </span>
              <span>Entornos</span>
            </div>
            <nav aria-label="Móvil">
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      aria-current={link.current(pathname) ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link to="/tema/1" className="nav-cta" onClick={closeMenu}>
              <BasilIcon name="play-outline" size={14} />
              Estudiar
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
