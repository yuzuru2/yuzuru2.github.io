const dir = 'rarala2020_2';

const firebaseConfig = {
  apiKey: 'AIzaSyB8olQXWPvTu9nehgWClS7PZzRLKUrqEtw',
  authDomain: 'fddfd-f7b92.firebaseapp.com',
  databaseURL: 'https://fddfd-f7b92.firebaseio.com',
  projectId: 'fddfd-f7b92',
  storageBucket: 'fddfd-f7b92.appspot.com',
  messagingSenderId: '301190636009',
  appId: '1:301190636009:web:3ee8471f31d4aa64fcab78',
  measurementId: 'G-854P4MZ60D',
};

firebase.initializeApp(firebaseConfig);

// https://so-zou.jp/web-app/tech/programming/javascript/sample/get.htm
// getパラメータ取得
function GetQueryString() {
  var result = {};
  if (1 < window.location.search.length) {
    // 最初の1文字 (?記号) を除いた文字列を取得する
    var query = window.location.search.substring(1);

    // クエリの区切り記号 (&) で文字列を配列に分割する
    var parameters = query.split('&');

    for (var i = 0; i < parameters.length; i++) {
      // パラメータ名とパラメータ値に分割する
      var element = parameters[i].split('=');

      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);

      // パラメータ名をキーとして連想配列に追加する
      result[paramName] = paramValue;
    }
  }
  return result;
}

// https://qiita.com/mas0061/items/c2e9cd0d27e09448d28e
// サニタイズ
const sanitaize = {
  encode: function (str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};

const main = async () => {
  const params = GetQueryString();

  if (params['q'] === undefined) {
    location.href = `/${dir}`;
    return;
  }

  const _ret = await firebase
    .firestore()
    .collection('info')
    .doc(params['q'])
    .get();

  if (!_ret.exists) {
    location.href = `/${dir}`;
    return;
  }

  const _data = _ret.data();
  document.getElementById('textarea').value = sanitaize.encode(
    _data['message']
  );

  document.getElementById(
    'tweet'
  ).href = `http://twitter.com/share?url=${location.href.replace(
    location.search,
    ''
  )}${encodeURIComponent(location.search)}`;

  document.getElementById('loading').style.display = 'none';
  document.getElementById('info').style.display = 'block';

  document.getElementById('back').href = `/${dir}`;
};

main();
