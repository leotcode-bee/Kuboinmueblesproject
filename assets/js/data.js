// Base de datos de fraccionamientos de KUBO Inmuebles
const developments = [
  {
    id: 'el-paraje',
    name: 'El Paraje',
    badge: 'Disponible',
    badgeClass: 'bg-emerald-600 text-white',
    location: 'Valle del Naranjo',
    price: 185000,
    priceLabel: '$185,000',
    size: 200,
    sizeLabel: 'Desde 200 m²',
    image: 'assets/img/fondo-2.jpg',
    logo: 'assets/img/fracc-el-paraje.jpg',
    coords: [20.465861, -103.810750],
    description: 'Ubicado en el corazón de Valle del Naranjo, con accesos rápidos, excelente proyección urbana y plusvalía garantizada.',
    amenities: [
      'Acceso pavimentado',
      'Agua y electricidad a pie de lote',
      'Seguridad y control perimetral',
      'Áreas verdes y recreativas'
    ],
    mapPin: {
      top: '28%',
      left: '24%'
    }
  },
  {
    id: 'los-sauces',
    name: 'Los Sauces',
    badge: 'Disponible',
    badgeClass: 'bg-emerald-600 text-white',
    location: 'Zona Lago',
    price: 210000,
    priceLabel: '$210,000',
    size: 180,
    sizeLabel: 'Desde 180 m²',
    image: 'assets/img/fondo-4.png',
    logo: 'assets/img/fracc-los-sauces.jpg',
    coords: [20.446778, -103.808583],
    description: 'Entorno natural privilegiado con vista panorámica a la laguna, aire puro y ambiente diseñado para el descanso.',
    amenities: [
      'Vista panorámica al lago',
      'Circuito para correr y caminata',
      'Alumbrado con celdas solares',
      'Portón de acceso controlado'
    ],
    mapPin: {
      top: '64%',
      left: '48%'
    }
  },
  {
    id: 'los-mezquites',
    name: 'Los Mezquites',
    badge: 'Disponible',
    badgeClass: 'bg-emerald-600 text-white',
    location: 'Carretera Federal',
    price: 165000,
    priceLabel: '$165,000',
    size: 160,
    sizeLabel: 'Desde 160 m²',
    image: 'assets/img/fondo-casa.png',
    logo: 'assets/img/fracc-los-mezquites.jpg',
    coords: [20.341889, -103.666639],
    description: 'Ubicación privilegiada con acceso inmediato a vialidades principales, transporte accesible y entorno en constante desarrollo.',
    amenities: [
      'Acceso pavimentado directo',
      'Red de agua y electrificación',
      'Vigilancia 24/7',
      'Parque central y áreas infantiles'
    ],
    mapPin: {
      top: '32%',
      left: '68%'
    }
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    badge: 'Disponible',
    badgeClass: 'bg-emerald-600 text-white',
    location: 'Zona Sur',
    price: 195000,
    priceLabel: '$195,000',
    size: 200,
    sizeLabel: 'Desde 200 m²',
    image: 'assets/img/fondo-5.jpg',
    logo: 'assets/img/fracc-san-francisco.jpg',
    coords: [20.340611, -103.668806],
    description: 'Nuevo desarrollo residencial campestre pensado para familias que buscan tranquilidad, amplitud y fácil conexión con la ciudad.',
    amenities: [
      'Lotes planos listos para construir',
      'Instalaciones subterráneas',
      'Canchas de usos múltiples',
      'Barda perimetral electrificada'
    ],
    mapPin: {
      top: '76%',
      left: '32%'
    }
  },
  {
    id: 'las-palmas',
    name: 'Las Palmas',
    badge: 'Disponible',
    badgeClass: 'bg-emerald-600 text-white',
    location: 'Zona Premium',
    price: 240000,
    priceLabel: '$240,000',
    size: 250,
    sizeLabel: 'Desde 250 m²',
    image: 'assets/img/fondo-3.jpg',
    logo: 'assets/img/fracc-las-palmas.jpg',
    coords: [20.465917, -103.810944],
    description: 'El fraccionamiento más exclusivo del grupo. Lotes de amplias dimensiones con amenidades de primer nivel y alta plusvalía.',
    amenities: [
      'Casa club y alberca recreativa',
      'Calles adoquinadas de 12 metros',
      'Acceso con control biométrico',
      'Canchas de pádel'
    ],
    mapPin: {
      top: '72%',
      left: '74%'
    }
  }
];