import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

// Definimos la navegación como datos: agregar un item aquí
// lo refleja en escritorio y en móvil sin tocar el JSX.
const SECCIONES = [
  {
    id: 'eventos',
    label: 'Eventos',
    basePath: '/eventos',
    items: [
      { slug: 'bodas', label: 'Bodas' },
      { slug: 'corporativos', label: 'Eventos corporativos' },
      { slug: 'sociales', label: 'Eventos sociales' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios',
    basePath: '/servicios',
    items: [
      { slug: 'catering', label: 'Catering' },
      { slug: 'decoracion', label: 'Decoración y ambientación' },
      { slug: 'produccion', label: 'Producción integral' },
    ],
  },
];

const LINKS_DIRECTOS = [
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

// ¿Estamos en escritorio? Mismas condiciones que el CSS:
// ancho mayor a 960px Y dispositivo con hover real (mouse).
// En tablets táctiles anchas el click sigue funcionando.
const esEscritorio = () =>
  window.matchMedia('(min-width: 961px) and (hover: hover)').matches;

// Dropdown reutilizable (escritorio abre por hover vía CSS,
// móvil abre por click vía estado)
function NavDropdown({ seccion, abierto, onToggle, onNavigate }) {
  return (
    <div className={`sh-dd${abierto ? ' is-open' : ''}`}>
      <button
        type="button"
        className="sh-link sh-dd__btn"
        aria-expanded={abierto}
        aria-haspopup="true"
        onClick={onToggle}
      >
        {seccion.label}
        <svg className="sh-dd__chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1.5 3.5 L5 7 L8.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="sh-dd__menu">
        {seccion.items.map((item, i) => (
          <NavLink
            key={item.slug}
            to={`${seccion.basePath}/${item.slug}`}
            onClick={onNavigate}
            className={({ isActive }) => `sh-dd__item${isActive ? ' is-active' : ''}`}
          >
            <span className="sh-dd__num">{String(i + 1).padStart(2, '0')}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [dropdownAbierto, setDropdownAbierto] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Al cambiar de ruta, cerramos todo
  useEffect(() => {
    setDropdownAbierto(null);
    setMenuAbierto(false);
  }, [location.pathname]);

  // Click por fuera del header cierra dropdowns y menú móvil
  useEffect(() => {
    const alClicFuera = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setDropdownAbierto(null);
        setMenuAbierto(false);
      }
    };
    document.addEventListener('pointerdown', alClicFuera);
    return () => document.removeEventListener('pointerdown', alClicFuera);
  }, []);

  const toggleDropdown = (id) => {
    // En escritorio el dropdown abre únicamente por hover (CSS).
    // El click no hace nada: así nunca queda "pegado" ni
    // interfiere entre dropdowns.
    if (esEscritorio()) return;
    setDropdownAbierto((prev) => (prev === id ? null : id));
  };

  const cerrarTodo = () => {
    setDropdownAbierto(null);
    setMenuAbierto(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="sh-inner">
        {/* Izquierda: dropdowns */}
        <nav className="sh-nav sh-nav--left" aria-label="Eventos y servicios">
          {SECCIONES.map((s) => (
            <NavDropdown
              key={s.id}
              seccion={s}
              abierto={dropdownAbierto === s.id}
              onToggle={() => toggleDropdown(s.id)}
              onNavigate={cerrarTodo}
            />
          ))}
        </nav>

        {/* Centro: wordmark tipográfico */}
        <NavLink to="/" className="sh-logo" onClick={cerrarTodo} aria-label="Desidere, ir al inicio">
          <span className="sh-logo__nombre">DESIDERE</span>
          <span className="sh-logo__sub">Eventos <em>&amp;</em> Catering</span>
        </NavLink>

        {/* Derecha: Nosotros / Contacto + hamburguesa en móvil */}
        <nav className="sh-nav sh-nav--right" aria-label="Nosotros y contacto">
          {LINKS_DIRECTOS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `sh-link${isActive ? ' is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}

          <button
            type="button"
            className={`sh-burger${menuAbierto ? ' is-open' : ''}`}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      {/* Panel móvil: los dropdowns se comportan como acordeones */}
      <div className={`sh-mobile${menuAbierto ? ' is-open' : ''}`}>
        {SECCIONES.map((s) => (
          <NavDropdown
            key={s.id}
            seccion={s}
            abierto={dropdownAbierto === s.id}
            onToggle={() => toggleDropdown(s.id)}
            onNavigate={cerrarTodo}
          />
        ))}
        {LINKS_DIRECTOS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={cerrarTodo}
            className={({ isActive }) => `sh-mobile__link${isActive ? ' is-active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}