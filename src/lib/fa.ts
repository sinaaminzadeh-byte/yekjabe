// Persian helpers — digits & money (matches the design system)
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function fa(n: number | string): string {
  return String(n).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function money(n: number): string {
  return fa(n.toLocaleString("en-US")).replace(/,/g, "٬");
}

export function faPrice(n: number): string {
  return `${money(n)} تومان`;
}

export function giftNo(no: number): string {
  return fa(no);
}

export function orderNo(no: number): string {
  return fa(1000 + no);
}
