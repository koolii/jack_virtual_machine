import * as fs from 'fs-extra'
import * as glob from 'glob'
import { createInterface, ReadLine } from 'readline'
import Logger from './logger'
import { IParser, IM_FILE, I_CMD } from './interface'
import constants from './constants'

const ARG2_CMD: string[] = [
  constants.COMMAND.C_PUSH,
  constants.COMMAND.C_POP,
  constants.COMMAND.C_FUNCTION,
  constants.COMMAND.C_CALL,
]
const CMD = constants.COMMAND

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

    const files = []
    for (const path of pathes) {
      const fileContents: IM_FILE = await this.loadFile(path)
      files.push(fileContents)
    }

    this.logger.load(JSON.stringify(files, null, '  '))
    this.files = files

    return files
  }

  private loadFile(path: string): Promise<IM_FILE> {
    const line: string[] = [];
    return new Promise((resolve) => {
      const stream: fs.ReadStream = fs.createReadStream(path, 'utf-8')
      const readLine: ReadLine = createInterface({ input: stream })

      readLine
        .on('close', () => { resolve({ path, line }) })
        .on('line', (l: string) => {
          // remove empty letter and comment part
          // 空白文字を削除しては行けない（この場所では）
          // 複数スペースを削除する
          // https://qiita.com/Yinaura/items/aa90473cb4a876e4988f
          // const fillOutEmpty = l.replace(/ /g, '')
          const hasCommentCharacter = l.match('//')
          const formatedLine = !hasCommentCharacter ? l : l.substring(0, hasCommentCharacter.index)

          // セミコロンは別行として加算する
          formatedLine.split(';').forEach((l: string) => {
            if (l !== '') {
              line.push(l)
            }
          })
        })
    })
  }

  hasMoreCommands() {}

  advance(line: string): I_CMD {
    const opes = line.split(' ')

    if (!opes[0]) {
      throw new Error('line has no charactors. It it funny.')
    }

    const type = this.commandType(opes[0])
    const res = {
      line,
      type,
      arg1: this.arg1(type, opes),
      arg2: this.arg1(type, opes),
    }
    return res
  }

  arg1(type: string, operator: string[]): string {
    let result
    switch (type) {
      case CMD.C_RETURN:
        result = null
        break
      case CMD.C_ARITHMETIC:
        result = operator[0]
        break
      default:
        if (!operator[1]) {
          throw new Error('arg1 does not have any arguments.')
        }
        result = operator[1]
    }
    return result
  }

  // todo ここは只の一行の文字列だとコマンドをはんて出来ないのでModelを作成して渡す
  arg2(type: string, operator: string[]): number {
    if ([CMD.C_PUSH, CMD.C_POP, CMD.C_FUNCTION, CMD.C_CALL].includes(type)) {
      if (!operator[2]) {
        throw new Error('arg2 doesnot have a second argument.')
      }
      return Number(operator[2])
    }
    return null
  }

  commandType(operator: string): string {
    switch (operator) {
      case 'push':
        return CMD.C_PUSH
      case 'pop':
        return CMD.C_POP
      case 'label':
        return CMD.C_LABEL
      case 'goto':
        return CMD.C_GOTO
      case 'if':
        return CMD.C_IF
      case 'function':
        return CMD.C_FUNCTION
      case 'return':
        return CMD.C_RETURN
      case 'call':
        return CMD.C_CALL
      default:
        return CMD.C_ARITHMETIC
    }
  }
}
