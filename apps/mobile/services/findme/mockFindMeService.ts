import { DIRECTORY, SEARCHES_PER_DAY } from '../../data/findme';
import { cleanPlate, isValidPlate, maskPlate } from '../../utils/plates';
import type { FindMeService } from './FindMeService';
import type { ConnectionRequest, FindMeEvent } from './types';

// A pretend backend for FindMe, so the whole feature works without a server.
// It keeps its own "server" state (searches used, blocked people, pending answers)
// and waits a little before answering, like a real network would.
const NETWORK_MS = 700;
const ANSWER_MS = 8000; // the other person "answers" your request after this
const VERIFY_MS = 5000; // checking your registration document takes this long

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

let searchesLeft = SEARCHES_PER_DAY;
let nextId = 0;
const blocked = new Set<string>();
const listeners = new Set<(event: FindMeEvent) => void>();
const emit = (event: FindMeEvent) => listeners.forEach((listener) => listener(event));

export const mockFindMeService: FindMeService = {
  async searchPlate(country, plate) {
    await wait(NETWORK_MS);
    if (!isValidPlate(country, plate)) return { status: 'invalid', searchesLeft };
    if (searchesLeft <= 0) return { status: 'limit', searchesLeft: 0 };
    searchesLeft -= 1;

    const clean = cleanPlate(plate);
    const entry = DIRECTORY.find(
      (item) =>
        item.country === country &&
        item.plate === clean &&
        item.discoverable &&
        item.verified &&
        !blocked.has(item.person.username),
    );
    if (!entry) return { status: 'notFound', searchesLeft };
    return {
      status: 'found',
      searchesLeft,
      driver: {
        username: entry.person.username,
        name: entry.person.name,
        photo: entry.person.photo,
        car: entry.car,
        maskedPlate: maskPlate(country, clean),
      },
    };
  },

  async sendRequest(driver, message) {
    await wait(NETWORK_MS);
    const request: ConnectionRequest = {
      id: `out-${nextId++}`,
      direction: 'outgoing',
      person: driver,
      message,
      minutesAgo: 0,
      status: 'pending',
    };
    const answer = DIRECTORY.find((item) => item.person.username === driver.username)?.answer;
    if (answer) {
      const accepted = answer === 'accept';
      const answered = () => emit({ type: 'requestAnswered', requestId: request.id, accepted });
      setTimeout(answered, ANSWER_MS);
    }
    return request;
  },

  async cancelRequest() {
    await wait(NETWORK_MS);
  },

  async respond() {
    await wait(NETWORK_MS);
  },

  async saveVehicle(vehicle) {
    await wait(NETWORK_MS);
    // Never discoverable until the plate is verified as yours.
    const verified = vehicle.verification === 'verified';
    return { ...vehicle, discoverable: verified && vehicle.discoverable };
  },

  async removeVehicle() {
    await wait(NETWORK_MS);
  },

  async submitVerification(vehicleId) {
    await wait(NETWORK_MS);
    setTimeout(() => emit({ type: 'vehicleVerified', vehicleId }), VERIFY_MS);
    return 'pending';
  },

  async block(username) {
    await wait(NETWORK_MS);
    blocked.add(username);
  },

  async report() {
    await wait(NETWORK_MS);
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
