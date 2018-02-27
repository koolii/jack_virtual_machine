import VMTranslater from './vm-translator'

(async () => {
  const vm = new VMTranslater()
  await vm.exec()
})()
