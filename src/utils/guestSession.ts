// utils/guestSession.ts
export function getGuestId() {
  if (typeof window === 'undefined') return '';          // SSR safeguard

  let id = localStorage.getItem('guestId');
  if (!id) {
    id = crypto.randomUUID();                            // or uuidv4()
    localStorage.setItem('guestId', id);
  }
  return id;
}
