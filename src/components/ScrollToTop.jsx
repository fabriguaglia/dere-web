import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Al cambiar de ruta:
// - Si la URL trae un hash (ej: /eventos#bodas), scrollea suave
//   hasta esa sección.
// - Si no, sube la ventana al tope. Sin esto, React Router
//   conserva la posición de scroll entre páginas.
//
// La dependencia es pathname + hash (no solo hash): si dependiera
// únicamente del hash, navegar entre dos rutas SIN ancla (ej:
// /pedido → /) no cambiaría el valor ('' → '') y el efecto nunca
// se re-ejecutaría, dejando la página "pre-scrolleada".
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Esperamos un frame para que la página destino esté montada
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}