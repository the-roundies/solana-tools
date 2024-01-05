import 'dotenv/config';
import { Connection } from '@solana/web3.js';

/**
 * Get a Solana Connection instance from a RPC endpoint URL
 * @param host
 */
export const getConnection = (host?: string) => {
  console.log('RPC_HOST', host ?? process.env.RPC_HOST);
  return new Connection(host ?? process.env.RPC_HOST ?? '', 'confirmed');
};
