import * as EpnsAPI from "@epnsproject/sdk-restapi";
import * as ethers from "ethers";


const PK = 'REDACTED'; // throwaway delegate PK
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const sendNotification = async (recipient, message) => {
  try {
    const apiResponse = await EpnsAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `[Sigcure] Info:`,
        body: `[Sigcure] ${message}`,
      },
      payload: {
        title: `[Sigcure] Info:`,
        body: message,
        cta: '',
        img: ''
      },
      recipients: `eip155:1:${recipient}`  , // recipient address
      channel: 'eip155:1:0x3d4aaFbe86059d17C6263332c560f18C4F1Fec34', // your channel address
      env: 'mainnet'
    });
    
    // apiResponse?.status === 204, if sent successfully!
    console.log('API repsonse: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}