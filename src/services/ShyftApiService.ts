import 'dotenv/config';
import { Network, ShyftSdk } from '@shyft-to/js';

/**
 * A singleton instance of the Shyft SDK
 *
 * Usage:
 *
 * `import { shyftService } from `@/services/ShyftApiService`
 *
 * await shyftService.shyft.nft.whateverCommand()
 */
class ShyftApiService {
  shyft: ShyftSdk;

  private readonly _apiKey: string;

  constructor(network = Network.Mainnet) {
    this._apiKey = process.env.SHYFT_API_TOKEN ?? '';

    this.shyft = new ShyftSdk({
      apiKey: this._apiKey,
      network: network,
    });
  }
}

export const shyftService = new ShyftApiService();
