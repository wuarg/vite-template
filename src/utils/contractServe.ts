import { environment } from './iostConfig';

const XG_LIST = ['xg_3', 'xg_30', 'xg_90', 'xg_180'];

class Callback {
  map: any = {};

  on(msg, f) {
    this.map[msg] = f;
    return this;
  }

  pushMsg(msg, args) {
    const f = this.map[msg];
    if (f === undefined) {
      return;
    }
    f(args);
  }
}
export const myAddress = '';
export const myIOST = {};
export const ContractService = {
  async init() {
    console.log('window---', window, window['IWalletJS'], window['IOST']);
    if (window['IWalletJS']) {
      this.myIOST = window['IWalletJS'].newIOST(window['IOST']);

      this.myAddress = await window['IWalletJS'].enable();
      this.myIOST.setAccount(this.myAddress);
      this.myIOST.config.gasLimit = 2000000;

      return true;
    } else {
      const IOST = window['IOST'];

      // use RPC
      const rpc = new IOST.RPC(new IOST.HTTPProvider('https://api.iost.io'));
      rpc.blockchain.getChainInfo().then(console.log);

      // init iost sdk
      this.myIOST = new IOST.IOST(
        {
          // will use default setting if not set
          gasRatio: 1,
          gasLimit: 2000000,
          delay: 0,
        },
        new IOST.HTTPProvider('https://api.iost.io'),
      );

      this.myIOST.setAccount('token.iost');

      this.myIOST.rpc = rpc;
      this.myIOST.setRPC(rpc);

      return false;
    }
  },

  getUserAddress() {
    return this.myAddress;
  },

  getIOST() {
    return this.myIOST;
  },

  isMe(address: string): boolean {
    return address == this.myAddress;
  },
  // 铭文合约
  deployFunc(name: string, total: number, limit: number) {
    const tx = this.myIOST.callABI(environment.irc, 'deploy', [
      name,
      total.toString(),
      limit.toString(),
    ]);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
  // 铭文mint
  mintFunc(name: string, limit: number) {
    const tx = this.myIOST.callABI(environment.irc, 'mint', [name, limit.toString()]);
    console.log('tx-----', tx);
    const limitAmount = 0.001;
    tx.addApprove('iost', limitAmount);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
  // 铭文下架
  unlistFunc(name: string, id: number) {
    const tx = this.myIOST.callABI(environment.irc, 'unlist', [name, id.toString()]);
    console.log('tx-----', tx);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
  // 铭文上架
  listFunc(name: string, id: number, price: number) {
    const tx = this.myIOST.callABI(environment.irc, 'list', [
      name,
      id.toString(),
      price.toString(),
    ]);
    console.log('tx-----', tx);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
  // 铭文转让
  transferFunc(name: string, id: number, to: string) {
    const tx = this.myIOST.callABI(environment.irc, 'transfer', [name, id.toString(), to]);
    console.log('tx-----', tx);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
  //铭文购买
  buyFunc(name: string, id: number) {
    const tx = this.myIOST.callABI(environment.irc, 'buy', [name, id.toString()]);
    console.log('tx-----', tx);
    return new Promise((resolve, reject) => {
      this.myIOST
        .signAndSend(tx)
        .on('success', (result) => {
          console.log('success-result', result);
          resolve('');
        })
        .on('failed', (result) => {
          if (typeof result == 'object' && result.message) {
            console.log('failed-result', result);
            result = result.message;
          }
          reject(result);
        });
    });
  },
};
