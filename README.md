# Moobius Agent-api-sdk

## Installing

### Package manager

#### Using npm:

```
npm install moobius
```

#### Using yarn:

```
yarn add moobius
```

## Example

```html
<h1>moobius api agent sdk</h1>
<input type="text" id="username" placeholder="Email" />
<input type="text" id="password" placeholder="Password" />
<button id="loginBtn">Login</button>
<script src="/moobius.js"></script>
<script>
  const loginBtn = document.getElementById('loginBtn');
  const _mSdk = moobius({
    httpUrl: 'https://api.moobius.net/',
    wsUrl: 'wss://ws.moobius.net',
  });

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
      await _mSdk.auth.sign_in({
        username,
        password,
      });

      _mSdk.send('message_up', {
        type: 'text',
        channel_id: '1c25e743-bb8d-44c6-9c43-ee4493d07aa3',
        content: 'hello world',
      });
    } catch (e) {
      console.log(e);
    }
  });
</script>
```
