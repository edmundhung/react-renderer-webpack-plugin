function exportModule(module) {
  const isEsModule = module.hasOwnProperty('__esModule');
  const hasDefault = typeof module.default === 'function';
  const exports = isEsModule && hasDefault ? module.default : {};

  Object.keys(module).forEach(key => {
    exports[key] = module[key];
  });

  return exports;
}

export default exportModule;
