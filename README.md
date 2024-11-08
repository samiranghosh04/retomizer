# **Retomizer - A React State Management Library**

## **Overview**
This library provides lightweight state management through `Atom` objects, inspired by libraries like Recoil and Jotai. It supports synchronous and asynchronous values and allows you to create and manage simple, isolated states or computed states with dependencies on other atoms.

### Key Components:
1. `atom`: Creates an `Atom` object that holds a piece of state.
2. `useAtom`: React hook for accessing and updating an atom's value.
3. `useAtomValue`: React hook for reading an atom's value without exposing the setter function.

---

## **Getting Started**

### **Installation**
1. Install the library in your project.
2. Install `react` and `react-dom` as peer dependencies if they aren't already included.

### **Usage Example**

```javascript
import { atom, useAtom, useAtomValue } from "retomizer";

// Define atoms
const countAtom = atom(0);
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Use atoms in components
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## **API Reference**

### 1. **`atom`**
Creates an `Atom` object that holds a piece of state or a computed state.

#### **Signature**
```typescript
function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType>;
```

#### **Parameters**
- `initialValue`: 
  - Can be a direct value or a function.
  - If it’s a function (an `AtomGetter`), it defines a computed state based on other atoms.

#### **Returns**
An `Atom` object that provides:
- `get`: Returns the current value of the atom.
- `set`: Updates the atom's value.
- `subscribe`: Allows subscribers to listen for changes to the atom's value.

---

### 2. **`useAtom`**
A React hook for accessing and updating an atom's value.

#### **Signature**
```typescript
function useAtom<AtomType>(atom: Atom<AtomType>): [AtomType, (newValue: AtomType) => void];
```

#### **Parameters**
- `atom`: The `Atom` object whose value you want to access and modify.

#### **Returns**
A tuple `[value, setValue]`:
- `value`: The current value of the atom.
- `setValue`: A function to update the atom's value.

#### **Example**
```javascript
const [count, setCount] = useAtom(countAtom);
```

---

### 3. **`useAtomValue`**
A React hook for accessing an atom’s value without exposing its setter.

#### **Signature**
```typescript
function useAtomValue<AtomType>(atom: Atom<AtomType>): AtomType;
```

#### **Parameters**
- `atom`: The `Atom` object whose value you want to read.

#### **Returns**
- `value`: The current value of the atom.

#### **Example**
```javascript
const doubleCount = useAtomValue(doubleCountAtom);
```

---

## **Core Concepts**

### **Atoms**
Atoms are units of state that:
- Can hold either a direct value (like `atom(0)`) or computed value (like `atom((get) => get(otherAtom) * 2)`).
- Notify subscribers when they are updated.
- Support asynchronous values (e.g., promises).

### **Computed Atoms**
Computed atoms derive their value from other atoms:
- They’re defined with a function that accepts a `get` parameter, which retrieves the current values of other atoms.
- Automatically re-compute and update when dependencies change.

### **Asynchronous State**
If a computed atom returns a promise, the library handles it by:
- Setting the atom’s value to `null` until the promise resolves.
- Updating the atom’s value with the resolved data and notifying subscribers.

---

## **Detailed Breakdown of the Core Library**

### **Atom Interface**
```typescript
interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: () => void) => () => void;
}
```

### **Creating an Atom**
The `atom` function defines a state container that holds an initial value or computed state:
- **Direct Values**: Simply stores the provided value.
- **Computed Values**: Uses the `get` function to access values of dependent atoms and updates based on those dependencies.

### **Internal Functions**

1. **`computeValue`**
   - Handles the computation and updating of an atom’s value.
   - Detects if a new computed value is asynchronous (i.e., a promise) and updates the atom when it resolves.

2. **`notifySubscribers`**
   - Loops through each subscribed function and calls them to re-render components that use this atom.

3. **`cleanupDerivedSubscriptions`**
   - Unsubscribes from dependent atoms when an atom's value is manually set.
   - This prevents unnecessary reactivity and avoids memory leaks.

4. **`computedAtoms`**
   - Keeps track of dependent atoms and their subscriptions, helping maintain accurate and efficient reactivity.

### **Example Workflow**

1. **Define an Atom**
   ```typescript
   const counterAtom = atom(0);
   ```
   Initializes `counterAtom` with an initial value of 0.

2. **Subscribe to an Atom**
   Components using `useAtom(counterAtom)` or `useAtomValue(counterAtom)` will automatically subscribe to changes, re-rendering when the atom updates.

3. **Update the Atom**
   Using `setCounter` from `useAtom`, you can update the atom's value. Subscribers are notified, and any computed atoms that depend on `counterAtom` will re-compute.

---

## **Error Handling**

- The library includes error handling for async atoms, logging any errors that occur during promise resolution for easier debugging.

---

## **Performance Considerations**

This library optimizes performance through:
1. **Minimal Re-Renders**: Only components that use an atom are notified of changes.
2. **Efficient Computation Management**: Automatically tracks and cleans up subscriptions to computed atoms, avoiding memory leaks.
3. **Optimized Reactivity**: Reduces unnecessary reactivity by unsubscribing when computed values are no longer in use.

---

## **Best Practices**

- Use `useAtom` when you need both read and write access.
- Use `useAtomValue` if you only need to read the atom’s value to minimize the risk of accidental writes.
- For complex computed atoms, try to avoid deep chains of dependencies, as they can become challenging to debug and may impact performance.

---

This library provides a straightforward and efficient way to manage state in React, ideal for applications where lightweight, reactive state management is essential. With careful design to avoid memory leaks, promote asynchronous state handling, and maintain reactivity efficiency, this library can serve as a robust alternative to tools like Jotai and Recoil in production environments.