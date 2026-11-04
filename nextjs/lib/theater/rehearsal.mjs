// A rehearsal: the whole system runs with stand-in replies instead of a model, so you can see the wiring (who speaks
// when, where the switch goes, when producers and observers act, what the log and dashboard look like) for free and
// without a key. Nothing here is a model's answer; every line says so.

const wait = (ms, signal) => new Promise((resolve, reject) => {
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener("abort", () => { clearTimeout(timer); reject(Object.assign(new Error("aborted"), { name: "AbortError" })); });
});

export function rehearsal() {
  let n = 0;
  return async ({ system, user, signal }) => {
    n++;
    await wait(120, signal);
    const me = system.match(/^You are ([^,]+),/)?.[1] || "someone";
    const others = (system.match(/## The others in the scene\n(.*)/)?.[1] || "").split(", ").filter((x) => x && x !== "nobody else");
    const tries = Number(user.match(/This is try (\d+)/)?.[1] || 0);
    let text;
    if (system.includes(", the judge in a system")) text = tries >= 3 ? "VERDICT: ACCEPT\nREASON: (rehearsal) the judge accepts on try 3." : "VERDICT: REJECT\nREASON: (rehearsal) the judge rejects this try.";
    else if (system.includes(", the router in a system")) {
      const branches = system.match(/BRANCH: <exactly one of: (.*)>/)?.[1]?.split(", ") || [];
      text = `BRANCH: ${branches[n % branches.length] || ""}\nREASON: (rehearsal) the router picks a branch in turn.`;
    } else if (system.includes("GUESS: <")) text = `GUESS: (rehearsal guess ${n})\n${system.includes("WHY: <") ? "WHY" : "SAY"}: (rehearsal) a stand-in guess, never the answer.`;
    else if (system.includes(", the branch in a system")) text = `(rehearsal) ${me} answers the input here.`;
    else if (system.includes(", the director in a system")) text = "GOAL: NOT YET\nREASON: (rehearsal) the director keeps the scene going.\nNOTE: (rehearsal) a note to the cast.";
    else if (system.includes(", the producer in a system")) {
      // Only what this producer may do (its ACTION: line lists it).
      const allowed = system.match(/ACTION: (.*)/)?.[1]?.split(" | ") || ["none"];
      const action = allowed[n % allowed.length];
      text = action === "none" ? "ACTION: none" : `ACTION: ${action}\nTEXT: (rehearsal) the producer's ${action} would be announced here.`;
    }
    else if (system.includes(", the observer in a system")) text = `(rehearsal) ${me}'s notes on the run would go here.`;
    else if (user.includes("VOTE:")) text = `VOTE: ${others[n % Math.max(1, others.length)] || ""}\nWHY: (rehearsal) a private vote.`;
    else {
      const label = system.match(/\n([A-Z]{2,12}): <(?:optional: a private|your private)/)?.[1];
      text = `TO: ${others.length ? others[n % others.length] : "everyone"}\nSAY: (rehearsal) ${me} speaks, call ${n}.${label ? `\n${label}: (rehearsal) ${me}'s private ${label === "ITM" ? "ITM" : "aside"}.` : ""}`;
    }
    return { text, tokens: { in: Math.round((system.length + user.length) / 4), out: Math.round(text.length / 4) }, cost: 0, model: "rehearsal" };
  };
}
