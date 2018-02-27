import Logger from './logger'
import Stack from './stack'

export default class Memory {
  logger: Logger
  list: Object

  constructor() {
    this.logger = new Logger(Memory)
    this.list = {
      // 関数の引数を格納
      argument: new Stack(),
      // 関数のローカル変数を格納
      local: new Stack(),
      // スタティック変数を格納
      // vmファイルの全ての関数で共有される
      static: new Stack(),
      // 0-32767までの範囲の全ての定数値を持つ
      constant: new Stack(),
      // 汎用セグメント
      // 異なるヒープ領域に対応する
      this: new Stack(),
      that: new Stack(),
      // this/thatセグメントのベースアドレスを持つ2つの要素
      pointer: new Stack(),
      // 固定された8つの要素からなるセグメント
      // 一時的な変数を格納する
      temp: new Stack(),
    }
  }

  push(stack: string, param: any): void {
    const s: Stack = this.list[stack]
    s.push(param)
  }

  pop(stack: string, index: number): any {
    // this.logger.pop(JSON.stringify(this.list))
    const s = this.list[stack]

    if (!s.isAccessIndex(index)) {
      throw new Error(`cannot access stack[${stack}] index[${index}]`)
    }
    return s.pop()
  }
}
