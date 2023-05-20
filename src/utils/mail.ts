
import { Request, Response } from 'express';



const apiKey = 'sendchamp_live_$2y$10$Y2BmXERQhNm0bYBr2zy0CeNST/Bw.Osl.WwbdHzNjof1YMo86Q99m';



const sdk = require('api')('@sendchamp/v1.0#51pps210ld63tam2');

sdk.auth('Bearer sendchamp_live_$2y$10$Y2BmXERQhNm0bYBr2zy0CeNST/Bw.Osl.WwbdHzNjof1YMo86Q99m');
sdk.sendEmailApi({
  to: [{email: 'slimnfine22@gmail.com', name: 'Oritsegbubemi'}],
  from: {email: 'igbubemi22@yahoo.com', name: 'john'},
  message_body: {type: 'otp', value: '5666555'},
  subject: 'verification'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
   