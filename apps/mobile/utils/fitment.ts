import type { GarageCar } from '../data/garage';
import type { Fitment } from '../services/marketplace/types';

// Does a part fit this car? Matches the model code ("E46", "F82", "RS6") in the car's
// name ("BMW E46 330Ci").
export const fitsCar = (fit: Fitment, car: GarageCar) =>
  car.model.toUpperCase().includes(fit.model.toUpperCase()) &&
  car.model.toUpperCase().includes(fit.brand.toUpperCase());

