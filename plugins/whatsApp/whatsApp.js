const axios = require('axios');
const whatsAppConfig = require('./whatsAppConfig')

const send = async (mobile, message, user = "Patient") => {
  try {
    let data = JSON.stringify({
      "from": whatsAppConfig.from,
      "to": mobile,
      "type": whatsAppConfig.type,
      "message": {
        "templateid": whatsAppConfig.template_id,
        "placeholders": [
          user,
          message
        ]
      }
    });

    const response = await axios.post(whatsAppConfig.baseUrl, data, {
      headers: {
        'apikey': whatsAppConfig.apiKey,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
}

module.exports = { send }
