import { Link } from 'react-router-dom';
import './Servicios.css';
import ImgCatering from '../assets/images/catering.webp';
import ImgDecoracion from '../assets/images/decoracion.webp';
import ImgOrganizacion from '../assets/images/organizacion.webp';

// Ruta del armado de pedido (mismo punto de verdad que Landing/Footer)
const RUTA_PEDIDO = '/pedido';

// Contenido de cada servicio. La imagen es opcional: si el archivo
// no existe, se ve el bloque crema y no una imagen rota.
const SERVICIOS = [
  {
    id: 'catering',
    numero: '01',
    titulo: 'Catering',
    img: ImgCatering,
    texto:
      'Siete opciones de menú —todas incluyen recepción y mozos— más sushi libre y barra a medida. Del asado a la parrilla al servicio de té con scones y sandwiches de miga.',
    destacados: [
      'Opción 1 — Pizzas y empanadas',
      'Opción 2 — Asado (opción vegana/vegetariana a consultar)',
      'Opción 3 — Pernil, tacos y pastas',
      'Opción 4 — Picadas básicas y premium',
      'Opción 5 — Servicio de té',
      'Opción 6 — Mesa dulce',
      'Opción 7 — Kids',
      'Extra — Sushi libre',
    ],
    textoPedido: 'Quiero contratar el catering',
  },
  {
    id: 'decoracion',
    numero: '02',
    titulo: 'Decoración y ambientación',
    img: ImgDecoracion,
    texto:
      'Nos ocupamos de que cada rincón esté a la altura de la ocasión: desde la vajilla hasta la ambientación integral del espacio, con asesoría en cada decisión.',
    destacados: [
      'Vajilla completa (platos, vasos, manteles, cubiertos y copas)',
      'Arreglos florales (tela, natural o mixto)',
      'Climatización: 2 calefactores de pie',
      'Gazebos',
      'Livings + banquitos color blanco',
      'Ambientación integral, decoración y asesoría',
    ],
    textoPedido: 'Quiero contratar la decoración y ambientación',
  },
  {
    id: 'produccion',
    numero: '03',
    titulo: 'Producción integral',
    img: ImgOrganizacion,
    texto:
      'La organización y coordinación completa de tu evento, de principio a fin. Sumale fotografía, traslados y estadía para que no tengas que preocuparte por nada.',
    destacados: [
      'Organización y coordinación del evento',
      'Fotografía',
      'Traslados',
      'Estadía en el lugar para 8 personas',
    ],
    textoPedido: 'Quiero la producción integral y coordinación del evento',
  },
];

export default function Servicios() {
  return (
    <section className="sv-pagina">
      {/* Cabecera de la página */}
      <div className="sv-cabecera">
        <p className="sv-cabecera__etiqueta">Servicios</p>
        <h1 className="sv-cabecera__titulo">
          Todo lo que tu evento <em>necesita</em>
        </h1>
        <p className="sv-cabecera__texto">
          Catering, decoración y producción integral. Combiná lo que quieras:
          todo se puede sumar para armar tu evento a medida.
        </p>
      </div>

      {/* Secciones con id = anclas del header (/servicios#catering, etc.) */}
      {SERVICIOS.map((sv, i) => (
        <article
          key={sv.id}
          id={sv.id}
          className={`sv-servicio${i % 2 === 1 ? ' sv-servicio--invertido' : ''}`}
        >
          <div
            className="sv-servicio__img"
            style={{ backgroundImage: `url(${sv.img})` }}
            role="img"
            aria-label={sv.titulo}
          />

          <div className="sv-servicio__cuerpo">
            <span className="sv-servicio__numero" aria-hidden="true">{sv.numero}</span>
            <h2 className="sv-servicio__titulo">{sv.titulo}</h2>
            <p className="sv-servicio__texto">{sv.texto}</p>

            <ul className="sv-servicio__lista">
              {sv.destacados.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            {/* Va al armado de pedido preseleccionando opciones de este servicio */}
            <Link
              to={RUTA_PEDIDO}
              state={{ texto: sv.textoPedido }}
              className="sv-servicio__cta"
            >
              Sumá {sv.titulo.toLowerCase()} a tu evento
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}