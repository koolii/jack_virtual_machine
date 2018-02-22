export default class Util {
  // 一行をスペース毎に区切り、配列として返却する
  static splitBySpace(str: string): string[] {
    return str.split(' ')
  }
  // 文字列または数値を対象に、10進数を2進数へ変換し、16ビットになるように0で穴埋めする
  static getPaddedBinary(value: number | string): string {
    return ('0000000000000000' + (Number(value).toString(2) + '')).slice(-16)
  }
}
