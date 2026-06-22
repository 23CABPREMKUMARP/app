const crypto = require('crypto');

async function testEndpoint(name, host, merchantId, saltKey, saltIndex) {
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

  const response = await fetch(host, {
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
  console.log(`[${name}]`, data);
}

async function run() {
  const merchantId = 'M228KB3D6IJHS_2606140644';
  const saltKey = 'ZjhlM2ViNDQtZTVkYS00ZDQ5LWJlZmYtNTIxNDNlYzQ5ZmNm';
  
  await testEndpoint("Sandbox V1", "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", merchantId, saltKey, "1");
  await testEndpoint("Production V1", "https://api.phonepe.com/apis/hermes/pg/v1/pay", merchantId, saltKey, "1");
  await testEndpoint("Production V1 (Legacy)", "https://api.phonepe.com/apis/pg/v1/pay", merchantId, saltKey, "1");
}

run();
