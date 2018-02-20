# jack_virtual_machine

今回のVM言語には４種類のコマンドが含まれる(この章では、上の２つを実装する)

* 算術
* メモリアクセス
* プログラムフロー
* サブルーチン呼出し

スタック処理は今回のVMのベースになっているため大きく取り上げる


プログラムを機械語に変換する作業（コンパイル）を実装することは大変で
高水準言語と機械語を対照した依存関係のあるプログラムを書かなければならない
なので言語に応じて別のコンパイラが必要になってくる

この依存性をなくすために中間コードをはさみ、機械語へと変換する
このメリットは高水準言語から中間コードへの変換は高水準言語にのみ集中すればよく、第二段階は機械語の仕様に注視すれば良いから(だからこそ真ん中のインタフェース層は重要になってくる)


バーチャルマシン用の言語を明示的に用いることのメリット
* 別のプラットフォームを対象としたコンパイラが必要な場合に、バーチャルマシンをリプレイスするだけで良い
* 複数の言語のコンパイラに寄って、同じVMを利用することができる(複数の言語をVMが扱えるなら一方の言語からもう一方の処理を呼び出すことができる)

スタックはLIFO(Last In, First Out)をpopとpushで実現している
スタックはどんどん、命令が積まれていく時に、次にどのアドレス（配列要素）に命令を追加するかを表すポインタを持っている(SP=スタックポインタ)

スタックアクセスの違い

* スタックでアクセス可能な場所はポインタが指している一番上の場所のみ
* スタックでの命令の読み込みはスタックから命令を削除するのと同義である
* スタックへの書き込みは一番上にデータを追加するだけで、その他のスタック内のデータには鑑賞しない

「シンプルさと優美さを兼ね備えたものは表現力も豊かである」というのが常
このスタックモデルはコンピュータシステムやアルゴリズムのいたるところで用いられるデータ構造

ここでのVMのスタックの主な目的
* VMにおける全ての算術命令と論理命令を扱うため
* サブルーチン呼び出しとメモリ配置を行うため

スタック算術
どうやってスタックに値がpushされて、計算するためにpop,計算された結果を再度スタックにpushするやり方のサンプルはP140を参照

* 四則演算
* if文の条件分岐

## VM仕様

* VMはスタックベース
* VMプログラムは関数毎にまとめられていて、それはVM言語で実装されている
* 16ビットのデータ型を持つ
* コマンド
  * 算術コマンド
  * メモリアクセスとコマンド
  * プログラムフローコマンド(次章)
  * 関数呼び出しコマンド(次章)
* 拡張子は[.vm]で、クラスに対応する

### コマンドのサンプル
* command (ex. add)
* command arg (ex. goto LOOP)
* command arg1 arg2 (ex. push local 3)

### 算術コマンド
スクショ参照(eq,lt等)

### メモリアクセスコマンド

```
// segment[index] をスタック上にプッシュする
push segment index
// スタックの一番上のデータをポップし、それをsegment[index]に格納する
pop segment index
```

push argument 2
pop local 1
と言うコマンドを実行すると、関数の3つ目の引数の値をその関数の二番目のlocal変数に格納する
※セグメントのindexは0からスタートする

VMでは複数のメモリを実装するが、それぞれがスタックを介してでないとメモリ同士の値の移動はできない