import { redirect } from "next/navigation";

// Runs are called Sessions now (Marlon, Nov 4); the old address still works.
export default async function OldRun({ params }) {
  const { id } = await params;
  redirect(`/systems/sessions/${id}`);
}
