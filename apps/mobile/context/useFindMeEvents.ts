import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

import {
  findMeService as service,
  type ConnectionRequest,
  type FindMeNotification,
  type Vehicle,
} from '../services/findme';

type Note = Omit<FindMeNotification, 'id' | 'minutesAgo' | 'read'>;

type Options = {
  requests: ConnectionRequest[];
  setRequests: Dispatch<SetStateAction<ConnectionRequest[]>>;
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
  notify: (note: Note) => void;
};

// Listens for what happens on the other side (later: Supabase Realtime): someone
// answered your request, or your vehicle got verified. Updates the state and adds a
// notification for each.
export function useFindMeEvents({ requests, setRequests, setVehicles, notify }: Options) {
  const latestRequests = useRef(requests);
  useEffect(() => {
    latestRequests.current = requests;
  }, [requests]);

  useEffect(
    () =>
      service.subscribe((event) => {
        if (event.type === 'requestAnswered') {
          const request = latestRequests.current.find((item) => item.id === event.requestId);
          if (!request) return; // cancelled meanwhile
          const status = event.accepted ? 'accepted' : 'declined';
          notify({ kind: status, person: request.person });
          setRequests((list) =>
            list.map((item) => (item.id === request.id ? { ...item, status } : item)),
          );
        } else {
          setVehicles((list) =>
            list.map((v) => (v.id === event.vehicleId ? { ...v, verification: 'verified' } : v)),
          );
          notify({ kind: 'verified', vehicleId: event.vehicleId });
        }
      }),
    [notify, setRequests, setVehicles],
  );
}
