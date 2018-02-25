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

    for (const path of pathes) {
      await this.parseFile(path)
    }
  }

  setup() {}
  after() {}

  private async parseFile(path: string) {
    const read = this.parser.getReaderByFs(path)
    await this.writer.setFileName(path)

    while (true) {
      const line = read()
      if (line === constants.EOF) {
        break
      }
      if (this.parser.hasMoreCommands(line)) {
        const parsed = this.parser.advance(line)
        // this.logger.exec(JSON.stringify(parsed))
        this.writer.write(JSON.stringify(parsed))
      }
    }
  }
}
