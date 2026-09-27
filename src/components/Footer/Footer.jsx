import { Link } from 'react-router-dom';
import './Footer.css';

// Mismo punto de verdad que el Landing: la ruta del armado.
// Si cambiás la ruta en App.jsx, cambiá acá y en Landing.jsx.
const RUTA_PEDIDO = '/pedido';

// Navegación replicada del header. Si mañana cambia el header,
// cambiala acá también (más adelante podríamos extraerla a un
// archivo compartido para no duplicar).
const NAVEGACION = [
    {
    titulo: 'Eventos',
    items: [
      { to: '/eventos#bodas', label: 'Bodas' },
      { to: '/eventos#corporativos', label: 'Eventos corporativos' },
      { to: '/eventos#sociales', label: 'Eventos sociales' },
    ],
  },
    {
    titulo: 'Servicios',
    items: [
      { to: '/servicios#catering', label: 'Catering' },
      { to: '/servicios#decoracion', label: 'Decoración y ambientación' },
      { to: '/servicios#produccion', label: 'Producción integral' },
    ],
  },
];

// Datos de contacto del negocio — reemplazar por los reales
const CONTACTO = {
  telefono: '+00 000 000 0000',
  telefonoHref: 'tel:+000000000000',
  mail: 'contacto@desidere.com',
  instagram: '@desidere.eventos',
  instagramHref: 'https://instagram.com/desidere.eventos',
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ft-inner">

        {/* Marca + datos de contacto */}
        <div className="ft-col ft-col--marca">
          <Link to="/" className="ft-logo" aria-label="Desidere, ir al inicio">
            <span className="ft-logo__nombre">DESIDERE</span>
            <span className="ft-logo__sub">Eventos <em>&amp;</em> Catering</span>
          </Link>

          <ul className="ft-contacto">
            <li>
              <a href={CONTACTO.telefonoHref} className="ft-contacto__item">
                <span className="ft-contacto__icono" aria-hidden="true">
                  {/* Teléfono */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                {CONTACTO.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACTO.mail}`} className="ft-contacto__item">
                <span className="ft-contacto__icono" aria-hidden="true">
                  {/* Mail */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 6L2 7"/>
                  </svg>
                </span>
                {CONTACTO.mail}
              </a>
            </li>
            <li>
              <a
                href={CONTACTO.instagramHref}
                className="ft-contacto__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ft-contacto__icono" aria-hidden="true">
                  {/* Instagram */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </span>
                {CONTACTO.instagram}
              </a>
            </li>
          </ul>
        </div>

        {/* Navegación: grupos en columnas lado a lado */}
        <nav className="ft-col ft-col--nav" aria-label="Navegación del pie de página">
          {NAVEGACION.map((grupo) => (
            <div key={grupo.titulo} className="ft-nav__grupo">
              <h3 className="ft-nav__titulo">{grupo.titulo}</h3>
              <ul className="ft-nav__lista">
                {grupo.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="ft-nav__link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ft-nav__grupo">
            <h3 className="ft-nav__titulo">Institucional</h3>
            <ul className="ft-nav__lista">
              <li><Link to="/nosotros" className="ft-nav__link">Nosotros</Link></li>
              <li><Link to="/contacto" className="ft-nav__link">Contacto</Link></li>
            </ul>
          </div>
        </nav>

        {/* CTA al armado de pedido */}
        <div className="ft-col ft-col--cta">
          <p className="ft-cta__texto">
            ¿Ya sabés qué querés para tu evento?
          </p>
          <Link to={RUTA_PEDIDO} className="ft-cta__btn">
            Armá tu pedido
            <span className="ft-cta__circulo" aria-hidden="true">
              {/* Flecha */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </Link>
        </div>

      </div>

      <div className="ft-legal">
        <p className="ft-legal__texto">
          © {new Date().getFullYear()} Desidere — Organización de eventos &amp; catering
        </p>
      </div>
    </footer>
  );
}