export class OmdbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OmdbError";
  }
}

const OMDB_URL = "https://www.omdbapi.com/";

function readApiKey(): string {
  const key = process.env.OMDB_API_KEY;
  if (!key) {
    throw new OmdbError("OMDB_API_KEY is not set.");
  }
  return key;
}

export async function fetchOmdb(
  params: Record<string, string>,
): Promise<unknown> {
  const url = new URL(OMDB_URL);
  url.searchParams.set("apikey", readApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    throw new OmdbError("OMDb could not be reached.");
  }

  if (!response.ok) {
    throw new OmdbError(`OMDb request failed (${response.status}).`);
  }

  try {
    return await response.json();
  } catch {
    throw new OmdbError("OMDb returned a response that was not JSON.");
  }
}
