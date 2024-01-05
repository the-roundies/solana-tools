import 'dotenv/config';
import process from 'process';
import { readFile } from 'fs/promises';
import { Keypair } from '@solana/web3.js';

/**
 * Retrieve a Solana keypair from a local file (JSON).
 *
 * Usage:
 * `const keyPair = await getKeypair()`
 *
 * Retrieves a usable keypair from the given path. Defaults to a keypair path
 * set in `.env`
 * @param path (optional) - defaults to key pair path defined in KEY_PATH
 */
export const getKeypair = async (path?: string) => {
  // we need to retrieve our local keypair here
  const keypairPath = path ?? process.env.KEY_PATH;

  if (!keypairPath) {
    throw new Error(
      'Please configure KEY_PATH or provide a valid path to a keypair file'
    );
  }

  let keypairFileContents: number[];

  try {
    keypairFileContents = JSON.parse(await readFile(keypairPath, 'utf-8'));
  } catch (_) {
    throw new Error('Could not ready keypair file');
  }

  const secretKey = Uint8Array.from(keypairFileContents);

  return Keypair.fromSecretKey(secretKey);
};
