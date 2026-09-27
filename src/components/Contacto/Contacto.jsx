import { Link } from 'react-router-dom';
import './Contacto.css';
import { NUMERO_WHATSAPP } from '../../data/opciones';

// Datos del negocio — reemplazar por los reales
const CONTACTO = {
  telefono: '+00 000 000 0000',
  telefonoHref: 'tel:+000000000000',
  mail: 'contacto@desidere.com',
  instagram: '@desidere.eventos',
  instagramHref: 'https://instagram.com/desidere.eventos',
};

// Ruta del armado de pedido (mismo punto de verdad que el resto)
const RUTA_PEDIDO = '/pedido';

const PASOS = [
  {
    numero: '01',
    titulo: 'Contanos tu idea',
    texto: 'Escribí en el buscador qué evento imaginás, o elegí las opciones directamente en el formulario.',
  },
  {
    numero: '02',
    titulo: 'Armá tu pedido',
    texto: 'Catering, barra, decoración, animación: combiná todo lo que quieras, suma las personas y dejanos tu consulta.',
  },
  {
    numero: '03',
    titulo: 'Recibí tu presupuesto',
    texto: 'Tu pedido nos llega por WhatsApp y te respondemos con un presupuesto detallado.',
  },
];

export default function Contacto() {
  return (
    <section className="ct-pagina">

      {/* ---------- Cabecera ---------- */}
      <div className="ct-cabecera">
        <p className="ct-cabecera__etiqueta">Contacto</p>
        <h1 className="ct-cabecera__titulo">
          Empecemos a <em>planificar</em>
        </h1>
        <p className="ct-cabecera__texto">
          Estamos a un mensaje de distancia. Escribinos por cualquier consulta
          o armá tu pedido completo desde la web.
        </p>
      </div>

      <div className="ct-grid">

        {/* ---------- Columna: datos directos ---------- */}
        <div className="ct-info">
          <h2 className="ct-info__titulo">Contacto directo</h2>

          <ul className="ct-info__lista">
            <li>
              <a href={CONTACTO.telefonoHref} className="ct-info__item">
                <span className="ct-info__icono" aria-hidden="true">
                  {/* Teléfono */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <span className="ct-info__datos">
                  <span className="ct-info__label">Teléfono</span>
                  {CONTACTO.telefono}
                </span>
              </a>
            </li>
                        <li>
              <a
                href={`https://wa.me/${NUMERO_WHATSAPP}`}
                className="ct-info__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ct-info__icono" aria-hidden="true">
                  {/* WhatsApp */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-4.28A9 9 0 1 1 7.3 19.35L3 21z"/>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0v1a3 3 0 0 0 3 3h1a.5.5 0 0 0 0-1h-1a2 2 0 0 1-2-2v-1"/>
                  </svg>
                </span>
                <span className="ct-info__datos">
                  <span className="ct-info__label">WhatsApp</span>
                  {CONTACTO.telefono}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACTO.mail}`} className="ct-info__item">
                <span className="ct-info__icono" aria-hidden="true">
                  {/* Mail */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 6L2 7"/>
                  </svg>
                </span>
                <span className="ct-info__datos">
                  <span className="ct-info__label">Mail</span>
                  {CONTACTO.mail}
                </span>
              </a>
            </li>
            <li>
              <a
                href={CONTACTO.instagramHref}
                className="ct-info__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ct-info__icono" aria-hidden="true">
                  {/* Instagram */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </span>
                <span className="ct-info__datos">
                  <span className="ct-info__label">Instagram</span>
                  {CONTACTO.instagram}
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* ---------- Columna: armado de pedido + proceso ---------- */}
        <div className="ct-pedido">
          <h2 className="ct-pedido__titulo">Cotizá desde la web</h2>
          <p className="ct-pedido__intro">
            ¿Ya sabés qué querés para tu evento? Armá el pedido completo
            opción por opción y recibí un presupuesto detallado.
          </p>

          <ol className="ct-pedido__pasos">
            {PASOS.map((p) => (
              <li key={p.numero} className="ct-paso">
                <span className="ct-paso__numero" aria-hidden="true">{p.numero}</span>
                <div>
                  <h3 className="ct-paso__titulo">{p.titulo}</h3>
                  <p className="ct-paso__texto">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link to={RUTA_PEDIDO} className="ct-pedido__btn">
            Armá tu pedido
            <span className="ct-pedido__circulo" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}