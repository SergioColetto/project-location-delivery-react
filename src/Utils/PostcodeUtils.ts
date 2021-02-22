
const POSTCODE_REGEX = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
const SPACE_REGEX = /\s+/gi;
const INCODE_REGEX = /\d[a-z]{2}$/i;

interface Validator {
  (input: string): boolean;
}

interface Parser {
  (postcode: string): string | null;
}

export const isValid: Validator = (postcode) =>
  postcode.match(POSTCODE_REGEX) !== null;


export const sanitize = (s: string): string =>
  s.replace(SPACE_REGEX, "").toUpperCase();


const firstOrNull = (match: RegExpMatchArray | null): string | null => {
  if (match === null) return null;
  return match[0];
};

const matchOn = (s: string, regex: RegExp): RegExpMatchArray | null =>
  sanitize(s).match(regex);

const toIncode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, INCODE_REGEX);
  return firstOrNull(match);
};

const toOutcode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  return sanitize(postcode).replace(INCODE_REGEX, "");
};

export const toNormalised: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode}`;
};