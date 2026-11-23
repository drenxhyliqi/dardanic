// Where places are (latitude, longitude), for "Near you" distances. Kosovo's main
// cities plus spots people meet at. Cities not listed (e.g. Munich, Zürich) are
// treated as far away.
export const PLACES: Record<string, { lat: number; lon: number }> = {
  Prishtina: { lat: 42.6629, lon: 21.1655 },
  Germia: { lat: 42.68, lon: 21.21 },
  Prizren: { lat: 42.2139, lon: 20.7397 },
  Peja: { lat: 42.6591, lon: 20.2883 },
  Pejë: { lat: 42.6591, lon: 20.2883 },
  Gjakova: { lat: 42.3803, lon: 20.4308 },
  Ferizaj: { lat: 42.3706, lon: 21.1553 },
  Gjilan: { lat: 42.4635, lon: 21.4694 },
  Mitrovica: { lat: 42.8914, lon: 20.866 },
};
