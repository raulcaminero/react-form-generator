module.exports = function (api) {
    api.cache(true);
  
    const presets = [ "es2015",
    {
      "modules": false
    } ];
    const plugins = [  require('@babel/plugin-proposal-decorators').default,
        {
           legacy: true
        } ];
  
    return {
      presets,
      plugins
    };
  }