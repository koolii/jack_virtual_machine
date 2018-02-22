import Parser from './parser'
import CodeWriter from './code-writer'
import Logger from './logger'

export default class VMTranslator {
  logger: Logger
  parser: Parser
  writer: CodeWriter

  constructor() {
    this.logger = new Logger(VMTranslator)
    this.parser = new Parser()
    this.writer = new CodeWriter()
    this.logger.constructor('construct')
  }

  setup() {}
  exec() {}
  after() {}
}
