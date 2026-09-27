import { SECCIONES } from '../data/opciones';

// minúsculas + sin tildes: "Cata de Vinos" y "cata de vinos" valen igual
const normalizar = (texto) =>
  (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// Busca cantidad de personas: "40 personas", "para 15 invitados"...
function extraerPersonas(texto) {
  const m =
    texto.match(/(\d{1,4})\s*(?:personas|invitados|pax|gente)/) ||
    texto.match(/para\s+(\d{1,4})\b/);
  return m ? m[1] : null;
}

export function interpretarBusqueda(texto) {
  const t = normalizar(texto);

  // Arrancamos con todas las secciones vacías
  const seleccion = {};
  SECCIONES.forEach((s) => {
    seleccion[s.id] = [];
  });

  if (t.trim()) {
    SECCIONES.forEach((s) => {
      s.opciones.forEach((op) => {
        const coincide = (op.claves || []).some((clave) => t.includes(clave));
        if (!coincide) return;

        if (s.tipo === 'unico') {
          // En secciones de elección única, nos quedamos con la
          // PRIMERA coincidencia (el resto el cliente lo corrige)
          if (seleccion[s.id].length === 0) seleccion[s.id].push(op.id);
        } else {
          seleccion[s.id].push(op.id);
        }
      });
    });
  }

  return {
    seleccion,
    personas: extraerPersonas(t),
    huboCoincidencias: Object.values(seleccion).some((arr) => arr.length > 0),
  };
}