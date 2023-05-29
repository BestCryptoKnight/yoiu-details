export const TIER_CONTRACT_ADDRESS =
  "secret1y6c4jv2xu769x56nhn38g4nxlq5zkqe0zfayfx";
export const TIER_CONTRACT_HASH =
  "84287edd0582ddc2b9a7bb929990073b04b8c5ed21a0d33c35c061131c02316b";
export const IDO_TOKEN_CONTRACT_ADDRESS =
  "secret1s3z9xkpdsrhk86300tqnv6u466jmdmlegew2ve";
export const IDO_TOKEN_CONTRACT_HASH =
  "cfecd51a022c520c55429d974363fd7f065d20474af6a362da8737f73b7d9e80";
export const PAY_TOKEN_CONTRACT_ADDRESS =
  "secret13934t9u6lwxhq8nsdu8epaadzqa0era4pkm3q9";
export const PAY_TOKEN_CONTRACT_HASH =
  "4281432c8c948dab8857bbcecd396fcdf362b7fc115347efe69a590c740faca4";
export const IDO_CONTRACT_ADDRESS =
  "secret1agg3jcd9prg0lxcy0chd2hz0rtmwrxtwe5yjma";
export const IDO_CONTRACT_HASH =
  "ba6740a5b63a2ac5f785f822a855390e0b2af447ad6943e6ba0d89ae78db4548";
export const NFT_CONTRACT_ADDRESS =
  "secret1mqknk74zm6203rfyj62xwc8pc4yf0l27zxxw96";
export const NFT_CONTRACT_HASH =
  "4dd433b8d9c234c33f27bcd14f3348bc57d96440a92b77cee7d0c925b8eed58e";
export const BAND_CONTRACT_ADDRESS =
  "secret1ezamax2vrhjpy92fnujlpwfj2dpredaafss47k";
export const BAND_CONTRACT_HASH =
  "00230665fa8dc8bb3706567cf0a61f282edc34d2f7df56192b2891fd9cd27b06";
export const GRPC_URL = "https://api.pulsar.scrttestnet.com";
export const MAIN_URL = "https://lcd.mainnet.secretsaturn.net";
export const SECRET_KEY = () => {
  const _secretKey: string = (
    localStorage.getItem("secret") as string
  )?.toString();
  if (_secretKey) {
    return _secretKey;
  } else {
    const randomKey: string = Math.random().toString(36).substr(2, 20);
    localStorage.setItem("secret", randomKey);
    return randomKey;
  }
};
export const MESSAGE = `Sign to authorize authentication into yoiu.io

-- Secure message by Sign With Wallet --
Purpose: authentication
Cost: 0.00`;
