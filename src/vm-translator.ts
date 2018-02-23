import Parser from './parser'
import CodeWriter from './code-writer'
import Logger from './logger'

export default class VMTranslator {
  logger: Logger
  parser: Parser
  writer: CodeWriter

  constructor() {
    const path = process.argv.slice(2)[0]

    this.logger = new Logger(VMTranslator)
    this.parser = new Parser(path)
    this.writer = new CodeWriter()
    this.logger.constructor('construct')
  }

  async exec() {
    await this.parser.load()
  }

  setup() {}
  after() {}
}
