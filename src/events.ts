export function addEventListeners(
  target: EventTarget,
  listeners: Record<string, Function>
) {
  for (const [eventName, listener] of Object.entries(listeners)) {
    target.addEventListener(eventName, listener as any);
  }
}

export function removeEventListeners(
  target: EventTarget,
  listeners: Record<string, Function>
) {
  for (const [eventName, listener] of Object.entries(listeners)) {
    target.removeEventListener(eventName, listener as any);
  }
}
