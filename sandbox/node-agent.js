import moobius from '../dist/node/moobius.cjs';

const _mSdk = moobius({
  url: 'https://api.moobius.net/',
});

async function init() {
  try {
    console.log('init', _mSdk);
    await _mSdk.auth.sign_in({
      username: 'yihang19950903@gmail.com',
      password: '12345678',
    });
    console.log('sign in success');
  } catch (e) {
    console.error(e);
  }
}
init();
