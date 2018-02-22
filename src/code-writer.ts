import Logger from './logger'

export default class CodeWriter {
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
