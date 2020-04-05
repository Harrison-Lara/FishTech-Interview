import { lookup } from 'whois';

let res;
export async function handler(input) {
  try {
    res = lookup(input, (data) => {
      data;
    });
  }
  catch (err) {
    return err
  }
  return res;
}