function genTokenData(projectNum) {
  let data = {};
  let hash = '0x';
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}
let tokenData = genTokenData(123);
// console.log(tokenData);

const util = p5ex.Utility;
const objectNum = 6; // オブジェクトの総数
const turnBackCount = 10; // 折り返す数

class Shape {
  /* 座標が入った配列を受け取る */
  constructor(paths) {
    this.paths = paths;
  }

  makeVertex() {
    // パスの数だけ実行する
    this.paths.forEach((path, count, paths) => {
      // console.log(path);
      const position = {
        current: path,
        target: paths[count + 1],
      };

      // 最後のパスの1つ前までループしたら処理を終了
      if (count + 1 === paths.length) return;

      // 現在のパスと次のパスの距離
      let dist = p5.Vector.dist(position.current, position.target);

      /* 方向 */
      const direction = p5.Vector.sub(position.current, position.target).normalize();

      // 距離の数だけ実行
      new util.Iterator(round(dist), i => {
        position.current.add(
          -direction.x + cos(i / 6 / (count + 1)) + (random() - 0.5) * 2,
          -direction.y + sin(i / 6 / (count + 1) + (random() - 0.5) * 2)
        );

        // vertexを生成
        vertex(position.current.x, position.current.y);
      });
    });
  }

  /* 描画処理 */
  draw() {
    // 描画開始
    beginShape();

    this.makeVertex();

    // 描画終了
    endShape();
  }
}

function setup() {
  randomSeed(tokenData.tokenId);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  background(random(1), random(1), random(1));

  // オブジェクトを生成
  new util.Iterator(objectNum, drawCount => {
    const paths = [];

    new util.Iterator(turnBackCount + drawCount, count => {
      // paths.push(createVector(random(0, width), random(0, height))); // 座標をランダムに生成し、配列に代入
      paths.push(createVector(random(0, width), random(0, height))); // 座標をランダムに生成し、配列に代入
    });

    // stroke(1);
    stroke(random(1), random(1), 1);
    fill(random(1), random(1), random(1), 0.5);
    new Shape(paths).draw();
  });
}
