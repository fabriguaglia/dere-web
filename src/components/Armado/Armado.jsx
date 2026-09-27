import { Fragment, useEffect, useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SECCIONES, NUMERO_WHATSAPP } from '../../data/opciones';
import { interpretarBusqueda } from '../../utils/interpretarBusqueda';
import './Armado.css';

export default function Armado() {
  const location = useLocation();

  // El texto que el cliente escribió en el buscador del landing
  // llega por navigate(url, { state: { texto } })
  const textoInicial = location.state?.texto || '';

  // Interpretamos UNA sola vez, al montar
  const inicial = useMemo(
    () => interpretarBusqueda(textoInicial),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [seleccion, setSeleccion] = useState(inicial.seleccion);
  const [personas, setPersonas] = useState(inicial.personas || '');

  // Campos libres ("Otro" con texto): un borrador y un flag de
  // confirmación POR SECCIÓN, generico para cualquier opción
  // con conTexto: true (tipo de evento, catering, y las que sumemos)
  const [textosOtro, setTextosOtro] = useState({});   // { evento: '...', catering: '...' }
  const [listosOtro, setListosOtro] = useState({});   // { evento: true, ... }

  const [comentario, setComentario] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  // Popup explicativo: abierto al entrar a la página
  const [popupAbierto, setPopupAbierto] = useState(true);

  // Mientras el popup está abierto: bloquea el scroll de fondo
  // y permite cerrarlo con la tecla Escape
  useEffect(() => {
    if (!popupAbierto) return;

    document.body.style.overflow = 'hidden';
    const alEscape = (e) => {
      if (e.key === 'Escape') setPopupAbierto(false);
    };
    document.addEventListener('keydown', alEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', alEscape);
    };
  }, [popupAbierto]);

  // Devuelve la opción conTexto activa de una sección, si hay
  const otroActivoDe = (seccion, ids) =>
    seccion.opciones.find((o) => o.conTexto && ids.includes(o.id)) || null;

  const toggle = (seccionId, opcionId) => {
    const seccion = SECCIONES.find((s) => s.id === seccionId);
    setSeleccion((prev) => {
      const actual = prev[seccionId] || [];
      let nuevo;
      if (seccion.tipo === 'unico') {
        // Comportamiento de radio: click de nuevo = deseleccionar
        nuevo = actual.includes(opcionId) ? [] : [opcionId];
      } else {
        nuevo = actual.includes(opcionId)
          ? actual.filter((id) => id !== opcionId)
          : [...actual, opcionId];
      }

      // Si la opción "con texto" quedó deseleccionada, limpiamos
      // su borrador y su confirmación
      const quedanConTexto = seccion.opciones.some(
        (o) => o.conTexto && nuevo.includes(o.id)
      );
      if (!quedanConTexto) {
        setTextosOtro((t) => ({ ...t, [seccionId]: '' }));
        setListosOtro((l) => ({ ...l, [seccionId]: false }));
      }

      return { ...prev, [seccionId]: nuevo };
    });
  };

  // Confirmar el texto de un "Otro": desde el botón check o con Enter
  const confirmarOtro = (seccionId) => {
    if ((textosOtro[seccionId] || '').trim()) {
      setListosOtro((l) => ({ ...l, [seccionId]: true }));
    }
  };

  const totalSeleccionadas = Object.values(seleccion).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const datosContactoCompletos = nombre.trim() && telefono.trim();

  // El mensaje de WhatsApp se arma en vivo con lo seleccionado
  const mensaje = useMemo(() => {
    const lineas = [];
    lineas.push('Hola! Quiero cotizar un evento. Armé este pedido desde la web:');
    lineas.push('');

    if (personas) {
      lineas.push(`Cantidad de personas: ${personas}`);
      lineas.push('');
    }

    SECCIONES.forEach((s) => {
      const ids = seleccion[s.id] || [];
      if (!ids.length) return;

      const labels = s.opciones
        .filter((o) => ids.includes(o.id))
        .map((o) => o.label);
      lineas.push(`${s.titulo}:`);
      labels.forEach((l) => lineas.push(`• ${l}`));

      // Detalle escrito en el campo libre de esta sección
      // (solo si está confirmado)
      if (listosOtro[s.id] && (textosOtro[s.id] || '').trim()) {
        lineas.push(`  Detalle: ${textosOtro[s.id].trim()}`);
      }

      lineas.push('');
    });

    if (comentario.trim()) {
      lineas.push('Algo más que quieras contarnos o consultar:');
      lineas.push(comentario.trim());
      lineas.push('');
    }

    if (textoInicial.trim()) {
      lineas.push(`Esto fue lo que busqué en la web: "${textoInicial.trim()}"`);
      lineas.push('');
    }

    lineas.push('Mis datos:');
    lineas.push(`Nombre: ${nombre.trim()}`);
    if (correo.trim()) lineas.push(`Correo: ${correo.trim()}`);
    lineas.push(`Teléfono: ${telefono.trim()}`);

    return lineas.join('\n');
  }, [seleccion, personas, textosOtro, listosOtro, comentario, nombre, correo, telefono, textoInicial]);

  const enviarWhatsApp = () => {
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const aireLibreSeleccionado = (seleccion.lugar || []).includes('aire_libre');
  const posadaSeleccionada = (seleccion.lugar || []).includes('posada');

  // El popup cambia según si el cliente llegó con una idea del
  // buscador o entró directo (sin texto)
  const huboIdea = Boolean(textoInicial.trim());

  return (
    <section className="ar-pagina">

      {/* ---------- Popup de bienvenida ---------- */}
      {popupAbierto && (
        <div
          className="ar-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ar-popup-titulo"
        >
          <div className="ar-popup__fondo" onClick={() => setPopupAbierto(false)} />
          <div className="ar-popup__caja">
            <button
              type="button"
              className="ar-popup__cerrar"
              aria-label="Cerrar"
              onClick={() => setPopupAbierto(false)}
            >
              ✕
            </button>
            <span className="ar-popup__icono" aria-hidden="true">
              {huboIdea ? '✨' : '💛'}
            </span>
            <h2 id="ar-popup-titulo" className="ar-popup__titulo">
              {huboIdea ? '¡Ya tenemos tu idea!' : 'Armemos tu evento juntos'}
            </h2>

            {huboIdea ? (
              <>
                <p className="ar-popup__texto">
                  A continuación vas a encontrar todas las opciones para tu
                  evento. Completa el formulario y, al finalizar, te enviaremos
                  un presupuesto detallado por WhatsApp.
                </p>
                <p className="ar-popup__texto ar-popup__texto--detalle">
                  Todo lo que veas preseleccionado salió de lo que nos contaste
                  en el buscador — revisalo y ajustá lo que quieras.
                </p>
              </>
            ) : (
              <>
                <p className="ar-popup__texto">
                  Vas a encontrar todas las opciones para tu evento: tipo,
                  momento, lugar, catering, barra y mucho más. Elegí lo que te
                  guste, contanos si tenés algo especial en mente y, al
                  finalizar, te enviaremos un presupuesto detallado por
                  WhatsApp.
                </p>
                <p className="ar-popup__texto ar-popup__texto--detalle">
                  ¿Querés que te lo dejemos medio armado? Volvé al inicio y
                  contanos tu idea en el buscador.
                </p>
              </>
            )}

            <button
              type="button"
              className="ar-popup__btn"
              onClick={() => setPopupAbierto(false)}
            >
              {huboIdea ? '¡Vamos a ello!' : 'Empezar'}
            </button>
          </div>
        </div>
      )}

      {/* ---------- Cabecera ---------- */}
      <div className="ar-pagina__cabecera">
        <h1 className="ar-pagina__titulo">Armá tu evento</h1>

        {huboIdea ? (
          <p className="ar-pagina__origen">
            Partimos de lo que nos contaste: <strong>“{textoInicial.trim()}”</strong>
            {inicial.huboCoincidencias
              ? ' — ya te dejamos preseleccionado lo que detectamos. Revisalo y completá el resto.'
              : ' — no pudimos detectar opciones automáticamente, eligelas abajo.'}
          </p>
        ) : (
          <p className="ar-pagina__origen">
            Elegí lo que te gusta y te armamos la cotización. ¿Tenés una idea?
            <Link to="/" className="ar-pagina__link"> Contala en el buscador</Link> y
            te precargamos todo.
          </p>
        )}
      </div>

      {/* ---------- Secciones del catálogo ---------- */}
      {SECCIONES.map((s) => {
        const ids = seleccion[s.id] || [];
        const otroActivo = otroActivoDe(s, ids);

        return (
          <Fragment key={s.id}>
            <fieldset className="ar-seccion">
              <legend className="ar-seccion__titulo">{s.titulo}</legend>

              {/* Recomendación del negocio para aire libre, con botón
                  para sumar la posada al pedido */}
              {s.id === 'lugar' && aireLibreSeleccionado && (
                <div className="ar-seccion__nota">
                  <p className="ar-seccion__nota-texto">
                    Para eventos al aire libre solemos recomendar
                    <strong> Posada Los Molles (Entre Ríos)</strong>.
                  </p>
                  <button
                    type="button"
                    className={`ar-seccion__nota-btn${posadaSeleccionada ? ' is-agregada' : ''}`}
                    onClick={() => toggle('lugar', 'posada')}
                    aria-pressed={posadaSeleccionada}
                  >
                    {posadaSeleccionada ? 'Agregada — quitar del pedido' : '+ Agregar al pedido'}
                  </button>
                </div>
              )}

              <div className="ar-opciones">
                {s.opciones.map((op) => {
                  const activa = ids.includes(op.id);
                  return (
                    <button
                      key={op.id}
                      type="button"
                      className={`ar-chip${activa ? ' is-activa' : ''}`}
                      aria-pressed={activa}
                      onClick={() => toggle(s.id, op.id)}
                    >
                      {op.label}
                    </button>
                  );
                })}
              </div>

              {/* Campo libre genérico: aparece para cualquier opción
                  con conTexto (tipo de evento "Otro", catering "Otro"...) */}
              {otroActivo && (
                <div className="ar-otro">
                  <div className="ar-otro__fila">
                    <input
                      type="text"
                      className={`ar-input ar-input--otro${listosOtro[s.id] ? ' is-listo' : ''}`}
                      placeholder={otroActivo.placeholder || 'Contanos qué querés'}
                      value={textosOtro[s.id] || ''}
                      onChange={(e) => {
                        setTextosOtro((t) => ({ ...t, [s.id]: e.target.value }));
                        // Si edita después de confirmar, vuelve a pendiente
                        setListosOtro((l) => ({ ...l, [s.id]: false }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          confirmarOtro(s.id);
                        }
                      }}
                      maxLength="200"
                      aria-label={otroActivo.label}
                    />
                    <button
                      type="button"
                      className={`ar-otro__check${listosOtro[s.id] ? ' is-listo' : ''}`}
                      onClick={() => confirmarOtro(s.id)}
                      aria-label={`Confirmar ${otroActivo.label}`}
                      title="Confirmar (o presioná Enter)"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              )}
            </fieldset>

            {/* ¿Para cuántas personas? — justo después de Tipo de evento */}
            {s.id === 'evento' && (
              <div className="ar-seccion ar-seccion--personas">
                <label className="ar-seccion__titulo" htmlFor="ar-personas">
                  ¿Para cuántas personas?
                </label>
                <input
                  id="ar-personas"
                  type="number"
                  min="1"
                  className="ar-input ar-input--numero"
                  placeholder="Ej: 40"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                />
              </div>
            )}
          </Fragment>
        );
      })}

      {/* ---------- ¿Algo más que contar? ---------- */}
      <fieldset className="ar-seccion">
        <legend className="ar-seccion__titulo">
          ¿Querés contarnos o consultar algo más?
        </legend>
        <textarea
          className="ar-input ar-input--area"
          rows="4"
          placeholder="Ej: tenemos un invitado celíaco, queremos sorpresa de aniversario, necesitamos que empiece más temprano..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <p className="ar-seccion__ayuda">
          Opcional — lo que escribas acá llega junto con el pedido.
        </p>
      </fieldset>

      {/* ---------- Datos de contacto ---------- */}
      <fieldset className="ar-seccion">
        <legend className="ar-seccion__titulo">Tus datos</legend>
        <div className="ar-contacto">
          <input
            type="text"
            className="ar-input"
            placeholder="Nombre y apellido *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            className="ar-input"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="tel"
            className="ar-input"
            placeholder="Tu número de teléfono *"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </fieldset>

      {/* ---------- Envío ---------- */}
      <div className="ar-envio">
        <p className="ar-envio__resumen">
          {totalSeleccionadas} {totalSeleccionadas === 1 ? 'opción seleccionada' : 'opciones seleccionadas'}
        </p>

        <button
          type="button"
          className="ar-envio__btn"
          onClick={enviarWhatsApp}
          disabled={!datosContactoCompletos}
        >
          Solicitar presupuesto
        </button>
        {!datosContactoCompletos && (
          <p className="ar-envio__ayuda">
            Completá tu nombre y teléfono para poder enviar el pedido.
          </p>
        )}

        <details className="ar-envio__preview">
          <summary>Ver cómo llega el mensaje</summary>
          <pre className="ar-envio__texto">{mensaje}</pre>
        </details>
      </div>
    </section>
  );
}