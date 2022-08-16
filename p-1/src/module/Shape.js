/**
 * @class Shape
 * バウンスしたシェイプ
 */
export class Shape {
  /**
   * @param {p5.Vector[]} paths - ベクトルを格納した配列
   * @param {Random} randomInstance - Randomクラスのインスタンス
   * @param {number} unit - 基本単位となる数値
   * @param {number} canvasSize - カンバスサイズ
   */
  constructor(paths, randomInstance, unit, canvasSize) {
    this.paths = paths;
    this.R = randomInstance;
    this.unit = unit;
    this.newPath = [];
    this.canvasSize = canvasSize;
  }

  /* 受け取ったパス間の頂点数を増やす */
  makeLerpPath() {

    // パスの数だけ実行する
    this.paths.forEach((path, count, paths) => {
      const position = {
        current: path,
        // カウントが配列要素の数まで達したら、次のパスを最初のベクトルにする
        target: (count + 1 === paths.length) ? paths[0] : paths[count + 1],
      };

      // lerpで頂点数を増やす
      const divCount = this.R.random_int(10, 300);

      for (let i = 0; i < divCount; i++) {
        const amount = map(i, 0, divCount, 0, 1);
        this.newPath.push({
          vector: p5.Vector.lerp(position.current, position.target, amount),
          count,
        });
      }
    });

  }
  
  /* 頂点を増やしたパスを変形 */
  transformPath() {
    this.newPath.forEach((path, i) => {
      path.vector.add(
        cos(i / (path.count + 1)) * this.unit + (this.R.random_dec() - 0.5) * this.unit * 0.2,
        sin(i / (path.count + 1)) * this.unit + (this.R.random_dec() - 0.5) * this.unit * 0.2
      );
    });
  }

  /* 頂点を増やしたパスからvertexを生成 */
  makeVertex() {
    this.newPath.forEach(path => vertex(path.vector.x, path.vector.y));
    vertex(this.newPath[0].vector.x, this.newPath[0].vector.y)
  }

  /* 描画処理 */
  draw() {
    this.makeLerpPath();
    this.transformPath();

    // 描画開始
    beginShape();

    this.makeVertex();

    // 描画終了
    endShape();
  }
}
