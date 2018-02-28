import Logger from './logger'
import constants from './constants'

// このスタックは全体で1つしか無くて
// * pushするなら何処のなんという値をスタックに積めるか
// * popするなら何処に値を積めるか
// (P144) たとえば、「push argument 2」に続いて「pop local 1」という コマンドを実行すれば、
// 関数の 3 つ目の引数の値をその関数の 2 番目の local 変数 に格納する(セグメントの index は 0 から始まる)
export default class Stack {
  logger: Logger
  list: string[]
  sp: number

  constructor() {
    this.logger = new Logger(Stack)
    this.list = Array(constants.INTERVAL_STACK_LENGTH)
    this.sp = 0
    this.logger.constructor(`array length is ${this.list.length}`)
  }

  push(value: number|string): void {
    // 配列数が足りなくなったら補充する
    if (this.sp === constants.INTERVAL_STACK_LENGTH) {
      this.logger.push('this.list is short and it adds more list.')
      this.list = this.list.concat(Array(constants.INTERVAL_STACK_LENGTH))
    }
    this.list[this.sp] = String(value)
    this.sp += 1
    this.logger.push(`pushed ${value}, sp is ${this.sp}`)
  }

  // オペランドの場合はstringで、それ以外の数値はnumberで返す
  pop(): number|string {
    const value: string = this.list[this.sp]
    const integerVal = Number(value)
    this.sp -= 1
    return Number.isNaN(integerVal) ? value : integerVal
  }

  printPointer(): void {
    this.logger.printPointer(`Now, it's ${this.sp}.`)
  }
}
