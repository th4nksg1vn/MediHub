export type TriageInput = {
  symptoms: string;
  duration?: string;
  vitals?: Record<string, unknown>;
};

export async function triage(input: TriageInput) {
  const url = (process.env.NEXT_PUBLIC_PREDICT_API_URL || ":") + "/triage";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Predict API error: ${res.status}`);
  }
  return await res.json();
}
