# The Divine Villa

An advanced remix of [The Villa](../05-the-villa/). Eight Greek gods are contestants on *Fall from Olympus*, a modern reality show in the spirit of *The Traitors*. Three of them are secretly traitors. An invented adaptation, not the TV show or a retelling of myth.

## The cast

Roles are marked here for you. The players never see this table.

| Player | Role (hidden from the other players) |
|---|---|
| Zeus | faithful |
| Hera | **traitor** |
| Athena | faithful |
| Hermes | **traitor** |
| Aphrodite | faithful |
| Ares | **traitor** |
| Apollo | faithful |
| Artemis | faithful |

Each god's file in `cast/` describes who they are, never their role. The role comes from the `role:` field, and the engine adds the matching briefing from `roles/`.

## The producers

Two fictional human producers, in `producers/`:

- **Dana Kowalski, Story Producer** (round 1): sets a challenge or a twist, or does nothing. She arranges conditions; she does not script lines.
- **Rob Halloran, Host** (round 2): opens the round table. Every player votes in private; the most votes is banished; a tie banishes nobody; the game reveals the banished player's true role.

Neither can eliminate anyone, invent votes, change roles, or hint at roles.

## Who sees what

- **Contestants** see the public scenario (`system.md`), their own file, their own role briefing (traitors also get the other traitors' names), the public scene, and their own ITMs and votes. Never another player's ITM, file, or role.
- **Producers and the Control Room Log** see the control room: everything, including true roles.
- **The run log and dashboard** are omniscient, for the teacher and the audience. Nothing there flows back into the villa.

The interesting part is the gap: a traitor's public line beside their honest ITM, and a faithful player guessing in the dark.

## Limits

Three rounds and one round table. This is a small demonstration of hidden information in a multi-agent system, not a simulation of a TV season. Models may slip (a traitor might confess by the pool, a faithful player might "know" too much), and the log will show it.

## How to run it

Pick **The Divine Villa** in the Theater. **Rehearse** to see the flow with free stand-in lines, or **Run it** to call the model, within the cost ceiling ($1.50) and with Stop always available.
