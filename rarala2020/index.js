const MY_DOMAIN = 'https://odbri1u2.page.link';

const API_KEY = 'AIzaSyB8olQXWPvTu9nehgWClS7PZzRLKUrqEtw';

document.getElementById('button').onclick = async () => {
  if (document.getElementById('input').value.length === 0) {
    alert('未入力');
    return;
  }

  const _res = await fetch(
    'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + API_KEY,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longDynamicLink:
          MY_DOMAIN + '/?link=' + document.getElementById('input').value,
        suffix: {
          option: 'SHORT',
        },
      }),
    }
  );

  const json = await _res.json();

  document.getElementById('output').textContent = json['shortLink'];
};
