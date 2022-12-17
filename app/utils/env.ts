import type { AppLoadContext } from "@remix-run/server-runtime";

// Make known environment variables typed, makes them more discoverable and hopefully prevents typo errors
// They are defined as undefined or string, as they might not just be undefined
// it's the responsiblity of the code using it to assert that it's set.
// We could assert it in parsing code below, but then we break unrelated code if a single key is missing.
interface Env {
  DAYSOFF_EMAIL?: string;
  DAYSOFF_PASSWORD?: string;
}

export const getAuth = (context: AppLoadContext) => ({
  email: getEnvVariableOrThrow("DAYSOFF_EMAIL", context),
  password: getEnvVariableOrThrow("DAYSOFF_PASSWORD", context),
});

export const getEnv = (context: AppLoadContext) => {
  let env = {} as Partial<Record<string, unknown>>;
  if (typeof process !== "undefined") {
    env = { ...env, ...process.env };
  }
  if (context) {
    env = { ...env, ...context };
  }
  return env as Env;
};

export const getEnvVariableOrThrow = (
  key: keyof Env,
  context: AppLoadContext,
) => {
  const value = getEnv(context)[key];
  if (!value) {
    throw new Response(`${key} needs to be set`, {
      status: 500,
    });
  }
  return value;
};
