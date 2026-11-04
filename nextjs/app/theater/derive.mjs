// What the dashboard shows, worked out from a run's events alone, so it reads any log: one just streamed, one saved
// in runs/, or one dropped onto /theater/view. Pure: the page and the tests use it.

export function parseLog(text) {
  return String(text).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

export function summarize(events = []) {
  const start = events.find((e) => e.kind === "start");
  const stop = [...events].reverse().find((e) => e.kind === "stop") || null;
  const meta = start?.state || {};
  const speakers = [];
  const addressed = {};
  const bySpeaker = {};
  let cost = 0;
  let tokensIn = 0;
  let tokensOut = 0;
  const costSeries = [];
  for (const e of events) {
    cost += e.cost || 0;
    tokensIn += e.tokens?.in || 0;
    tokensOut += e.tokens?.out || 0;
    if (e.cost) costSeries.push({ seq: e.seq, cost });
    if (!e.speaker || e.layer === "system") continue;
    if (!speakers.includes(e.speaker)) speakers.push(e.speaker);
    (bySpeaker[e.speaker] ||= { layer: e.layer, count: 0, cost: 0 }).count++;
    bySpeaker[e.speaker].cost += e.cost || 0;
    if (e.kind === "line" && e.to) {
      for (const to of e.to) {
        (addressed[e.speaker] ||= {})[to] = (addressed[e.speaker]?.[to] || 0) + 1;
      }
    }
  }
  const targets = [...new Set(Object.values(addressed).flatMap((row) => Object.keys(row)))];
  const castNames = meta.cast || speakers.filter((s) => bySpeaker[s].layer === "cast");
  const columns = [...castNames.filter((n) => targets.includes(n)), ...targets.filter((t) => !castNames.includes(t))];
  const rounds = Math.max(0, ...events.map((e) => e.round || 0));
  return {
    meta,
    stop,
    running: !stop,
    speakers,
    bySpeaker,
    addressed,
    columns,
    rounds,
    cost,
    tokens: { in: tokensIn, out: tokensOut },
    costSeries,
    calls: events.filter((e) => e.cost !== null && e.cost !== undefined).length,
    observations: events.filter((e) => e.kind === "observation"),
    verdicts: events.filter((e) => e.kind === "verdict"),
    route: events.find((e) => e.kind === "route") || null,
    eliminated: events.filter((e) => e.kind === "eliminate").map((e) => e.state?.eliminated).filter(Boolean),
    speeches: events.filter((e) => e.kind === "line").length,
  };
}

// The script as Markdown, for printing or pasting: public lines as dialogue, asides and votes in brackets, the rest
// as stage directions.
export function scriptMarkdown(events = []) {
  const s = summarize(events);
  const out = [`# ${s.meta.title || "A run"}`, "", `Run \`${events[0]?.run || ""}\` · ${s.meta.kind || ""} · ${s.meta.config?.model || ""} · $${s.cost.toFixed(4)} · ${s.calls} calls`, ""];
  let round = null;
  for (const e of events) {
    if (e.round && e.round !== round && e.kind !== "observation") {
      round = e.round;
      out.push(`## ${s.meta.kind === "loop" ? "Try" : "Round"} ${round}`, "");
    }
    const to = e.to && !e.to.includes("everyone") ? ` (to ${e.to.join(", ")})` : "";
    if (e.kind === "start") out.push(`*${e.text}*`, "");
    else if (e.kind === "input") out.push(`**Input:** ${e.text}`, "");
    else if (e.kind === "line") out.push(`**${e.speaker.toUpperCase()}**${to}: ${e.text}`, "");
    else if (e.kind === "aside") out.push(`> *${e.speaker}, ${e.state?.label === "ITM" ? "ITM (private)" : "aside"}:* ${e.text}`, "");
    else if (e.kind === "vote") out.push(`> *${e.speaker} votes for ${e.state?.target || "nobody"}:* ${e.text}`, "");
    else if (e.kind === "verdict") out.push(`**[${e.speaker}: ${e.state?.accept ? "ACCEPT" : "REJECT"}]** ${e.text}`, "");
    else if (e.kind === "route") out.push(`**[${e.speaker} routes to ${e.state?.branch}]** ${e.text}`, "");
    else if (e.kind === "reply") out.push(`**${e.speaker.toUpperCase()}:** ${e.text}`, "");
    else if (e.kind === "goal") out.push(`*[${e.speaker}: ${e.state?.reached ? "goal reached" : "not yet"}. ${e.text}]*`, "");
    else if (e.kind === "observation") out.push(`### ${e.speaker} observes${e.round ? ` (after round ${e.round})` : ""}`, "", e.text, "");
    else if (e.kind === "stop") out.push("---", "", `*Stopped: ${e.text}.*`, "");
    else if (e.text) out.push(`*[${e.speaker ? `${e.speaker}: ` : ""}${e.kind}] ${e.text}*`, "");
  }
  return out.join("\n");
}
