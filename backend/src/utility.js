import crypto from 'crypto';

// Firebase initialization for Node.js backend using ES Modules
import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Initialize environment variables
dotenv.config();

// Initialize Firebase Admin SDK with service account credentials
const initializeFirebase = () => {
  // Check if Firebase is already initialized
  if (!admin.apps.length) {
    const serviceAccount = {
      type: "service_account",
      project_id: "palettex-37930",
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'palettex-37930.appspot.com'
    });

    console.log('Firebase initialized successfully');
  }

  return getStorage();
};

// Function to delete a file from Firebase Storage
const deleteFileFromStorage = async (filePath) => {
  try {
    if (!filePath) {
      console.log('No file path provided for deletion');
      return false;
    }

    const storage = getStorage();
    const bucket = storage.bucket();
    const file = bucket.file(filePath);

    await file.delete();
    console.log(`Successfully deleted file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${filePath}: ${error.message}`);
    // Return false but don't throw, so we can continue with other operations
    return false;
  }
};

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

export {
  generateItemId,
  initializeFirebase,
  deleteFileFromStorage
};