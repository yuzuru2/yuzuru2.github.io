import { i_store } from 'src';

export class Calculation {
  private static instance: Calculation;
  private store: i_store;

  private time_id;

  // シングルトン
  private constructor() {}

  // 問題セット
  private set_question(left, sign, right) {
    this.store.commit('top_set_left', left);
    this.store.commit('top_set_sign', sign);
    this.store.commit('top_set_right', right);
  }

  // 答えセット
  private set_answer(ans: string) {
    this.store.commit('top_set_ans', ans);
  }

  // 足し算
  private sum(result: boolean) {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    this.set_question(_left, '+', _right);

    if (result) {
      this.store.commit('top_set_result', true);
      this.set_answer(`${_left + _right}`);
      return;
    }

    this.store.commit('top_set_result', false);

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
  private minus(result: boolean) {
    const _left = Math.floor(Math.random() * 100) + 1;
    const _right = Math.floor(Math.random() * 100) + 1;

    this.set_question(_left, '-', _right);

    if (result) {
      this.store.commit('top_set_result', true);
      this.set_answer(`${_left - _right}`);
      return;
    }

    this.store.commit('top_set_result', false);

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
  private multiplication(result: boolean) {
    const _left = Math.floor(Math.random() * 10) + 1;
    const _right = Math.floor(Math.random() * 10) + 1;

    this.set_question(_left, '×', _right);

    if (result) {
      this.store.commit('top_set_result', true);
      this.set_answer(`${_left * _right}`);
      return;
    }

    this.store.commit('top_set_result', false);

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
  private division(result: boolean) {
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

    if (result) {
      this.store.commit('top_set_result', true);
      this.set_answer(`${_left / _right}`);
      return;
    }

    this.store.commit('top_set_result', false);

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
      this.store.commit('top_set_time', --this.store.state.top.time);
      if (this.store.state.top.time === 0) {
        alert('タイムアップ');
        this.reset();
        return;
      }
      this.time_id = setTimeout(time_method, 1000);
    };

    clearTimeout(this.time_id);

    this.store.commit('top_set_time', 15);
    this.time_id = setTimeout(time_method, 1000);

    // 正解・不正解どちらの問題を出すか決める
    const result = Math.floor(Math.random() * 2) === 0;

    // 計算種類
    const _sign = Math.floor(Math.random() * 4);
    switch (_sign) {
      case 0:
        this.sum(result);
        break;

      case 1:
        this.minus(result);
        break;

      case 2:
        this.multiplication(result);
        break;

      case 3:
        this.division(result);
        break;

      default:
        break;
    }
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
  public start(store: i_store) {
    this.store = store;
    this.reset();
  }
}
