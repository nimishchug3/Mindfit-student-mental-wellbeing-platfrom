const { Twilio } = require('twilio');

require('dotenv').config();

Twilio_SID = "";
Twilio_AUTH = "";


const client = require('twilio')(Twilio_SID,Twilio_AUTH);


const sendsms =  (async (body,sender_no) =>{

let msgopt = {
    from: process.env.Twilio_from,
    to : sender_no,
    body



}

try {
    const msg = await client.messages.create(msgopt);
    console.log(msg);

} catch (error) {
    console.log(error);
    
}

})

module.exports={sendsms}
