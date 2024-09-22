const dotenv = require("dotenv");

dotenv.config();

const baseUrl = 'https://wapi.wbbox.in/v2/wamessage/send';
const apiKey = process.env.WA_API_KEY;
const from = process.env.WA_FROM;
const type = process.env.WA_TYPE;
const template_id = process.env.WA_TEMPLATE_Id;

module.exports = {
  baseUrl,
  apiKey,
  from,
  type,
  template_id,
}