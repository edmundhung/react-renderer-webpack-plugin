function exportModule(module) {
  const isEsModule = module.hasOwnProperty('__esModule');
  const hasDefault = typeof module.default === 'function';

  let exports;

  if (isEsModule && hasDefault) {
    exports = module.default;

    Object
      .keys(module)
      .filter(func => func !== 'default')
      .forEach(key => {
        exports[key] = module[key];
      });
  } else {
    exports = module;
  }

  return exports;
}

export default exportModule;
