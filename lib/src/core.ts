import { useSyncExternalStore } from "react";
interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: () => void) => () => void;
}
type AtomGetter<AtomType> = (get: <Target>(a: Atom<Target>) => Target) => AtomType;
export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> {
  let value = typeof initialValue === 'function' ? (null as AtomType) : initialValue;
  const subscribers = new Set<() => void>();
  const get: <Target>(a: Atom<Target>) => Target = (targetAtom) => {
    const currentValue = targetAtom.get();
    if (!computedAtoms.has(targetAtom)) {
      const unsubscribe = targetAtom.subscribe(computeValue);
      computedAtoms.set(targetAtom, unsubscribe);
    }
    return currentValue;
  };
  const computeValue = () => {
    const newValue = typeof initialValue === 'function'
      ? (initialValue as AtomGetter<AtomType>)(get)
      : value;
    if (newValue && typeof (newValue as any).then === "function") {
      (newValue as any as Promise<AtomType>).then((resolvedValue) => {
        value = resolvedValue;
        notifySubscribers();
      }).catch((error) => {
        console.error("Error in async atom:", error);
      });
    } else {
      value = newValue;
      notifySubscribers();
    }
  };
  const notifySubscribers = () => {
    for (const callback of subscribers) callback();
  };
  const cleanupDerivedSubscriptions = () => {
    for (const [atom, unsubscribe] of computedAtoms.entries()) {
      unsubscribe();
      computedAtoms.delete(atom);
    }
  };
  const computedAtoms = new Map<Atom<any>, () => void>();
  computeValue();
  return {
    get: () => value,
    set: (newValue) => {
      if (newValue !== value) {
        value = newValue;
        cleanupDerivedSubscriptions();
        notifySubscribers();
      }
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }
  };
}
export function useAtom<AtomType>(atom: Atom<AtomType>) {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
}
export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return useSyncExternalStore(atom.subscribe, atom.get);
}