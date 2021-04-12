!(function (win, doc) {
  const assetServer = 'http://ASSET_SERVER/v1';

  let clientParams = win.ReactWidget.params || {};

  const onInitialized = () => {
    try {
      const locationSearch = location.search.substring(1);
      let query = {};

      if (locationSearch) {
        query = JSON.parse('{"' + locationSearch.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) =>
          key === '' ? value : decodeURIComponent(value),
        );
      }

      if (!Array.isArray(clientParams)) {
        clientParams = [clientParams];
      }

      for (let i = 0; i < clientParams.length; i++) {
        const params = clientParams[i];
        const widgetParams = {
          id: query.id || params.id,
          token: query.token || params.token,
          widget: query.widget || params.widget,
          language: query.language || params.language,
        };
        win.ReactWidget.initiate(widgetParams);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onVendorLoad = () => {
    if (!doc.getElementById(scriptId)) {
      script = doc.createElement('script');
      script.id = scriptId;
      script.crossOrigin = true;
      script.type = 'text/javascript';
      script.onload = () => onInitialized();
      script.src = assetServer + '/script.js';
      doc.body.appendChild(script);
    }
  };
  const onCssLoaded = () => {
    if (!doc.getElementById(vendorId)) {
      vendor = doc.createElement('script');
      vendor.id = vendorId;
      vendor.crossOrigin = true;
      vendor.type = 'text/javascript';
      vendor.onload = onVendorLoad;
      vendor.src = assetServer + '/vendor.js';
      doc.body.appendChild(vendor);
    }
  };

  var id = 'react-widgets-asset';
  var vendor,
    script,
    style,
    vendorId = id + '-vendor',
    scriptId = id + '-js',
    styleId = id + '-css';
  if (!doc.getElementById(styleId)) {
    style = doc.createElement('link');
    style.id = styleId;
    style.crossOrigin = true;
    style.onload = onCssLoaded;
    style.rel = 'stylesheet';
    style.href = assetServer + '/style.css';
    doc.body.appendChild(style);
  }
})(window, document);
