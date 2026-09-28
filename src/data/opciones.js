/* ============================================================
   CATÁLOGO DE OPCIONES — Desidere
   Todo lo que el cliente puede seleccionar, según el documento
   del negocio. Para cambiar el formulario, solo se edita acá.

   Cada opción lleva "claves": palabras (normalizadas, sin
   tildes, en minúscula) que, si aparecen en el texto de
   búsqueda, pre-seleccionan la opción.

   Opciones con `conTexto: true`: al seleccionarlas aparece un
   campo de texto libre (con check de confirmación) donde el
   cliente detalla lo que quiere. `placeholder` es el texto
   de ayuda de ese campo.
   ============================================================ */

// ← REEMPLAZAR por el WhatsApp real del encargado
// Formato internacional: código de país + número, sin +, sin 0 ni 15
export const NUMERO_WHATSAPP = '5491127907744';

export const SECCIONES = [
  {
    id: 'evento',
    titulo: 'Tipo de evento',
    tipo: 'unico', // solo se puede elegir una
    opciones: [
      { id: 'boda', label: 'Boda / Casamiento', claves: ['boda', 'casamiento', 'matrimonio'] },
      { id: 'corporativo', label: 'Evento corporativo', claves: ['corporativo', 'empresa', 'jornada', 'work'] },
      { id: 'social', label: 'Social (cumpleaños, aniversario)', claves: ['cumple', 'aniversario', 'social', 'fiesta'] },
      // Al seleccionarlo aparece un campo de texto libre
      {
        id: 'otro',
        label: 'Otro',
        claves: [],
        conTexto: true,
        placeholder: 'Contanos qué tipo de evento querés hacer',
      },
    ],
  },
  {
    id: 'momento',
    titulo: 'Momento del día',
    tipo: 'multiple',
    opciones: [
      { id: 'mediodia', label: 'Mediodía', claves: ['mediodia', 'medio dia', 'almuerzo'] },
      { id: 'tarde', label: 'Tarde', claves: ['tarde'] },
      { id: 'noche', label: 'Noche', claves: ['noche', 'atardecer', 'cena'] },
    ],
  },
  {
    id: 'lugar',
    titulo: 'Lugar',
    tipo: 'unico',
    opciones: [
      { id: 'aire_libre', label: 'Aire libre', claves: ['aire libre', 'exterior', 'jardin', 'parque'] },
      { id: 'salon', label: 'Salón o interior', claves: ['salon', 'interior'] },
      { id: 'quincho', label: 'Quincho', claves: ['quincho'] },
      // Está disponible como chip siempre, y además el botón de la
      // nota de "Aire libre" la activa/desactiva
      { id: 'posada', label: 'Posada Los Molles (Entre Ríos)', claves: ['posada', 'los molles'] },
    ],
  },

  {
    id: 'decoracion',
    titulo: 'Decoración y ambientación',
    tipo: 'multiple',
    opciones: [
      { id: 'vajilla', label: 'Vajilla completa (platos, vasos, manteles, cubiertos y copas)', claves: ['vajilla'] },
      { id: 'florales', label: 'Arreglos florales (tela, natural o mixto)', claves: ['floral', 'arreglos', 'flores'] },
      { id: 'calefaccion', label: 'Climatización (2 calefactores de pie)', claves: ['calefaccion', 'calefactor', 'climatizacion'] },
      { id: 'carpa', label: 'Carpas', claves: ['carpa', 'tienda'] },
      { id: 'gazebo', label: 'Gazebos', claves: ['gazebo', 'gazeos', 'gacebo'] },
      { id: 'livings', label: 'Livings + banquitos (color blanco)', claves: ['living', 'banquito', 'puffs', 'sillones'] },
      // 'decoracion': los CTAs de la página de Servicios la preseleccionan
      { id: 'ambientacion', label: 'Ambientación integral', claves: ['ambientacion', 'decoracion'] },
      // 'produccion': los CTAs de Servicios la preseleccionan
      { id: 'coordinacion', label: 'Organización y coordinación del evento', claves: ['coordinacion', 'produccion', 'coordinar', 'coordinen'] },
    ],
  },
  {
    id: 'servicios',
    titulo: 'Servicios',
    tipo: 'multiple',
    opciones: [
      { id: 'dj', label: 'DJ', claves: ['dj', 'deejay', 'discoteca', 'sonido'] },
      { id: 'fotografia', label: 'Fotografía', claves: ['foto', 'fotografia'] },
      { id: 'traslados', label: 'Traslados', claves: ['traslado', 'transporte'] },
      { id: 'estadia', label: 'Estadía en el lugar para 8 personas', claves: ['estadia', 'hospedaje', 'alojamiento', 'dormir'] },
    ],
  },
  {
    id: 'animacion',
    titulo: 'Animación y actividades',
    tipo: 'multiple',
    opciones: [
      { id: 'animacion_ninos', label: 'Animación para niños', claves: ['animacion para nin', 'animadora'] },
      { id: 'violinista', label: 'Violinista del Colón', claves: ['violinista', 'violin'] },
      { id: 'banda_cuerdas', label: 'Banda de cuerdas en vivo', claves: ['banda', 'cuerdas', 'musica en vivo'] },
      { id: 'actividades_ninos', label: 'Actividades para niños', claves: ['actividades'] },
      { id: 'sommelier', label: 'Degustación de vinos con sommelier', claves: ['cata', 'sommelier', 'degustacion'] },
      { id: 'juegos', label: 'Juegos de mesa para adultos', claves: ['juegos de mesa'] },
      { id: 'pintura', label: 'Pintar tazas, bolsas de tela, mates o individuales', claves: ['pintar'] },
      { id: 'jabones', label: 'Elaboración de jabones o sales de baño', claves: ['jabon', 'sales de ban'] },
    ],
  },

  {
    id: 'catering',
    titulo: 'Catering (todas las opciones incluyen recepción y mozos)',
    tipo: 'multiple',
    opciones: [
      // 'catering': el CTA/buscador que dice "catering" preselecciona la 1
      { id: 'op1', label: 'Opción 1 — Pizzas y empanadas', claves: ['pizza', 'muzza', 'empanada', 'catering'] },
      { id: 'op2', label: 'Opción 2 — Asado (vegana/vegetariana a consultar)', claves: ['asado', 'parrilla', 'chorizo', 'vacio'] },
      { id: 'op3', label: 'Opción 3 — Pernil, tacos y pastas', claves: ['pernil', 'taco', 'pasta', 'noquis', 'tuco'] },
      { id: 'op4', label: 'Opción 4 — Barcos de sushi', claves: ['sushi', 'barco de sushi', 'barcos de sushi'] },
      { id: 'op5', label: 'Opción 5 — Picadas', claves: ['picada', 'picadas', 'tablas'] },
      { id: 'op6', label: 'Opción 6 — Servicio de té', claves: ['servicio de te', 'merienda', 'sandwich', 'scon', 'medialuna'] },
      { id: 'op7', label: 'Opción 7 — Mesa dulce', claves: ['mesa dulce', 'panqueque'] },
      { id: 'op8', label: 'Opción 8 — Kids', claves: ['kids', 'infantil', 'pizzetas'] },
      
      // Al seleccionarlo aparece un campo de texto libre
      {
        id: 'otro_catering',
        label: 'Opción 9 — Personalizado',
        claves: [],
        conTexto: true,
        placeholder: 'Contanos qué comida te gustaría para tu evento',
      },
    ],
  },
  {
    id: 'barra',
    titulo: 'Barra',
    tipo: 'multiple',
    opciones: [
      // Ojo: "vino" NO es clave a propósito — "cata de vinos" es
      // animación, y no queremos pre-seleccionar barra por error
      { id: 'con_alcohol', label: 'Con alcohol (vinos, tragos; extra: champagne/sidra)', claves: ['con alcohol', 'gin', 'daiquiri', 'cuba', 'tinto verano', 'champagne', 'sidra'] },
      { id: 'sin_alcohol', label: 'Sin alcohol (licuados, limonada, pomelada, gaseosa, agua)', claves: ['sin alcohol', 'limonada', 'pomelada', 'licuado', 'gaseosa'] },
      { id: 'cerveza', label: 'Cerveza artesanal (extra)', claves: ['cerveza'] },
      { id: 'coffee', label: 'Coffee bar (barista incluido)', claves: ['coffee', 'barista', 'cafetera'] },
    ],
  },
  {
    id: 'extras',
    titulo: 'Extras infaltables',
    tipo: 'multiple',
    opciones: [
      { id: 'cheddar', label: 'Máquina cheddar (nachos incluidos)', claves: ['cheddar', 'nachos'] },
      { id: 'granita', label: 'Máquina granita (con o sin alcohol)', claves: ['granita'] },
      { id: 'pancho', label: 'Máquina de panchos (insumos incluidos)', claves: ['pancho'] },
      { id: 'pochoclo', label: 'Máquina pochoclos (insumos incluidos)', claves: ['pochoclo'] },
      { id: 'tortas', label: 'Tortas personalizadas', claves: ['torta personalizada', 'tortas personalizadas'] },
      { id: 'cascada', label: 'Cascada de chocolate', claves: ['cascada'] },
    ],
  },
];