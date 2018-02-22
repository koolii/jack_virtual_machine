import VMTranslater from './vm-translator'

(async () => {
  const vm = new VMTranslater()
  await vm.setup()
  await vm.exec()
  vm.after()
})()
