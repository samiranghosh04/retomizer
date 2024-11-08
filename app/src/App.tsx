import { atom, useAtom, useAtomValue } from 'retomizer';

const salaryAtom = atom(50000);
const taxAtom = atom(10000);
const netSalaryAtom = atom((get) => get(salaryAtom) - get(taxAtom));
const dataAtom = atom((get) =>  fetch('/fakedata.json').then(res => res.json()));
const keysAtom = atom((get) => Object.keys(get(dataAtom) ?? {}));

function SalaryDisplay() {
  const [salary] = useAtom(salaryAtom);
  return <div>Current salary from SalaryDisplay: {salary}</div>
}
function AtomValue() {
  const salary = useAtomValue(salaryAtom);
  return <div>Current salary from SalaryDisplay using useAtomValue: {salary}</div>
}

function App() {
  const [salary, setSalary] = useAtom(salaryAtom);
  const [tax, setTax] = useAtom(taxAtom);
  const data = useAtomValue(dataAtom);
  const keys = useAtomValue(keysAtom);
  return (
    <>
      <div>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.valueAsNumber)} />
      </div>
      <div>
        <input type="number" value={tax} onChange={(e) => setTax(e.target.valueAsNumber)} />
      </div>
      <div>
        Current salary: {salary}
        Tax : {tax}
        Net Pay: {useAtomValue(netSalaryAtom)}
        <SalaryDisplay/>
        <AtomValue/>
        <div>Data fetched from API: {JSON.stringify(data)}</div>
        <div>Keys from API data: {JSON.stringify(keys)}</div>
      </div>
    </>
  )
}

export default App
