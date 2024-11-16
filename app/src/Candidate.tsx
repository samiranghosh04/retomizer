// Candidate.tsx
import React, { useEffect } from 'react';
import { atom, useAtom, useAtomValue } from './lib';

// Define atoms for testing

// 1. Simple Counter Atom
const counterAtom = atom(0);

// 2. Async Data Atom - Simulates an async fetch
const asyncDataAtom = atom(async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Fetched Async Data"), 2000);
  });
});

// 3. Derived Atom - Doubles the counter value
const doubledCounterAtom = atom((get) => get(counterAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function AsyncData() {
  const asyncData = useAtomValue(asyncDataAtom);

  return (
    <div>
      <h2>Async Data: {asyncData || "Loading..."}</h2>
    </div>
  );
}

function DerivedCounter() {
  const doubledCounter = useAtomValue(doubledCounterAtom);

  return (
    <div>
      <h2>Doubled Counter: {doubledCounter}</h2>
    </div>
  );
}

function Candidate() {
  useEffect(() => {
    console.log("Candidate component loaded, testing atom system.");
  }, []);

  return (
    <div>
      <h1>Testing Atom System with Candidate Component</h1>
      <Counter />
      <DerivedCounter />
      <AsyncData />
    </div>
  );
}

export default Candidate;
