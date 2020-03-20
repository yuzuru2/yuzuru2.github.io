<template>
  <div>
    <!-- 時間 -->
    <div class="d-flex justify-content-center">
      <div class="maru bg-primary text-white">
        <span id="time">
          {{ $store.state.top.time }}
        </span>
      </div>
    </div>

    <hr />

    <div class="d-flex justify-content-center">
      <div class="row bg-light">
        <div class="shikaku">
          <span id="left">{{ $store.state.top.left }}</span>
        </div>
        <div class="shikaku">
          <span id="sign">{{ $store.state.top.sign }}</span>
        </div>
        <div class="shikaku">
          <span id="right">{{ $store.state.top.right }}</span>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <div class="row">
        <div style="font-size: 70px;">=</div>
        <div class="maru bg-warning">
          <span id="ans">{{ $store.state.top.ans }}</span>
        </div>
      </div>
    </div>

    <hr />

    <div class="d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-success"
        id="yes"
        @click="yes($store.state.top.result)"
      >
        YES
      </button>

      <button
        type="button"
        class="btn btn-danger"
        id="no"
        @click="no($store.state.top.result)"
      >
        NO
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Calculation } from 'src/Calculation.ts';

export default {
  data() {
    return {};
  },
  methods: {
    yes(result: boolean) {
      result ? alert('正解') : alert('不正解');
      Calculation.get_instance().start(this.$store);
    },
    no(result: boolean) {
      result ? alert('不正解') : alert('正解');
      Calculation.get_instance().start(this.$store);
    }
  },
  created() {
    Calculation.get_instance().start(this.$store);
  }
};
</script>
