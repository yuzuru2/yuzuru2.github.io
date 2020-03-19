// くそIEに対応させる
import 'babel-polyfill';

class Calculation {
  private static instance: Calculation;

  // 秒数
  private count = 15;

  // タイマーで使う
  private time_id;

  // シングルトン
  private constructor() {}

  // dom
  private readonly id_left = document.getElementById('left');
  private readonly id_sign = document.getElementById('sign');
  private readonly id_right = document.getElementById('right');
  private readonly id_ans = document.getElementById('ans');
  private readonly id_time = document.getElementById('time');
  private readonly id_yes = document.getElementById('yes');
  private readonly id_no = document.getElementById('no');

  // 問題セット
  private set_question(left, sign, right) {
    this.id_left.textContent = left;
    this.id_sign.textContent = sign;
    this.id_right.textContent = right;
  }

  // 答えセット
  private set_answer(ans: string) {
    this.id_ans.textContent = ans;
  }

  // 足し算
  private sum(ans: boolean) {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    this.set_question(_left, '+', _right);

    if (ans) {
      this.set_answer(`${_left + _right}`);
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      this.set_answer(
        `${_left + _right + (Math.floor(Math.random() * 3) + 1)}`
      );
    } else {
      // 不正解作成パターン2
      this.set_answer(
        `${_left + _right - (Math.floor(Math.random() * 3) + 1)}`
      );
    }
  }

  // 引き算
  private minus(ans: boolean) {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    this.set_question(_left, '-', _right);

    if (ans) {
      this.set_answer(`${_left - _right}`);
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      this.set_answer(
        `${_left - _right + (Math.floor(Math.random() * 3) + 1)}`
      );
    } else {
      // 不正解作成パターン2
      this.set_answer(
        `${_left - _right - (Math.floor(Math.random() * 3) + 1)}`
      );
    }
  }

  // 掛け算
  private multiplication(ans: boolean) {
    const _left = Math.floor(Math.random() * 10) + 1;
    const _right = Math.floor(Math.random() * 10) + 1;

    this.set_question(_left, '×', _right);

    if (ans) {
      this.set_answer(`${_left * _right}`);
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      this.set_answer(
        `${_left * _right + (Math.floor(Math.random() * 3) + 1)}`
      );
    } else {
      // 不正解作成パターン2
      this.set_answer(
        `${_left * _right - (Math.floor(Math.random() * 3) + 1)}`
      );
    }
  }

  // 割り算
  private division(ans: boolean) {
    let _left;
    let _right;

    while (1) {
      _left = Math.floor(Math.random() * 100) + 1;
      _right = Math.floor(Math.random() * 10) + 1;
      if (_left % _right === 0) {
        break;
      }
    }

    this.set_question(_left, '÷', _right);

    if (ans) {
      this.set_answer(`${_left / _right}`);
      return;
    }

    // 不正解作成パターン1
    if (Math.floor(Math.random() * 2) === 0) {
      this.set_answer(
        `${_left / _right + (Math.floor(Math.random() * 3) + 1)}`
      );
    } else {
      // 不正解作成パターン2
      this.set_answer(
        `${_left / _right - (Math.floor(Math.random() * 3) + 1)}`
      );
    }
  }

  // リセット
  private reset() {
    // タイマー処理
    const time_method = () => {
      this.id_time.textContent = `${--this.count}`;

      if (this.count === 0) {
        alert('タイムアップ');
        this.reset();
        return;
      }
      this.time_id = setTimeout(time_method, 1000);
    };

    clearTimeout(this.time_id);

    this.count = 15;
    this.time_id = setTimeout(time_method, 1000);

    // 時間セット
    this.id_time.textContent = `${this.count}`;

    // 正解・不正解どちらの問題を出すか決める
    const ans = Math.floor(Math.random() * 2) === 0;

    // 計算種類
    const _sign = Math.floor(Math.random() * 4);
    switch (_sign) {
      case 0:
        this.sum(ans);
        break;

      case 1:
        this.minus(ans);
        break;

      case 2:
        this.multiplication(ans);
        break;

      case 3:
        this.division(ans);
        break;

      default:
        break;
    }

    // yesボタンを押したとき
    this.id_yes.onclick = () => {
      ans ? alert('正解') : alert('不正解');
      this.reset();
    };

    // noボタンを押したとき
    this.id_no.onclick = () => {
      ans ? alert('不正解') : alert('正解');
      this.reset();
    };
  }

  // シングルトン 単一のインスタンスを返す
  public static get_instance(): Calculation {
    if (!this.instance) {
      this.instance = new Calculation();
    }

    // 生成済みのインスタンスを返す
    return this.instance;
  }

  // クイズをスタートする
  public start() {
    this.reset();
  }
}

Calculation.get_instance().start();
