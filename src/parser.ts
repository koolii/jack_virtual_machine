import Logger from './logger'

export default class Parser {
  logger: Logger

  constructor() {
    this.logger = new Logger(Parser)
    this.logger.constructor('construct')
  }

  hasMoreCommands() {}
  advance() {}
  commandType() {}
  arg1() {}
  arg2() {}
}
