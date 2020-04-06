const whois = require('whois');

let res;

exports.handler = async (info) => {
  try {
    res = whois.lookup(info.address, (data) => {
      return data;
    });
  }
  catch (err) {
    return err
  }
  return res;
};