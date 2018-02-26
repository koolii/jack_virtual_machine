import Logger from './logger'
import constants from './constants'

export class Stack {
  logger: Logger
  list: string[]
  sp: number

  constructor() {
    this.logger = new Logger(Stack)
    this.list = Array(constants.INTERVAL_STACK_LENGTH)
    this.sp = 0
  }

  push(value: number|string): void {
    // 配列数が足りなくなったら補充する
    if (this.sp === constants.INTERVAL_STACK_LENGTH) {
      this.logger.push('this.list is short and it adds more list.')
      this.list = this.list.concat(Array(constants.INTERVAL_STACK_LENGTH))
    }
    this.list[this.sp] = String(value)
    this.sp += 1
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
