import { Link } from 'react-router-dom';
import './Eventos.css';
import ImgBodas from '../assets/images/bodas.webp';
import ImgCorporativos from '../assets/images/corporativo.webp';
import ImgSociales from '../assets/images/sociales.webp';

// Ruta del armado de pedido (mismo punto de verdad que Landing/Footer)
const RUTA_PEDIDO = '/pedido';

// Contenido de cada tipo de evento. La imagen es opcional: si el
// archivo no existe, se ve el bloque crema y no una imagen rota.
const EVENTOS = [
  {
    id: 'bodas',
    numero: '01',
    titulo: 'Bodas',
    titulo2: 'boda',
    img: ImgBodas,
    texto:
      'El día más importante merece una organización impecable. Nos ocupamos de cada detalle —ceremonia, recepción y fiesta— para que ustedes solo vivan el momento.',
    destacados: [
      'Catering completo con recepción y mozos (7 opciones de menú)',
      'Decoración y ambientación: vajilla, arreglos florales, gazebos',
      'Violinista del Colón o banda de cuerdas en vivo',
      'Mesa dulce, tortas personalizadas y barra con alcohol',
      'Fotografía y coordinación integral del evento',
    ],
    textoPedido: 'Quiero hacer una boda',
  },
  {
    id: 'corporativos',
    numero: '02',
    titulo: 'Eventos corporativos',
    titulo2: 'evento corporativo',
    img: ImgCorporativos,
    texto:
      'Jornadas, reuniones de empresa y lanzamientos con impronta profesional. Nos adaptamos al formato y a la cantidad de invitados, en salón o al aire libre.',
    destacados: [
      'Coffee bar con barista y opciones de catering ejecutivo',
      'Salones o espacios al aire libre para jornadas',
      'Degustación de vinos con sommelier y juegos de mesa',
      'Fotografía y traslados',
      'Organización y coordinación de principio a fin',
    ],
    textoPedido: 'Quiero hacer un evento corporativo',
  },
  {
    id: 'sociales',
    numero: '03',
    titulo: 'Eventos sociales',
    titulo2: 'evento social',
    img: ImgSociales,
    texto:
      'Cumpleaños, aniversarios y celebraciones únicas. Armamos la fiesta a medida: desde una merienda con servicio de té hasta una celebración al aire libre con toda la familia.',
    destacados: [
      'Picadas, servicio de té y mesas dulces',
      'Animación para niños y actividades para todas las edades',
      'Máquinas: cheddar, granita, panchos y pochoclos',
      'Livings, banquitos y ambientación integral',
      'Extra sushi libre y barra sin alcohol para los más chicos',
    ],
    textoPedido: 'Quiero hacer un evento social',
  },
];

export default function Eventos() {
  return (
    <section className="ev-pagina">
      {/* Cabecera de la página */}
      <div className="ev-cabecera">
        <p className="ev-cabecera__etiqueta">Eventos</p>
        <h1 className="ev-cabecera__titulo">
          Cada ocasión, <em>única</em>
        </h1>
        <p className="ev-cabecera__texto">
          Organizamos bodas, eventos corporativos y sociales de principio a
          fin. Elegí el tuyo y conocé todo lo que podemos sumar.
        </p>
      </div>

      {/* Secciones con id = anclas del header (/eventos#bodas, etc.) */}
      {EVENTOS.map((ev, i) => (
        <article
          key={ev.id}
          id={ev.id}
          className={`ev-evento${i % 2 === 1 ? ' ev-evento--invertido' : ''}`}
        >
          <div
            className="ev-evento__img"
            style={{ backgroundImage: `url(${ev.img})` }}
            role="img"
            aria-label={ev.titulo}
          />

          <div className="ev-evento__cuerpo">
            <span className="ev-evento__numero" aria-hidden="true">{ev.numero}</span>
            <h2 className="ev-evento__titulo">{ev.titulo}</h2>
            <p className="ev-evento__texto">{ev.texto}</p>

            <ul className="ev-evento__lista">
              {ev.destacados.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            {/* Va al armado de pedido preseleccionando este tipo de evento */}
            <Link
              to={RUTA_PEDIDO}
              state={{ texto: ev.textoPedido }}
              className="ev-evento__cta"
            >
              Armá tu {ev.titulo2}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}