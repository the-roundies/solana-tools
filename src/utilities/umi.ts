import 'dotenv/config';
import { getKeypair } from './get-keypair';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import {
  createSignerFromKeypair,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

/**
 * Give you a UMI instance like they talk about in the Metaplex docs:
 * https://developers.metaplex.com/token-metadata/getting-started/js
 *
 * Usage:
 * import { umiInstance } from '@/utilities/umi';
 *
 * const umi = await umiInstance('path/to/file.json', 'host url');
 *
 * @param keypairPath
 * @param host
 */
export const umiInstance = async (keypairPath: string, host: string) => {
  const authorityKeypair = await getKeypair(keypairPath);

  const umi = createUmi(host).use(mplTokenMetadata());

  const umiAuthorityKeypair = umi.eddsa.createKeypairFromSecretKey(
    authorityKeypair.secretKey
  );

  const authority = createSignerFromKeypair(umi, umiAuthorityKeypair);

  umi.use(signerIdentity(authority));

  return umi;
};
