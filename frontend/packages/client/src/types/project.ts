import { ButtonTheme } from "@project/libs/components/Button/types";

export interface Project {
  logoUrl?: string;
  imageUrl: string;
  urlName?: string;
  name: string;
  shortName: string;
  description: string;
  briefDescription?: string;
  slogan: string;
  totalRize: string;
  targetAmount: string;
  participants: number;
  progress: number;
  softcap?: number;
  remaining_per_tiers?: Array<string>;
  price: string;
  id: string;
  statsAt: number;
  softCap?: number;
  end_time: number;
  pitchdeck?: string[];
  vestingSchedule?: string;
  socialMedia?: string;
  whitePaper?: string;
  website?: string;
  button: boolean;
  buttonActive: string;
  connect: boolean;
  className?: string;
  opacityClassName?: string;
  spartaOpacityClassName?: string;
  buttonTheme: ButtonTheme;
  contractAddress: string;
}
