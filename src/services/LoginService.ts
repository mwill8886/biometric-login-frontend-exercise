import { Finger } from './FingerprintScanner';

// Request type for lookupUser API method.
export type LookupUserRequest = { username: string };

// Response type for lookupUser API method.
export type LookupUserResponse = {
  exists: true,
  enrolledFingers: Finger[],
} | {
  exists: false,
};

// A scanned fingerprint image along with information about which finger was
// scanned.
export type FingerprintScan = {
  data: ImageData,
  dpi: number,
  finger: Finger,
}

// Request type for login API method.
export type LoginRequest = {
  username: string,
  scans: FingerprintScan[],
}

// Response type for login API method.
export type LoginResponse = {
  success: true,
} | {
  success: false,
  errorMessage: string,
}

/**
 * A simulated backend login service.
 */
export class LoginService {

  /**
   * Retrieve information about a user's previous biometric enrollment.
   *
   * @param request - Object containing the username to request.
   * @returns Response indicating whether the requested user exists,
   * and if so which fingers were previously enrolled.
   */
  async lookupUser(request: LookupUserRequest): Promise<LookupUserResponse> {
    // Sleep briefly to simulate a quick network request.
    await sleep(50);

    switch (request.username) {
      case "user1":
        return { exists: true, enrolledFingers: ["RIGHT_THUMB"] };
      case "user2":
        return { exists: true, enrolledFingers: ["RIGHT_THUMB", "RIGHT_INDEX"] };
      case "user3":
        return { exists: true, enrolledFingers: ["LEFT_THUMB", "LEFT_INDEX", "RIGHT_THUMB"] };
      default:
        return { exists: false };
    }
  }

  /**
   * Attempt to log in a user.
   *
   * @param request - Object containing the name of the user to log in and
   * the scans to present as biometrics.
   * @returns Response indicating whether the login was successful, and an error message
   * if the login was unsuccessful.
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    // Sleep for while to simulate an expensive network request.
    await sleep(2000);

    switch (request.username) {
      case "user1":
        return { success: true };
      case "user2":
        return { success: false, errorMessage: randomError() };
      case "user3":
        return { success: true };
      default:
        return { success: false, errorMessage: "Unknown user" };
    }
  }
}

async function sleep(millis: number): Promise<void> {
  return new Promise((resolve, _) => setTimeout(resolve, millis));
}

function randomError() {
  return chooseRandom([
    "Fingerprint(s) did not match",
    "Internal server error",
    "I'm a teapot",
  ]);
}

function chooseRandom<T>(choices: T[]): T {
  if (choices.length === 0) {
    throw new Error("must provide at least one choice");
  }
  const idx = Math.floor(Math.random() * choices.length);
  return choices[idx];
}
