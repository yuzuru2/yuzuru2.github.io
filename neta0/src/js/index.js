// くそIEに対応させる
import 'babel-polyfill';

const calculation = () => {
  let count = 20;
  let time_id;

  // 問題セット
  const set_question = (left, sign, right) => {
    document.getElementById('left').textContent = left;
    document.getElementById('sign').textContent = sign;
    document.getElementById('right').textContent = right;
  };

  // 足し算
  const sum = ans => {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    set_question(_left, '+', _right);

    if (ans) {
      document.getElementById('ans').textContent = _left + _right;
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      document.getElementById('ans').textContent =
        _left + _right + (Math.floor(Math.random() * 3) + 1);
      return;
    }

    // 不正解作成パターン2
    document.getElementById('ans').textContent =
      _left + _right - (Math.floor(Math.random() * 3) + 1);
  };

  // 引き算
  const minus = ans => {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    set_question(_left, '-', _right);

    if (ans) {
      document.getElementById('ans').textContent = _left - _right;
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      document.getElementById('ans').textContent =
        _left - _right + (Math.floor(Math.random() * 3) + 1);
      return;
    }

    // 不正解作成パターン2
    document.getElementById('ans').textContent =
      _left - _right - (Math.floor(Math.random() * 3) + 1);
  };

  // 掛け算
  const multiplication = ans => {
    const _left = Math.floor(Math.random() * 10) + 1;
    const _right = Math.floor(Math.random() * 10) + 1;

    set_question(_left, '×', _right);

    if (ans) {
      document.getElementById('ans').textContent = _left * _right;
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      document.getElementById('ans').textContent =
        _left * _right + (Math.floor(Math.random() * 3) + 1);
      return;
    }

    // 不正解作成パターン2
    document.getElementById('ans').textContent =
      _left * _right - (Math.floor(Math.random() * 3) + 1);
  };

  // 割り算
  const division = ans => {
    let _left;
    let _right;

    while (1) {
      _left = Math.floor(Math.random() * 100) + 1;
      _right = Math.floor(Math.random() * 10) + 1;
      if (_left % _right === 0) {
        break;
      }
    }

    set_question(_left, '÷', _right);

    if (ans) {
      document.getElementById('ans').textContent = _left / _right;
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      document.getElementById('ans').textContent =
        _left / _right + (Math.floor(Math.random() * 3) + 1);
      return;
    }

    // 不正解作成パターン2
    document.getElementById('ans').textContent =
      _left / _right - (Math.floor(Math.random() * 3) + 1);
  };

  // タイマー処理
  const time_method = () => {
    document.getElementById('time').textContent = --count;

    if (count === 0) {
      alert('タイムアップ');
      reset();
      return;
    }
    time_id = setTimeout(time_method, 1000);
  };

  // reset
  const reset = () => {
    main();
  };

  // main
  const main = () => {
    clearTimeout(time_id);

    count = 20;
    time_id = setTimeout(time_method, 1000);

    // 時間セット
    document.getElementById('time').textContent = count;

    // 正解・不正解どちらの問題を出すか決める
    const ans = Math.floor(Math.random() * 2) === 0;

    // 計算種類
    const _sign = Math.floor(Math.random() * 4);
    switch (_sign) {
      case 0:
        sum(ans);
        break;

      case 1:
        minus(ans);
        break;

      case 2:
        multiplication(ans);
        break;

      case 3:
        division(ans);
        break;

      default:
        break;
    }

    // yesボタンを押したとき
    document.getElementById('yes').onclick = () => {
      ans ? alert('正解') : alert('不正解');
      reset();
    };

    // noボタンを押したとき
    document.getElementById('no').onclick = () => {
      ans ? alert('不正解') : alert('正解');
      reset();
    };
  };

  main();
};

calculation();
