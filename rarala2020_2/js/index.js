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

document.getElementById('button').onclick = async () => {
  try {
    const _message = document.getElementById('textarea').value;

    if (_message.length === 0) {
      alert('未入力です');
      return;
    }

    document.getElementById('textarea').value = '';

    // データ挿入
    const _ret = await firebase.firestore().collection('info').add({
      message: _message,
    });

    location.href = `/${dir}/sub.html?q=${_ret.id}`;
  } catch (error) {
    console.log(error);
    alert('エラー発生');
  }
};
