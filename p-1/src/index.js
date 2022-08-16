import 'my-p5-ex';
import { getTokenData, Random } from './lib/abUtil';
import { Shape } from './module/Shape';

let w,
  h,
  canvasSize,
  R,
  unit,
  objs = [],
  util = p5ex.Utility,
  r = () => R.random_dec();

/* オプション */
const options = {
  objectNum: 3, // オブジェクトの総数
  turnBackCount: 10, // 折り返す数
};

// window.tokenData = getTokenData(123);
window.tokenData = {
  hash: '0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738',
  tokenId: '123000186',
};

const init = () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvasSize = Math.min(w, h);
  unit = canvasSize / 100; // baseUnit
  R = new Random();
};

const main = () => {
  background(r(), r(), r());
  strokeWeight(max(1, unit * 0.1));

  // パスを生成し、objsにpush
  new util.Iterator(options.objectNum, drawCount => {
    let paths = []; // パス
    new util.Iterator(options.turnBackCount + drawCount, count => {
      paths.push(createVector(r(), r())); // 座標をランダムに生成し、配列に代入
    });
    objs.push(paths);
  });

  // 描画
  objs.forEach(obj => {
    stroke(r(), r(), 1);
    fill(r(), r(), r(), 0.5);
    new Shape(
      obj.map(path => path.mult(canvasSize)),
      R,
      unit,
      canvasSize
    ).draw();
  });

  objs = []; // 描画が終わったらobjsを初期化
};

const setup = () => {
  init();
  createCanvas(canvasSize, canvasSize);
  colorMode(HSB, 1, 1, 1, 1);
  main();
}

const windowResized = () => {
  init();
  resizeCanvas(canvasSize, canvasSize);
  main();
}

// グローバルに露出するメソッド
const exposures = [setup, windowResized];

// setupメソッドをグローバルオブジェクトに追加
exposures.forEach(exposure => (window[exposure.name] = exposure));
