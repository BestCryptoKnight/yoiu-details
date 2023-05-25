export const TIER_CONTRACT_ADDRESS =
  "secret1pysu6we4juy4677cwhrc89rkeuk4y7wwddtxuu";
export const TIER_CONTRACT_HASH =
  "db6860b96f2cdf03735a6616d94a4291522974ac750b71bffa3924196b4e9d2c";
export const IDO_TOKEN_CONTRACT_ADDRESS =
  "secret17pmln5mkrtgdm55vg2kgfhjzlqwwnvpr0jahe2";
export const IDO_TOKEN_CONTRACT_HASH =
  "cfecd51a022c520c55429d974363fd7f065d20474af6a362da8737f73b7d9e80";
export const PAY_TOKEN_CONTRACT_ADDRESS =
  "secret13934t9u6lwxhq8nsdu8epaadzqa0era4pkm3q9";
export const PAY_TOKEN_CONTRACT_HASH =
  "4281432c8c948dab8857bbcecd396fcdf362b7fc115347efe69a590c740faca4";
export const IDO_CONTRACT_ADDRESS =
  "secret19hssl4cjydgh00r3xm9gl8qmwm494ed7ysjc2d";
export const IDO_CONTRACT_HASH =
  "218ba8396be920bf07fbd419ce88bfebd91fb8dab5f8e3c8f7e4e19c362499dd";
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
