import * as fs from 'fs-extra'
import Logger from './logger'
import constants from './constants'
import { ICodeWriter } from './interface'

export default class CodeWriter implements ICodeWriter {
  logger: Logger
  filepath: string

  constructor() {
    this.logger = new Logger(CodeWriter)
    this.logger.constructor('construct')
  }

  async setFileName(filepath: string) {
    this.filepath = filepath.replace(constants.VM_FILE, constants.OUTPUT_FILE)
    await this.init()
  }

  writeArithmetic() {}
  writePushPop() {}

  close() {
    this.filepath = ''
  }

  private async init() {
    this.logger.init(this.filepath)
    const result = await fs.pathExists(this.filepath)
    if (result) {
      await fs.remove(this.filepath)
    } else {
      await fs.createFile(this.filepath)
    }
  }

  // temporary
  write(line: string): Promise<void> {
    return fs.appendFile(this.filepath, `${line}\n`, { encoding: 'utf-8' })
  }
}
