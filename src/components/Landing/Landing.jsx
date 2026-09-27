import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';
import Hero from "../assets/images/hero-evento.webp";
import ImgBodas from '../assets/images/bodas.webp';
import ImgCorporativos from '../assets/images/corporativo.webp';
import ImgSociales from '../assets/images/sociales.webp';
import ImgCatering from '../assets/images/catering.webp';
import ImgDecoracion from '../assets/images/decoracion.webp';
import ImgOrganizacion from '../assets/images/organizacion.webp';

// Frases que rota el buscador. Agregar o quitar acá
// no requiere tocar nada más.
const SUGERENCIAS = [
  'Una boda para 100 invitados',
  'Una reunión para 15 personas con catering',
  'Una cata de vinos al aire libre',
  'Un cumpleaños en el jardín',
  'Un evento corporativo con coffee break',
];

// Velocidades del efecto máquina de escribir (ms)
const MS_ESCRITURA = 55;       // por carácter, escribiendo
const MS_BORRADO = 28;         // por carácter, borrando
const MS_PAUSA_ESCRITO = 2200; // pausa con la frase completa
const MS_PAUSA_VACIO = 500;    // pausa antes de empezar la siguiente

function usePlaceholderRotativo(frases) {
  const [texto, setTexto] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const sinAnimacion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (sinAnimacion) {
      setTexto(frases[idx]);
      const t = setInterval(
        () => setIdx((i) => (i + 1) % frases.length),
        3500
      );
      return () => clearInterval(t);
    }

    let timeout;
    let cancelado = false;

    const escribir = (frase, pos) => {
      if (cancelado) return;
      if (pos <= frase.length) {
        setTexto(frase.slice(0, pos));
        timeout = setTimeout(() => escribir(frase, pos + 1), MS_ESCRITURA);
      } else {
        timeout = setTimeout(() => borrar(frase, frase.length), MS_PAUSA_ESCRITO);
      }
    };

    const borrar = (frase, pos) => {
      if (cancelado) return;
      if (pos >= 0) {
        setTexto(frase.slice(0, pos));
        timeout = setTimeout(() => borrar(frase, pos - 1), MS_BORRADO);
      } else {
        setIdx((i) => (i + 1) % frases.length);
        timeout = setTimeout(
          () => escribir(frases[(idx + 1) % frases.length], 1),
          MS_PAUSA_VACIO
        );
      }
    };

    escribir(frases[idx], 1);

    return () => {
      cancelado = true;
      clearTimeout(timeout);
    };
  }, [idx, frases]);

  return texto;
}

// Tarjetas de tipos de evento
const TARJETAS = [
  {
    to: '/eventos#bodas',
    titulo: 'Bodas',
    texto: 'El día más importante, organizado en cada detalle.',
    img: ImgBodas,
  },
  {
    to: '/eventos#corporativos',
    titulo: 'Corporativos',
    texto: 'Eventos de empresa con impronta profesional.',
    img: ImgCorporativos,
  },
  {
    to: '/eventos#sociales',
    titulo: 'Sociales',
    texto: 'Cumpleaños, aniversarios y celebraciones únicas.',
    img: ImgSociales,
  },
];

// Tarjetas de servicios (los mismos del header)
const SERVICIOS = [
  {
    to: '/servicios#catering',
    titulo: 'Catering',
    texto: 'Siete opciones de menú, barra, coffee bar y sushi libre.',
    img: ImgCatering,
  },
  {
    to: '/servicios#decoracion',
    titulo: 'Decoración y ambientación',
    texto: 'Vajilla, arreglos florales, gazebos, livings y más.',
    img: ImgDecoracion,
  },
  {
    to: '/servicios#produccion',
    titulo: 'Producción integral',
    texto: 'Organización y coordinación completa de tu evento.',
    img: ImgOrganizacion,
  },
];

// Ruta del armado de pedido. Único punto de verdad:
// si cambiás la ruta en App.jsx, solo se cambia acá.
const RUTA_PEDIDO = '/pedido';

// Id del buscador: el CTA de cierre scrollea hacia acá
const ID_BUSCADOR = 'ld-buscador';

// Card reutilizable para eventos y servicios
function Card({ to, titulo, texto, img }) {
  return (
    <Link to={to} className="ld-tarjeta">
      <div
        className="ld-tarjeta__img"
        style={{ backgroundImage: `url(${img})` }}
        role="img"
        aria-label={titulo}
      />
      <div className="ld-tarjeta__cuerpo">
        <h3 className="ld-tarjeta__titulo">{titulo}</h3>
        <p className="ld-tarjeta__texto">{texto}</p>
        <span className="ld-tarjeta__link">Ver más</span>
      </div>
    </Link>
  );
}

export default function Landing() {
  const placeholder = usePlaceholderRotativo(SUGERENCIAS);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // El texto escrito viaja al armado de pedido, donde se
  // interpreta y preseleccionan las opciones detectadas.
  const alBuscar = (e) => {
    e.preventDefault();
    const texto = inputRef.current ? inputRef.current.value : '';
    navigate(RUTA_PEDIDO, { state: { texto } });
  };

  // El CTA de cierre sube hasta el buscador y le pone el foco,
  // listo para que el usuario escriba
  const irAlBuscador = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 450);
  };

  return (
    <>
      <section className="ld-hero">
        <img
          src={Hero}
          alt=""
          className="ld-hero__fondo"
          aria-hidden="true"
        />
        <div className="ld-hero__velo" aria-hidden="true" />

        <div className="ld-hero__contenido">

          <img
            src="/logo.png"
            alt="Desidere — Organización de eventos y catering"
            className="ld-hero__logo"
          />

          {/* id: destino del scroll del CTA de cierre */}
          <form
            id={ID_BUSCADOR}
            className="ld-buscador"
            onSubmit={alBuscar}
            role="search"
          >
            <input
              ref={inputRef}
              type="search"
              className="ld-buscador__input"
              placeholder={placeholder}
              aria-label="¿Qué deseas realizar? Contanos tu evento y armamos el pedido juntos"
            />
            <button type="submit" className="ld-buscador__btn" aria-label="Armar mi pedido">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <p className="ld-buscador__ayuda">
            Contanos qué imaginás y armamos tu pedido juntos.
          </p>

          <p className="ld-hero__texto">
            Nos especializamos en la organización integral de eventos y
            catering, transformando cada ocasión en una experiencia memorable.
          </p>

        </div>
      </section>

      {/* Tipos de evento */}
      <section className="ld-tipos">
        <h2 className="ld-tipos__titulo">¿Qué estás organizando?</h2>
        <div className="ld-tipos__grid">
          {TARJETAS.map((t) => (
            <Card key={t.to} {...t} />
          ))}
        </div>
      </section>

      {/* Servicios (los mismos del header) */}
      <section className="ld-tipos ld-tipos--servicios">
        <h2 className="ld-tipos__titulo">Nuestros servicios</h2>
        <div className="ld-tipos__grid">
          {SERVICIOS.map((s) => (
            <Card key={s.to} {...s} />
          ))}
        </div>
      </section>

      {/* Franja de cierre con la propuesta de valor */}
      <section className="ld-cierre">
        <p className="ld-cierre__frase">
          Creamos eventos únicos desde cero, rodeados de naturaleza y
          comodidad, mientras ustedes disfrutan.
        </p>
        <a href={`#${ID_BUSCADOR}`} className="ld-cierre__cta" onClick={irAlBuscador}>
          Cotizá tu evento
          <span className="ld-cierre__circulo" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </section>
    </>
  );
}