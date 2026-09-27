import { Link } from 'react-router-dom';
import './Nosotros.css';

// Ruta del armado de pedido (mismo punto de verdad que el resto)
const RUTA_PEDIDO = '/pedido';

// ============================================================
// TODO EL CONTENIDO DE ESTA PÁGINA ES DE RELLENO.
// Reemplazar textos e imágenes con la historia real del negocio.
// ============================================================

const PILARES = [
  {
    titulo: 'Dedicación',
    texto:
      'Cada evento lo tratamos como si fuera el único. Nos involucramos desde el primer café hasta el último invitado.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    titulo: 'Detalle',
    texto:
      'La diferencia está en los detalles: la flor correcta, la temperatura exacta, el momento justo para brindar.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    titulo: 'Naturaleza',
    texto:
      'Creemos en los eventos al aire libre, rodeados de verde, con la comodidad de un salón y la libertad del jardín.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
];

export default function Nosotros() {
  return (
    <section className="ns-pagina">

      {/* ---------- Cabecera ---------- */}
      <div className="ns-cabecera">
        <p className="ns-cabecera__etiqueta">Nosotros</p>
        <h1 className="ns-cabecera__titulo">
          Los que cuidamos <em>los detalles</em>
        </h1>
        <p className="ns-cabecera__texto">
          Somos un equipo de organización de eventos y catering que cree que
          cada ocasión merece ser memorable.
        </p>
      </div>

      {/* ---------- Historia: texto + imagen ---------- */}
      <div className="ns-historia">
        <div className="ns-historia__texto-col">
          <h2 className="ns-historia__titulo">Nuestra historia</h2>
          <p className="ns-historia__texto">
            {/* RELLENO: reemplazar con la historia real */}
            Desidere nació de una obsesión: que los anfitriones puedan
            disfrutar su propio evento. Vimos demasiadas celebraciones donde
            quien organizaba pasaba la noche atendiendo detalles en vez de
            estar con sus invitados.
          </p>
          <p className="ns-historia__texto">
            Así creamos una propuesta de organización integral: nos ocupamos
            del catering, la decoración, la coordinación y todo lo que esté
            entre medio — desde la cata de vinos hasta la máquina de
            pochoclos — para que ustedes solo tengan que disfrutar.
          </p>
        </div>
        {/* Imagen opcional: si el archivo no existe, se ve el bloque crema */}
        <div
          className="ns-historia__img"
          role="img"
          aria-label="El equipo de Desidere en un evento"
        />
      </div>

      {/* ---------- Pilares ---------- */}
      <div className="ns-pilares">
        <h2 className="ns-pilares__titulo">Lo que nos define</h2>
        <div className="ns-pilares__grid">
          {PILARES.map((p) => (
            <div key={p.titulo} className="ns-pilar">
              <span className="ns-pilar__icono" aria-hidden="true">{p.icono}</span>
              <h3 className="ns-pilar__titulo">{p.titulo}</h3>
              <p className="ns-pilar__texto">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Cita / filosofía ---------- */}
      <div className="ns-cita">
        <p className="ns-cita__frase">
          “Ustedes disfrutan. Del resto nos ocupamos nosotros.”
        </p>
        <span className="ns-cita__autor">— El equipo de Desidere</span>
      </div>

      {/* ---------- CTA final ---------- */}
      <div className="ns-cta">
        <p className="ns-cta__texto">
          ¿Te gustó la forma en que trabajamos? Empezá a armar tu evento.
        </p>
        <Link to={RUTA_PEDIDO} className="ns-cta__btn">
          Armá tu pedido
          <span className="ns-cta__circulo" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </div>

    </section>
  );
}