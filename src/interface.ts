export interface IParser {
  // さらにコマンドが存在するかチェック
  hasMoreCommands(line: string):boolean
  // 次のコマンドを読み込み、それを現コマンドとする
  // ここの結果がtrueの場合のみ、本ルーチンを呼ぶようにする
  advance(line: string):I_CMD
  // VMコマンドの種類を返す、算術コマンドは全てC_ARITHMETIC
  commandType(operator: string):string
  // 現コマンドの最初の引数が返される
  // 算術コマンドの場合コマンド自体が帰る
  // C_RETURNの場合は、本ルーチンは呼ばない
  arg1(type: string, operator: string[]):string
  // 現コマンドの２番めのひきすうがかえされる
  // C_PUSH/C_POP/C_FUNCTION/C_CALLの場合のみ本ルーチンを呼ぶようにする
  arg2(type: string, operator: string[]):number
}

export interface ICodeWriter {
  // Vmファイルの変換が開始したことを知らせる
  setFileName(filepath: string):void
  // 算術コマンドをアセンブリコードに変換し、書き込む
  writeArithmetic(parsed: I_CMD):void
  // C_PUSHまたはC_POPコマンドをアセンブリコードに変換し、書き込む
  writePushPop(parsed: I_CMD):void
  // 出力ファイルを閉じる
  close():void
}

// 読み込んだファイルのパスとその内容(line)を保持するための型
export interface IM_FILE {
  path: string
  line: string[]
}

export interface I_CMD {
  line: string
  type: string
  arg1: string|null
  arg2: number|null
}
