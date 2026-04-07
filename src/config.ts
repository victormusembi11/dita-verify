/**
 * Configuration for the Daystar Verify package.
 * This includes settings such as the base URL for the Daystar Portal API.
 * The base URL can be set via the environment variable `DAYSTAR_PORTAL_URL`.
 * If the environment variable is not set, it defaults to an empty string.
 */
export const config = {
  get baseUrl() {
    return process.env.DAYSTAR_PORTAL_URL ?? "";
  },
};
