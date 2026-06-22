const crypto = require('crypto');

async function test() {
  const merchantId = 'PGTESTPAYUAT';
  const saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
  const saltIndex = '1';
  const phonePeHost = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

  const payload = {
    merchantId: merchantId,
    merchantTransactionId: `T${Date.now()}`,
    merchantUserId: 'MUID123',
    amount: 1000, 
    redirectUrl: `http://localhost:3000/api/phonepe/callback`,
    redirectMode: "POST",
    callbackUrl: `http://localhost:3000/api/phonepe/callback`, 
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  const payloadString = JSON.stringify(payload);
  const base64EncodedPayload = Buffer.from(payloadString).toString("base64");

  const stringToSign = base64EncodedPayload + "/pg/v1/pay" + saltKey;
  const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
  const checksum = sha256 + "###" + saltIndex;

  const response = await fetch(phonePeHost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    body: JSON.stringify({
      request: base64EncodedPayload
    })
  });

  const data = await response.json();
  console.log(data);
}

test();
