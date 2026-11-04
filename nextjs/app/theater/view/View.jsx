"use client";

import { useState } from "react";
import Dashboard from "../Dashboard.jsx";
import { parseLog } from "../derive.mjs";
import styles from "../theater.module.css";

export default function View() {
  const [events, setEvents] = useState([]);
  const [over, setOver] = useState(false);
  const [name, setName] = useState("");
  const read = async (file) => {
    if (!file) return;
    setName(file.name);
    setEvents(parseLog(await file.text()));
  };
  return (
    <div className={styles.theater}>
      <label className={`${styles.drop} ${styles.noPrint}`} data-over={over} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); read(e.dataTransfer.files[0]); }}>
        <span>{name ? `${name}: ${events.length} events. Drop another to replace it.` : "Drop a .jsonl log here, or click to choose one."}</span>
        <input type="file" accept=".jsonl,.ndjson,.txt,application/x-ndjson" hidden onChange={(e) => read(e.target.files[0])} />
      </label>
      <Dashboard events={events} />
    </div>
  );
}
