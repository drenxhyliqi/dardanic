// The shapes FindMe works with. The same types will describe the real backend's data,
// so screens don't change when the mock service is replaced.
import type { CountryCode } from '../../data/plateCountries';
import type { VehicleColorId } from '../../data/vehicleColors';

export type Verification = 'unverified' | 'pending' | 'verified';

// One of your vehicles. `plate` is private: it's never sent to other people.
export type Vehicle = {
  id: string;
  country: CountryCode;
  plate: string; // clean ("01245KA")
  make: string;
  model: string;
  color: VehicleColorId;
  discoverable: boolean; // can be found by plate (only once verified)
  verification: Verification;
};

// What others may see about a driver they found: no bio, city or full plate.
export type Driver = {
  username: string;
  name: string;
  photo: string | null;
  car: string; // "White Nissan GT-R"
  maskedPlate: string; // "05-•••-EH"
};

export type PlateSearchResult =
  | { status: 'found'; driver: Driver; searchesLeft: number }
  | { status: 'notFound'; searchesLeft: number } // also when they haven't opted in
  | { status: 'invalid'; searchesLeft: number }
  | { status: 'limit'; searchesLeft: 0 };

export type RequestStatus = 'pending' | 'accepted' | 'declined';

export type ConnectionRequest = {
  id: string;
  direction: 'incoming' | 'outgoing';
  person: Driver;
  message?: string;
  minutesAgo: number;
  status: RequestStatus;
};

export type FindMeNotification = {
  id: string;
  kind: 'request' | 'accepted' | 'declined' | 'verified';
  person?: Driver; // who it's about (not for "your vehicle is verified")
  vehicleId?: string;
  minutesAgo: number;
  read: boolean;
};

export type WhoCanRequest = 'everyone' | 'mutuals';

export type FindMeSettings = {
  discovery: boolean; // main switch: off hides all your vehicles at once
  whoCanRequest: WhoCanRequest;
};

// Things the "server" tells the app on its own (later: Supabase Realtime).
export type FindMeEvent =
  | { type: 'requestAnswered'; requestId: string; accepted: boolean }
  | { type: 'vehicleVerified'; vehicleId: string };
