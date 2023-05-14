import {
  format,
} from 'date-fns';

export const formatDate = (date: Date | string | number) => {
  const dateToformat = new Date(date);
  return format(dateToformat, 'MMM d, yyyy, h:mm:ss');
};

export const formatBalance = (amount: number | string | undefined) => {
  if (!amount) {
    return '0.0';
  }
  const amountNumber = typeof amount === 'string' ? Number(amount) : amount;
  return amountNumber.toFixed(1);
};

export const formatSCRTFromUsd = (amount: number, rate: number) => {
  return Math.ceil((amount * Math.pow(10, 18)) / rate);
}

export const formatDecimals = (
  amount: string | number | undefined,
) => {
  if (amount === undefined) { return '0'; }
  return Number(Number(amount).toFixed(10)).toString();
};

export const formatToDollarWithTopCommas = (amount: number | string | undefined) => {
  if (amount === undefined) {
    return '0';
  }
  return `${(Number(amount) / Math.pow(10, 6)).toLocaleString().replaceAll(',', '’')} FINA`;
};

export const formatToDollarWithBottomCommas = (amount: number | string | undefined) => {
  if (amount === undefined) {
    return '$0';
  }
  return `$${Number(amount).toLocaleString().replaceAll(',', ', ')}`;
};

export const formatTimeStampToMonthAndYear = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // convert to milliseconds
  const day = date.getDate();
  const month = date.getMonth() + 1; // add 1 to zero-indexed month
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`
}

export const formatTimeStampToMonthYear = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // convert to milliseconds
  const month = date.toLocaleString('default', { month: 'long' }); // add 1 to zero-indexed month
  const year = date.getFullYear();
  return `${month}, ${year}`
}