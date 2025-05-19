import React, { useState, useEffect } from 'react';

const moduli = ["Mod 5A", "Mod 5B", "Mod 02A", "Mod 02B", "Mod 04B", "Mod 7A", "Mod 7B", "Mod 8A"];
const operatori = ["Bruno", "Palilla", "Monaco", "Manca", "Gambino", "Zabatino", "Parodi", "Costanzo", "Palazzo"];

export default function App() {
  const [assegnazioni, setAssegnazioni] = useState({});
  const [log, setLog] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLog((prevLog) => {
        const now = new Date().toISOString();
        const updates = Object.entries(assegnazioni).map(([op, mod]) => ({
          time: now,
          operatore: op,
          modulo: mod
        }));
        return [...prevLog, ...updates];
      });
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [assegnazioni]);

  const handleAssign = (operatore, modulo) => {
    setAssegnazioni({ ...assegnazioni, [operatore]: modulo });
  };

  const generateReport = () => {
    const report = {};
    log.forEach(({ operatore, modulo }) => {
      if (!report[operatore]) report[operatore] = {};
      if (!report[operatore][modulo]) report[operatore][modulo] = 0;
      report[operatore][modulo] += 1;
    });
    console.log("Report:", report);
    alert("Report generato in console");
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <div style={{ flex: 3 }}>
        <h2>Mappa Moduli</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {moduli.map((modulo) => (
            <div key={modulo} style={{ border: '1px solid black', padding: '0.5rem', minHeight: '80px' }}>
              <strong>{modulo}</strong>
              <div>
                {operatori.map(
                  (op) => assegnazioni[op] === modulo && <div key={op}>{op}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Operatori</h2>
        {operatori.map((op) => (
          <div key={op} style={{ marginBottom: '0.5rem' }}>
            <span>{op}</span>
            <select
              value={assegnazioni[op] || ''}
              onChange={(e) => handleAssign(op, e.target.value)}
              style={{ marginLeft: '1rem' }}
            >
              <option value="">--</option>
              {moduli.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button onClick={generateReport} style={{ marginTop: '1rem' }}>
          Genera Report Console
        </button>
      </div>
    </div>
  );
}