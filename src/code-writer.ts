import Logger from './logger'
import { ICodeWriter } from './interface'

export default class CodeWriter implements ICodeWriter {
  logger: Logger

  constructor() {
    this.logger = new Logger(CodeWriter)
    this.logger.constructor('construct')
  }

  setFileName() {}
  writeArithmetic() {}
  writePushPop() {}
  close() {}
}
