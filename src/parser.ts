import Logger from './logger'
import { IParser } from './interface'
import constants from './constants'

const ARG2_CMD: string[] = [
  constants.COMMAND.C_PUSH,
  constants.COMMAND.C_POP,
  constants.COMMAND.C_FUNCTION,
  constants.COMMAND.C_CALL,
]

export default class Parser implements IParser {
  logger: Logger
  outputPath: string

  constructor() {
    this.outputPath = __dirname + 'output.asm'
    this.logger = new Logger(Parser)
    this.logger.constructor('construct')
  }

  hasMoreCommands() {}
  advance() {}
  commandType() {}
  arg1() {}

  // todo ここは只の一行の文字列だとコマンドをはんて出来ないのでModelを作成して渡す
  arg2(row: string): number {
    if (!ARG2_CMD.includes('')) {
      throw new Error()
    }
    return 0
  }
}
