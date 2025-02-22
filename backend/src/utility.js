import crypto from 'crypto';

// Function to generate a unique itemId
function generateItemId() {
  // Generate UTC timestamp (YYYYMMDD_HHmm)
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const timestamp = `${year}${month}${day}_${hours}${minutes}`;

  // Generate an 8-character random hash
  const randomHash = crypto.randomBytes(4).toString('hex'); // "e77bb660"

  // Combine timestamp and hash
  const newItemId = `${timestamp}_${randomHash}`;

  return newItemId; // ex: 20250222_0525_e77bb660
}

export { generateItemId };