const express = require("express")
const app = express()
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const url = require("url");
const querystring = require("querystring");
const bodyParser = require("body-parser");
const axios = require("axios")




const geturl = (req, res) => {
  const oauth2client = new google.auth.OAuth2(
    /* your google auth client id */ ,
    "http://localhost:8000/"
  )

  const scope = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]
  const url = oauth2client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
    state: JSON.stringify({
      callbackUrrl: req.body.callbackUrrl,
      userID: req.body.userID
    })
  })

  request(url, (err, response, body) => {
    console.log("error", err)
    console.log("status", response && response.statusCode)
    res.send({ url })
  })
}

const getdata=  async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const code = querystring.parse(parsedUrl.query).code
  const oauth2client = new google.auth.OAuth2(
    /*your client id*/ ,
    "http://localhost:8000/"
  )
  const tokens = await oauth2client.getToken(code);
  console.log(tokens);
  res.send("hello");
    let stepArray =[];

    try {
      const result = await axios({
        method: "POST",
        url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        headers: {
          Authorization: "Bearer " + tokens.tokens.access_token,
          "Content-Type": "application/json",
        },
        data: {
          aggregateBy: [
            {
              dateTypeName: "com.google.step_count.delta",
              dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
            },
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: 1706731440000,
          endTimeMillis: 1708373040000,
        },
      });
      
      console.log(result.data);
      stepArray =result.data.bucket
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error); 
      
    }
    try {
      for (const dataset of stepArray){
        console.log(dataset);
        for (const points of dataset.dataset){
          for(const steps of points.point){
            console.log(steps.value);
          }
        }
      }
      
    } catch (e) {
      console.log(e);
      
    }


}
module.exports={geturl,getdata}


