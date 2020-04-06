const whois = require('whois');

let reponse;

exports.handler = async (value) => {
  try {
    reponse = whois.lookup(value.address, (data) => {
      return data;
    });
  }
  catch (error) {
    return error
  }
  return reponse;
};