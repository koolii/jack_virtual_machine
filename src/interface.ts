export interface IParser {
  // さらにコマンドが存在するかチェック
  hasMoreCommands():void
  // 次のコマンドを読み込み、それを現コマンドとする
  // ここの結果がtrueの場合のみ、本ルーチンを呼ぶようにする
  advance():void
  // VMコマンドの種類を返す、算術コマンドは全てC_ARITHMETIC
  commandType():void
  // 現コマンドの最初の引数が返される
  // 算術コマンドの場合コマンド自体が帰る
  // C_RETURNの場合は、本ルーチンは呼ばない
  arg1(row: string):void
  // 現コマンドの２番めのひきすうがかえされる
  // C_PUSH/C_POP/C_FUNCTION/C_CALLの場合のみ本ルーチンを呼ぶようにする
  arg2(row: string):number
}

export interface ICodeWriter {
  // Vmファイルの変換が開始したことを知らせる
  setFileName():void
  // 算術コマンドをアセンブリコードに変換し、書き込む
  writeArithmetic():void
  // C_PUSHまたはC_POPコマンドをアセンブリコードに変換し、書き込む
  writePushPop():void
  // 出力ファイルを閉じる
  close():void
}

// 読み込んだファイルのパスとその内容(line)を保持するための型
export interface IM_FILE {
  path: string
  line: string[]
}
