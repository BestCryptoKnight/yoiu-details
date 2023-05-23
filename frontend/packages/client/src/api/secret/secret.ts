/* eslint-disable */
import { CHAIN_ID, TEST_CHAIN_ID } from "global/chaindId";
import { SecretNetworkClient } from "secretjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import {
  TIER_CONTRACT_ADDRESS,
  TIER_CONTRACT_HASH,
  IDO_TOKEN_CONTRACT_ADDRESS,
  IDO_TOKEN_CONTRACT_HASH,
  PAY_TOKEN_CONTRACT_ADDRESS,
  PAY_TOKEN_CONTRACT_HASH,
  IDO_CONTRACT_ADDRESS,
  IDO_CONTRACT_HASH,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_HASH,
  BAND_CONTRACT_ADDRESS,
  BAND_CONTRACT_HASH,
  GRPC_URL,
  MAIN_URL,
  SECRET_KEY,
  MESSAGE,
} from "./constants";

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: any;
    getEnigmaUtils: any;
    getOfflineSignerOnlyAmino: any;
    signArbitrary: any;
    verifyArbitrary: any;
  }
}

async function secretJsKeplr() {
  if (!window.keplr) {
    throw new Error("please install Keplr");
  }

  await window.keplr.enable(CHAIN_ID);

  const keplrOfflineSigner =
    window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);

  const { name } = await window.keplr.getKey(CHAIN_ID);
  const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

  // eslint-disable-next-line
  //@ts-ignore
  const secretjs = new SecretNetworkClient({
    url: MAIN_URL,
    chainId: CHAIN_ID,
    wallet: keplrOfflineSigner,
    walletAddress: myAddress,
    encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
  });
  localStorage.setItem("wallet", myAddress);
  return { ...secretjs, name };
}

async function signature() {
  const secretjs = await secretJsKeplr();
  const signature = await window.keplr.signArbitrary(
    CHAIN_ID,
    secretjs.address,
    MESSAGE
  );
  return signature;
}

async function balance() {
  const secretjs = await secretJsKeplr();
  const balance = await secretjs.query.bank.balance({
    address: secretjs.address,
    denom: "uscrt",
  });
  return Number(balance.balance?.amount);
}

async function usdRate() {
  const secretjs = await secretJsKeplr();
  const usdRate: any = await secretjs.query.compute.queryContract({
    contract_address: BAND_CONTRACT_ADDRESS,
    code_hash: BAND_CONTRACT_HASH,
    query: {
      get_reference_data: {
        base_symbol: "SCRT",
        quote_symbol: "USD",
      },
    },
  });
  return usdRate.rate;
}

async function setViewingKey() {
  const secretjs = (await secretJsKeplr()) as any;
  const secrekey = await SECRET_KEY();
  const setViewingKey: any = await secretjs.tx.compute.executeContract(
    {
      contract_address: NFT_CONTRACT_ADDRESS,
      code_hash: NFT_CONTRACT_HASH,
      sender: secretjs.address,
      msg: {
        set_viewing_key: {
          key: secrekey,
        },
      },
    },
    {
      gasLimit: 70_000,
    }
  );
  return setViewingKey.code == 0;;
}

