import moobiusSdk from '../dist/node/moobius-api-sdk.cjs';

const _mSdk = moobiusSdk({
  url: 'https://api.moobius.net',
});

console.log(moobiusSdk, _mSdk);
