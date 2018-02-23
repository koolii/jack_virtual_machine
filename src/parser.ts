import * as fs from 'fs-extra'
import * as glob from 'glob'
import { createInterface, ReadLine } from 'readline'
import Logger from './logger'
import { IParser, IM_FILE } from './interface'
import constants from './constants'

const ARG2_CMD: string[] = [
  constants.COMMAND.C_PUSH,
  constants.COMMAND.C_POP,
  constants.COMMAND.C_FUNCTION,
  constants.COMMAND.C_CALL,
]

export default class Parser implements IParser {
  logger: Logger
  inputPath: string
  files: IM_FILE[]

  constructor(path: string) {
    this.inputPath = path
    this.logger = new Logger(Parser)
    this.logger.constructor('construct')
  }

  async load(): Promise<IM_FILE[]> {
    const pathes = glob.sync(`${this.inputPath}/**/*.vm`)
    if (pathes.length === 0) {
      return Promise.reject(`can't find file pathes anywhere.`)
    }

    const load = pathes.map(path => this.loadFile(path))
    const fileDetails = await Promise.all(load)

    this.logger.load(JSON.stringify(fileDetails, null, '  '))
    this.files = fileDetails

    return fileDetails
  }

  private loadFile(path: string): Promise<IM_FILE> {
    const line: string[] = [];
    return new Promise((resolve) => {
      const stream: fs.ReadStream = fs.createReadStream(path, 'utf-8')
      const readLine: ReadLine = createInterface({ input: stream })

      readLine
        .on('line', (l) => {
          // remove empty letter and comment part
          // 空白文字を削除しては行けない（この場所では）
          // const fillOutEmpty = l.replace(/ /g, '')
          const hasCommentCharacter = l.match('//')
          const formatedLine = !hasCommentCharacter ? l : l.substring(0, hasCommentCharacter.index)

          if (formatedLine !== '') {
            line.push(formatedLine)
          }
        })
        .on('close', () => {
          resolve({
            path,
            line,
          })
        })
    })
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
