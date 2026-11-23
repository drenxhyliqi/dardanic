// Car paint colours you can pick for your vehicle. Their swatch colours live in the
// theme (colors.vehicleSwatches, the same in both themes, since they're the car's
// real colour).
export type VehicleColorId =
  | 'white' | 'black' | 'grey' | 'silver' | 'blue' | 'red' | 'yellow' | 'green' | 'orange';

export type VehicleColor = { id: VehicleColorId; name: string };

export const VEHICLE_COLORS: VehicleColor[] = [
  { id: 'white', name: 'White' },
  { id: 'black', name: 'Black' },
  { id: 'grey', name: 'Grey' },
  { id: 'silver', name: 'Silver' },
  { id: 'blue', name: 'Blue' },
  { id: 'red', name: 'Red' },
  { id: 'yellow', name: 'Yellow' },
  { id: 'green', name: 'Green' },
  { id: 'orange', name: 'Orange' },
];

export const colorById = (id: VehicleColorId): VehicleColor =>
  VEHICLE_COLORS.find((color) => color.id === id) ?? VEHICLE_COLORS[0];
