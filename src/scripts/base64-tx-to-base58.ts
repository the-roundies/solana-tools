import { Transaction } from '@solana/web3.js';
import base58 from 'bs58';

(async () => {
  try {
    const buffer = Buffer.from(
      'put your base 64 encoded transaction here',
      'base64'
    );

    const encoded = base58.encode(buffer);

    console.log(encoded);

    const recoveredTransaction = Transaction.from(buffer);

    console.log('recoveredTransaction', recoveredTransaction);
  } catch (e) {
    console.error(e);
  }
})();
