export const shortenPhrase = (
  phrase: string | number,
  startSymbols = 8,
  endSymbols = 3,
  replaceSymbols = '...',
): string => {
  const strPhrase = `${phrase}`;

  return (strPhrase.length > startSymbols + endSymbols
    ? `${strPhrase.slice(0, startSymbols)}${replaceSymbols}${strPhrase.slice(strPhrase.length - endSymbols, strPhrase.length)}`
    : strPhrase);
};
