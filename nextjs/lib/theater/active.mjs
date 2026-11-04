// Runs in progress on this machine, so the Stop button can reach a run by its id. One dev server, one map.
const active = globalThis.__theaterRuns || (globalThis.__theaterRuns = new Map());
export default active;
