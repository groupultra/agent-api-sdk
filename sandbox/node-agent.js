import moobiusSdk from '../dist/node/moobius-api-sdk.cjs';

const _mSdk = moobiusSdk({
  url: 'https://api.moobius.net/',
});

async function init() {
  console.log('init', _mSdk);
  await _mSdk.auth.signIn({
    username: 'yihang19950903@gmail.com',
    password: '12345678',
  });
  console.log('sign in success');
  const info = await _mSdk.user.getCurrentInfo();
  console.log(info);
}
init();
