import dotenv from "dotenv";

dotenv.config();

/**
 * Verifies a Google reCAPTCHA v2/v3 token with Google's API on the server.
 * Returns true if verification succeeds, or if RECAPTCHA_SECRET is not configured (bypass for local development).
 */
export async function verifyRecaptcha(token, ipAddress) {
  const secretKey = process.env.RECAPTCHA_SECRET;
  
  // If no secret key is configured, warn and bypass (helps testing/local dev without keys)
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET env variable is not set. Bypassing reCAPTCHA verification (Development Mode).");
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ipAddress || "",
      }).toString(),
    });

    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      console.warn("reCAPTCHA validation failed:", data["error-codes"]);
      return false;
    }
  } catch (err) {
    console.error("reCAPTCHA validation error:", err);
    return false;
  }
}
