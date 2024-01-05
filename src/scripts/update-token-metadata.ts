import 'dotenv/config';
import {
  publicKey,
  transactionBuilder,
  createNoopSigner,
  signerIdentity,
} from '@metaplex-foundation/umi';
import {
  fetchMetadataFromSeeds,
  mplTokenMetadata,
  updateV1,
} from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { toWeb3JsLegacyTransaction } from '@metaplex-foundation/umi-web3js-adapters';
import base58 from 'bs58';

/**
 * Generate a base58-encoded transaction. signerPublicKey is the wallet that will eventually
 * sign the transaction. (A noop signer).
 */
(async () => {
  const umi = createUmi(process.env.RPC_HOST ?? '').use(mplTokenMetadata());

  const signerPublicKey = publicKey('wallet address of signer');

  const noOpSigner = createNoopSigner(signerPublicKey);

  umi.use(signerIdentity(noOpSigner));

  const mintAddress = publicKey('mint address of token here');

  const initialMetadata = await fetchMetadataFromSeeds(umi, {
    mint: mintAddress,
  });

  const blockHash = await umi.rpc.getLatestBlockhash();

  try {
    const updateTransaction = await transactionBuilder()
      .add(
        updateV1(umi, {
          mint: mintAddress,
          payer: noOpSigner,
          data: {
            ...initialMetadata,
            // add whatever properties you want to update here
            uri: 'new URI here',
          },
        })
      )
      .buildWithLatestBlockhash(umi);

    console.log('transaction', updateTransaction);

    const serialized = toWeb3JsLegacyTransaction(updateTransaction)
      .serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      })
      .toString('base64');

    const encoded = base58.encode(Buffer.from(serialized, 'base64'));

    console.log('base58 encoded:', encoded);
  } catch (e) {
    console.error(e);
  }
})();
