const whatsApp = require('../plugins/whatsApp/whatsApp');

const sendWhatsApp = async (req, res) => {
  try {
    const { mobile, name, message } = req.body;
    const result = await whatsApp.send(mobile, message, name)
    return res.status(200).json({ success: result.status === 'SUCCESS' ? true : false, message: result.message, data: result?.data });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}


module.exports = { sendWhatsApp }