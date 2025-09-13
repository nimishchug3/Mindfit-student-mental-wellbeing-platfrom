const { Twilio } = require('twilio');

require('dotenv').config();


require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);



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
