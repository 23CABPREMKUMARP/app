async function run() {
  const params = new URLSearchParams();
  params.append('client_id', 'M228KB3D6IJHS_2606140644');
  params.append('client_version', '1');
  params.append('client_secret', 'ZjhlM2ViNDQtZTVkYS00ZDQ5LWJlZmYtNTIxNDNlYzQ5ZmNm');
  params.append('grant_type', 'client_credentials');

  const tokenRes = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });
  
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;
  console.log("Token:", token.substring(0, 20) + "...");

  const payload = {
    merchantId: 'M228KB3D6IJHS_2606140644', // or M228KB3D6IJHS? Let's try full
    merchantOrderId: `TX${Date.now()}`,
    amount: 1000,
    paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment message used for collect requests",
        merchantUrls: {
            redirectUrl: "http://localhost:3000/api/phonepe/callback"
        }
    }
  };

  const payRes = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `O-Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  console.log("Pay:", payRes.status, await payRes.text());
}

run();
