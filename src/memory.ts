import Logger from './logger'
import Stack from './stack'

export default class Memory {
  logger: Logger
  stack: Stack
  segments: Object

  constructor() {
    this.logger = new Logger(Memory)
    this.stack = new Stack()
    this.segments = {
      // 関数の引数を格納
      argument: Array(100),
      // 関数のローカル変数を格納
      local: Array(100),
      // スタティック変数を格納
      // vmファイルの全ての関数で共有される
      static: Array(100),
      // 0-32767までの範囲の全ての定数値を持つ
      constant: Array(100),
      // 汎用セグメント
      // 異なるヒープ領域に対応する
      this: Array(100),
      that: Array(100),
      // this/thatセグメントのベースアドレスを持つ2つの要素
      pointer: Array(100),
      // 固定された8つの要素からなるセグメント
      // 一時的な変数を格納する
      temp: Array(100),
    }
  }

  push(segment: string, index: any): void {
    const segmentValues = this.segments[segment]
    if (segmentValues.length < (index - 1)) {
      throw new Error('short of array length')
    }
    const segmentValue = segmentValues[index - 1] || 99999
    this.logger.push('segmentValue is ' + segmentValue)
    this.stack.push(segmentValue)
    this.logger.push(JSON.stringify(this.stack))
  }

  pop(segment: string, index: number): void {
    // this.logger.pop(JSON.stringify(this.list))
    const value = this.stack.pop()
    const segmentValues = this.segments[segment]

    this.segments[segment][index - 1] = value
    // if (!segmentValues.isAccessIndex(index - 1)) {
    //   throw new Error(`cannot access segment[${segment}] index[${index - 1}]`)
    // }
  }
}
