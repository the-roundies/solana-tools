import 'dotenv/config';
import fs from 'fs';
import Arweave from 'arweave';

/**
 * First, get yourself a wallet:
 * https://cookbook.arweave.dev/getting-started/welcome.html
 */
(async () => {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,
    logging: false,
  });

  const wallet = JSON.parse(
    fs.readFileSync(process.env.ARWEAVE_WALLET_PATH ?? '', 'utf-8')
  );

  console.log(wallet);

  const metadata = {
    name: 'Name',
    symbol: '$NAME',
    description: "It's a name.",
    image: 'https://arweave.net/FOO_BAR',
  };

  const metadataRequest = JSON.stringify(metadata);

  const metadataTransaction = await arweave.createTransaction({
    data: metadataRequest,
  });

  metadataTransaction.addTag('Content-Type', 'application/json');

  await arweave.transactions.sign(metadataTransaction, wallet);

  console.log('metadata txid', metadataTransaction);

  console.log(await arweave.transactions.post(metadataTransaction));

  // to find the address of your file, look up your arweave wallet address
  // on: https://viewblock.io/arweave/address/your-wallet-address
  // the URI is literally the transaction id:
  // https://arweave.net/your_tx_id
})();
