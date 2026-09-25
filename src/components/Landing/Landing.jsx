import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';
import Hero from '../assets/images/hero-evento.jpg';

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
    // Usuarios con movimiento reducido: sin máquina de escribir,
    // la frase cambia completa cada 3.5s
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

    // Escribe la frase actual carácter a carácter
    const escribir = (frase, pos) => {
      if (cancelado) return;
      if (pos <= frase.length) {
        setTexto(frase.slice(0, pos));
        timeout = setTimeout(() => escribir(frase, pos + 1), MS_ESCRITURA);
      } else {
        // Frase completa: pausa y luego borra
        timeout = setTimeout(() => borrar(frase, frase.length), MS_PAUSA_ESCRITO);
      }
    };

    // Borra la frase carácter a carácter y pasa a la siguiente
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

// Tarjetas de tipos de evento. Cada una linkea a una ruta que
// ya existe. La imagen se carga por CSS (background), así que si
// el archivo no existe todavía se ve el fondo crema y no una
// imagen rota.
const TARJETAS = [
  {
    to: '/eventos/bodas',
    titulo: 'Bodas',
    texto: 'El día más importante, organizado en cada detalle.',
    img: '/cards/bodas.jpg',
  },
  {
    to: '/eventos/corporativos',
    titulo: 'Corporativos',
    texto: 'Eventos de empresa con impronta profesional.',
    img: '/cards/corporativos.jpg',
  },
  {
    to: '/eventos/sociales',
    titulo: 'Sociales',
    texto: 'Cumpleaños, aniversarios y celebraciones únicas.',
    img: '/cards/sociales.jpg',
  },
];

export default function Landing() {
  const placeholder = usePlaceholderRotativo(SUGERENCIAS);
  const navigate = useNavigate();

  // Sin buscador real todavía: el envío lleva a contacto,
  // que es el siguiente paso natural para quien quiere cotizar.
  const alBuscar = (e) => {
    e.preventDefault();
    navigate('/contacto');
  };

  return (
    <>
      <section className="ld-hero">
        {/* Fondo: una foto de evento real (carpa, mesa ambientada...).
            Vive DENTRO del hero: cubre la primera pantalla y al hacer
            scroll la imagen termina — no se repite ni queda fija. */}
        <img
          src={Hero}
          alt=""
          className="ld-hero__fondo"
          aria-hidden="true"
        />
        <div className="ld-hero__velo" aria-hidden="true" />

        {/* Columna única en PC y móvil: logo, buscador, texto */}
        <div className="ld-hero__contenido">

          <img
            src="/logo.png"
            alt="Desidere — Organización de eventos y catering"
            className="ld-hero__logo"
          />

          <form className="ld-buscador" onSubmit={alBuscar} role="search">
            <input
              type="search"
              className="ld-buscador__input"
              placeholder={placeholder}
              aria-label="¿Qué deseas realizar? Escribí tu evento y te llevamos a cotizar"
            />
            <button type="submit" className="ld-buscador__btn" aria-label="Cotizar mi evento">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <line x1="12" y1="12" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <p className="ld-buscador__ayuda">
            Contanos qué imaginás y nosotros lo hacemos realidad.
          </p>

          <p className="ld-hero__texto">
            Nos especializamos en la organización integral de eventos y
            catering, transformando cada ocasión en una experiencia memorable.
          </p>

        </div>
      </section>

      {/* Sección de tipos de evento: llena el landing y lleva
          tráfico a las páginas que ya existen */}
      <section className="ld-tipos">
        <h2 className="ld-tipos__titulo">¿Qué estás organizando?</h2>
        <div className="ld-tipos__grid">
          {TARJETAS.map((t) => (
            <Link key={t.to} to={t.to} className="ld-tarjeta">
              <div
                className="ld-tarjeta__img"
                style={{ backgroundImage: `url(${t.img})` }}
                role="img"
                aria-label={t.titulo}
              />
              <div className="ld-tarjeta__cuerpo">
                <h3 className="ld-tarjeta__titulo">{t.titulo}</h3>
                <p className="ld-tarjeta__texto">{t.texto}</p>
                <span className="ld-tarjeta__link">Ver más</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Franja de cierre con la propuesta de valor */}
      <section className="ld-cierre">
        <p className="ld-cierre__frase">
          Creamos eventos únicos desde cero, rodeados de naturaleza y
          comodidad, mientras ustedes disfrutan.
        </p>
        <Link to="/contacto" className="ld-cierre__cta">
          Cotizá tu evento
        </Link>
      </section>
    </>
  );
}