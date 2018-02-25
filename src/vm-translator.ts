import Parser from './parser'
import CodeWriter from './code-writer'
import Logger from './logger'
import constants from './constants'

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
    const pathes = await this.parser.load()
    this.logger.exec('all pathes are ' + pathes.join(','))

    const path = pathes[0]
    const read = this.parser.getReaderByFs(path)

    while (true) {
      const line = read()
      if (line === constants.EOF) {
        break
      }
      this.logger.exec(JSON.stringify(this.parser.advance(line)))
    }
  }

  setup() {}
  after() {}
}
