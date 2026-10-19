export const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Tiago Gago Luthier',
  description: 'Luthier artesanal em Cascais especializado em construção, reparação e set up de instrumentos de corda.',
  url: 'https://tiagogagoluthier.pt',
  telephone: '+351XXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cascais',
    addressRegion: 'Lisboa',
    addressCountry: 'PT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '38.6979',
    longitude: '-9.4215',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '€€',
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '38.6979',
      longitude: '-9.4215',
    },
    geoRadius: '50000',
  },
  sameAs: ['https://instagram.com/tiagogagoluthier', 'https://facebook.com/tiagogagoluthier'],
}
