import axios, { AxiosInstance } from "axios";
const storage = localStorage.getItem("userToken");
const user = storage ? JSON.parse(storage) : {};
export const api: AxiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + user?.access_token,
  },
});

export const connectWalletApi = async (wallet: string) => {
  await api.post("/api/connect-wallet", {
    wallet,
  });
};

export const uploadFile = (file: any, onUploadProgress: any) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export const getFile = () => {
  return api.get("/files");
};

export const isAdminApi = async (wallet: string) => {
  console.log('call is admin api');
  return await api.post("/api/is-admin", {
    wallet,
  });
};

export const loginAdminApi = async (
  wallet: string,
  signature: string,
  keyValue: string
) => {
  const response = await api.post("/api/admin/login", {
    wallet,
    signature,
    keyValue,
  });
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return true;
  }
  return false;
};

export const createIdoApi = async (
  landingImage: string,
  landingDescription: string,
  landingTitle: string,
  landingSubtitle: string,
  landingTarget: string,
  landingPrice: string,
  landingStarts: string,
  image: string,
  name: string,
  token: string,
  target: string,
  participants: string,
  price: string,
  softcap: string,
  starts: string,
  ends: string,
  title: string,
  subtitle: string,
  description: string,
  idoAddress: string,
  idoToken: string,
  paymentToken: string
) => {
  return api.post("/api/create-ido", {
    landingImage,
    landingDescription,
    landingTitle,
    landingSubtitle,
    landingTarget,
    landingPrice,
    landingStarts,
    image,
    name,
    token,
    target,
    participants,
    price,
    softcap,
    starts,
    ends,
    title,
    subtitle,
    description,
    idoAddress,
    idoToken,
    paymentToken,
  });
};

export const getLandingApi = () => {
  return api.get("/api/get-landing");
};

export const getListingApi = () => {
  return api.get("/api/get-projects");
};

export const upgradeTierApi = async (
  wallet: string,
  tier: number,
  stakedAmount: number
) => {
  await api.post("/api/upgrade-tier", {
    wallet,
    tier,
    stakedAmount,
  });
};

export const unbondTierApi = async (wallet: string, tier: number) => {
  await api.post("/api/tier-unbond", {
    wallet,
    tier,
  });
};

export const withdrawApi = async (wallet: string, tier: number) => {
  await api.post("/api/tier-withdraw", {
    wallet,
    tier,
  });
};

export const getTierApi = async (wallet: string) => {
  return await api.post("/api/get-tier", {
    wallet,
  });
};

export const updateTierApi = async (wallet: string, tier: number) => {
  return await api.post("/api/upgrade-tier", {
    wallet,
    tier,
  });
};

export const getTimeApi = async () => {
  return await api.get("/api/get-time");
};