async function deposit(value: number) {
  try {
    const secretjs = await secretJsKeplr();
    const usdToScrt = await usdRate();
    const scrt = Math.ceil((value * Math.pow(10, 18)) / usdToScrt);
    const depositUsd: any = await secretjs.tx.compute.executeContract(
      {
        contract_address: TIER_CONTRACT_ADDRESS,
        code_hash: TIER_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          deposit: { denom: "SCRT", amount: String(scrt) },
        },
        sent_funds: [
          { denom: "uscrt", amount: String(scrt * Math.pow(10, 6)) },
        ],
      },
      {
        gasLimit: 300_000,
      }
    );
    if (depositUsd.code !== 0) toast.error(depositUsd.rawLog);
    return depositUsd.code == 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function withdraw() {
  try {
    const secretjs = await secretJsKeplr();
    const withdraw: any = await secretjs.tx.compute.executeContract(
      {
        contract_address: TIER_CONTRACT_ADDRESS,
        code_hash: TIER_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          withdraw: {},
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    if (withdraw.code !== 0) toast.error(withdraw.rawLog);
    return withdraw.code === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function claim() {
  try {
    const secretjs = await secretJsKeplr();
    const claim = await secretjs.tx.compute.executeContract(
      {
        contract_address: TIER_CONTRACT_ADDRESS,
        code_hash: TIER_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          claim: {},
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    return claim.code == 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function withdrawRewards(customAddress: string) {
  try {
    const secretjs = await secretJsKeplr();
    const withdrawRewards: any = await secretjs.tx.compute.executeContract(
      {
        contract_address: TIER_CONTRACT_ADDRESS,
        code_hash: TIER_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          withdraw_rewards: {
            recipient: customAddress,
          },
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    if (withdrawRewards.code == 0) {
      return withdrawRewards.arrayLog[1].value;
    } else toast.error(withdrawRewards.rawLog);
  } catch (error) {
    console.error(error);
  }
}

async function getTier() {
  try {
    const secretjs = await secretJsKeplr();
    const secrekey = await SECRET_KEY();
    const getTier: any = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        tier_info: {
          address: secretjs.address,
          viewing_key: secrekey,
        },
      },
    });
    const tier = getTier.tier_info?.tier;
    const nftTier = getTier.tier_info?.nft_tier;

    const userInfo: any = await secretjs.query.compute.queryContract({
      contract_address: TIER_CONTRACT_ADDRESS,
      code_hash: TIER_CONTRACT_HASH,
      query: { user_info: { address: secretjs.address } },
    });

    return { userInfo, tier, nftTier };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUserInfo() {
  try {
    const secretjs = await secretJsKeplr();
    const userInfo: any = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        user_info: {
          address: secretjs.address,
          ido_id: 0,
        },
      },
    });
    return userInfo.user_info;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUserInfo() {
  try {
    const secretjs = await secretJsKeplr();
    const idoAmount: any = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        ido_amount: {},
      },
    });
    const userInfos = await Promise.all(
      [...Array(idoAmount.ido_amount.amount).keys()].map(async (id) => {
        const result: any[] = await Promise.all([
          secretjs.query.compute.queryContract({
            contract_address: IDO_CONTRACT_ADDRESS,
            code_hash: IDO_CONTRACT_HASH,
            query: {
              user_info: {
                address: secretjs.address,
                ido_id: id,
              },
            },
          }),
          secretjs.query.compute.queryContract({
            contract_address: IDO_CONTRACT_ADDRESS,
            code_hash: IDO_CONTRACT_HASH,
            query: {
              ido_info: {
                ido_id: id,
              },
            },
          }),
          secretjs.query.compute.queryContract({
            contract_address: IDO_CONTRACT_ADDRESS,
            code_hash: IDO_CONTRACT_HASH,
            query: {
              purchases: {
                ido_id: id,
                address: secretjs.address,
              },
            },
          }),
        ]);
        return [
          result[0].user_info,
          result[1].ido_info,
          result[2].purchases.purchases,
        ];
      })
    );
    return userInfos;
  } catch (error) {
    console.error(error);
  }
}

async function getPurchasesInfo() {
  try {
    const secretjs = await secretJsKeplr();
    const purchasesInfo: any = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        purchases: {
          ido_id: 0,
          address: secretjs.address,
        },
      },
    });
    return purchasesInfo?.purchases?.purchases;
  } catch (error) {
    console.error(error);
  }
}

async function startIdo(ido: any) {
  try {
    const secretjs = await secretJsKeplr();
    const allowance = await secretjs.tx.compute.executeContract(
      {
        contract_address: IDO_TOKEN_CONTRACT_ADDRESS,
        code_hash: IDO_TOKEN_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          increase_allowance: {
            spender: IDO_CONTRACT_ADDRESS,
            amount: String(ido.totalAmount),
          },
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    const tx = await secretjs.tx.compute.executeContract(
      {
        contract_address: IDO_CONTRACT_ADDRESS,
        code_hash: IDO_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          start_ido: {
            start_time: Number(dayjs(ido.startTime).unix()),
            end_time: Number(dayjs(ido.endTime).unix()),
            total_amount: String(ido.totalAmount),
            tokens_per_tier: ido.tokensPerTier,
            price: ido.rate,
            token_contract: IDO_TOKEN_CONTRACT_ADDRESS,
            token_contract_hash: IDO_TOKEN_CONTRACT_HASH,
            payment: {
              token: {
                contract: PAY_TOKEN_CONTRACT_ADDRESS,
                code_hash: PAY_TOKEN_CONTRACT_HASH,
              },
            },
            whitelist: {
              shared: {},
            },
            soft_cap: ido.softCap,
          },
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    return tx.code == 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function invest(amount: number) {
  try {
    const secretjs = await secretJsKeplr();
    const rate = await getIDOInfo();
    const secrekey = await SECRET_KEY();
    const buyToken: any = await secretjs.tx.compute.executeContract(
      {
        contract_address: IDO_CONTRACT_ADDRESS,
        code_hash: IDO_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          buy_tokens: {
            amount: (amount * rate.price).toString(),
            ido_id: 0,
            viewing_key: secrekey,
          },
        },
        sent_funds: [
          { denom: "uscrt", amount: String(amount * Math.pow(10, 6)) },
        ],
      },
      {
        gasLimit: 300_000,
      }
    );
    if (buyToken.code !== 0) toast.error(buyToken.rawLog);
    return buyToken.code == 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function recvTokens() {
  try {
    const secretjs = await secretJsKeplr();
    const recvTokens = await secretjs.tx.compute.executeContract(
      {
        contract_address: IDO_CONTRACT_ADDRESS,
        code_hash: IDO_CONTRACT_HASH,
        sender: secretjs.address,
        msg: {
          recv_tokens: {
            ido_id: 0,
          },
        },
      },
      {
        gasLimit: 300_000,
      }
    );
    if (recvTokens.code !== 0) toast.error(recvTokens.rawLog);
    return recvTokens.code === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getIDOInfo() {
  try {
    const secretjs = await secretJsKeplr();
    const idoInfo = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        ido_info: {
          ido_id: 0,
        },
      },
    });

    return (idoInfo as any).ido_info;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAllIDOInfo() {
  try {
    const secretjs = await secretJsKeplr();
    const idoAmount: any = await secretjs.query.compute.queryContract({
      contract_address: IDO_CONTRACT_ADDRESS,
      code_hash: IDO_CONTRACT_HASH,
      query: {
        ido_amount: {},
      },
    });
    const idoInfos = await Promise.all(
      [...Array(idoAmount.ido_amount.amount).keys()].map(async (id) => {
        const ido: any = await secretjs.query.compute.queryContract({
          contract_address: IDO_CONTRACT_ADDRESS,
          code_hash: IDO_CONTRACT_HASH,
          query: {
            ido_info: {
              ido_id: id,
            },
          },
        });
        return ido.ido_info;
      })
    );
    return idoInfos;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export {
  secretJsKeplr,
  signature,
  balance,
  usdRate,
  setViewingKey,
  deposit,
  withdraw,
  claim,
  withdrawRewards,
  getTier,
  getUserInfo,
  getAllIDOInfo,
  getIDOInfo,
  getAllUserInfo,
  getPurchasesInfo,
  startIdo,
  invest,
  recvTokens,
};
