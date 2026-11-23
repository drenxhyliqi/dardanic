import type { CountryCode } from '../../data/plateCountries';
import type {
  ConnectionRequest,
  Driver,
  FindMeEvent,
  PlateSearchResult,
  Vehicle,
  Verification,
} from './types';

// Everything FindMe can ask the backend to do. Screens never call this directly;
// FindMeContext does. Today it's backed by a mock (mockFindMeService); later a
// Supabase version implements the same list and nothing else changes.
export interface FindMeService {
  // Look a plate up. Only verified, opted-in, non-blocked drivers can be found;
  // everything else looks the same as "not found". Limited per day.
  searchPlate(country: CountryCode, plate: string): Promise<PlateSearchResult>;

  sendRequest(driver: Driver, message?: string): Promise<ConnectionRequest>;
  cancelRequest(requestId: string): Promise<void>;
  respond(requestId: string, accept: boolean): Promise<void>;

  saveVehicle(vehicle: Vehicle): Promise<Vehicle>;
  removeVehicle(vehicleId: string): Promise<void>;
  // Sends a photo of the registration document to prove the car is yours.
  submitVerification(vehicleId: string, photo: string): Promise<Verification>;

  block(username: string): Promise<void>;
  report(username: string): Promise<void>;

  // Hear about things that happen on the other side (answers, verification).
  subscribe(listener: (event: FindMeEvent) => void): () => void;
}
