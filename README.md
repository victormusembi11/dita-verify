# dita-verify

Verify that a student exists at Daystar University by authenticating against the student portal.

## Installation

```bash
npm install dita-verify
# or
pnpm add dita-verify
```

## Environment Variable

Set the Daystar portal URL in your environment:

```bash
DAYSTAR_PORTAL_URL=https://your-portal-url.com
```

## Usage

```ts
import { fetchSessionToken, login } from "dita-verify";

async function verifyStudent(admno: string, password: string) {
  const token = await fetchSessionToken();
  const session = await login(token, admno, password);
  return session;
}
```

## Error Handling

Both functions throw on failure, so wrap in a try/catch:

```ts
import { fetchSessionToken, login } from "dita-verify";

async function verifyStudent(admno: string, password: string) {
  try {
    const token = await fetchSessionToken();
    const session = await login(token, admno, password);
    return session;
  } catch (err) {
    console.error("Verification failed:", err.message);
  }
}
```

Common errors:

- `Failed to communicate with server` — portal is unreachable
- `Failed to retrieve session token` — unexpected response from portal
- `Unauthorised Login. Visit Registrar's Office` — invalid credentials

## API

### `fetchSessionToken(): Promise<string>`

Hits the portal root and retrieves an initial session cookie required for login.

### `login(sessionId, admno, password): Promise<string>`

Authenticates the student and returns a session string on success.

| Parameter   | Type     | Description                              |
|-------------|----------|------------------------------------------|
| `sessionId` | `string` | Token returned by `fetchSessionToken()`  |
| `admno`     | `string` | Student admission number                 |
| `password`  | `string` | Student password                         |

## License

ISC
