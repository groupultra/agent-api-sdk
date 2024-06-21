import moobiusSdk from '../dist/node/moobius-api-sdk.cjs';

const _mSdk = moobiusSdk({
  url: 'https://api.moobius.net',
});

_mSdk.auth
  .SignIn({
    username: 'yihang19950903@gmail.com',
    password: '12345678',
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
