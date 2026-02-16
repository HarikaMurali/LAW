/**
 * Centralized Gemini AI helper with automatic retry and model fallback.
 *
 * • Primary model  : gemini-2.5-flash  (working with current key)
 * • Fallback model  : gemini-2.0-flash  (backup)
 * • Retries a 429 once after the server-suggested delay (max 60 s).
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.0-flash";
const MAX_RETRY_DELAY_MS = 60_000; // never wait more than 60 s

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

/**
 * Generate content with automatic retry + model fallback.
 * @param {string} prompt – the prompt text
 * @returns {Promise<string>} – the generated text
 */
async function generateContent(prompt) {
  // 1. Try primary model
  try {
    const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.warn(`[Gemini] ${PRIMARY_MODEL} failed: ${err.message}`);

    // If 429, extract retry delay and wait once
    const retryMs = extractRetryMs(err);
    if (retryMs && retryMs <= MAX_RETRY_DELAY_MS) {
      console.log(`[Gemini] Waiting ${Math.ceil(retryMs / 1000)}s before retry…`);
      await sleep(retryMs);
      try {
        const model = genAI.getGenerativeModel({ model: PRIMARY_MODEL });
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (retryErr) {
        console.warn(`[Gemini] ${PRIMARY_MODEL} retry failed: ${retryErr.message}`);
      }
    }

    // 2. Try fallback model
    try {
      console.log(`[Gemini] Falling back to ${FALLBACK_MODEL}`);
      const fallback = genAI.getGenerativeModel({ model: FALLBACK_MODEL });
      const result = await fallback.generateContent(prompt);
      return result.response.text();
    } catch (fbErr) {
      console.error(`[Gemini] ${FALLBACK_MODEL} also failed: ${fbErr.message}`);
    }

    // 3. Nothing worked – re-throw the original error
    throw err;
  }
}

/* ── helpers ────────────────────────────────────────── */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractRetryMs(err) {
  const msg = err?.message || "";
  const match = msg.match(/retryDelay.*?(\d+)s/i) || msg.match(/retry in (\d+[\.\d]*)/i);
  if (match) return Math.ceil(parseFloat(match[1]) * 1000);
  return null;
}

module.exports = { generateContent, PRIMARY_MODEL };
