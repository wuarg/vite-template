import { environment } from './iostConfig';

const PRICE_PRECISION = 6;
const TOTAL_MINUTES = 60 * 24 * 30;
const _iost = null;

export const nftManager = {
  // _iost: any = null;

  constructor(iost: any) {
    this._iost = iost;
  },

  async getNftInfo(contractAddress: string, tokenId: string, account: string) {
    console.log('his._iost.rpc.blockchain---', this._iost.rpc.blockchain);
    const obj = await this._iost.rpc.blockchain.getNftItem(contractAddress, tokenId, account);
    return obj || null;
  },
  async getTokenBalance(token) {
    try {
      const obj = await this._iost.rpc.blockchain.getBalance(
        this._iost.currentAccount,
        token,
        true,
      );
      console.log('obj---', obj);
      return obj.balance;
    } catch (e) {
      return 0;
    }
  },
};
