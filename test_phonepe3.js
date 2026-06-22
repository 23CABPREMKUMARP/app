async function getToken(host) {
  const params = new URLSearchParams();
  params.append('client_id', 'M228KB3D6IJHS_2606140644');
  params.append('client_version', '1');
  params.append('client_secret', 'ZjhlM2ViNDQtZTVkYS00ZDQ5LWJlZmYtNTIxNDNlYzQ5ZmNm');
  params.append('grant_type', 'client_credentials');

  const res = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });
  console.log(host, res.status, await res.text());
}

getToken('https://api.phonepe.com/apis/identity-manager/v1/oauth/token');
getToken('https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token');
