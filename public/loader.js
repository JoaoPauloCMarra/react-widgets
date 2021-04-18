!(function (doc) {
  const assetServer = '';
  let id = 'react-widgets-asset';
  let style,
    vendor,
    script,
    styleId = `${id}-css`,
    vendorId = `${id}-vendor`,
    scriptId = `${id}-js`;

  const onVendorLoaded = () => {
    if (!doc.getElementById(scriptId)) {
      script = doc.createElement('script');
      script.id = scriptId;
      script.crossOrigin = true;
      script.type = 'text/javascript';
      script.src = `${assetServer}/app.js`;
      doc.body.appendChild(script);
    }
  };
  const onCssLoaded = () => {
    if (!doc.getElementById(vendorId)) {
      vendor = doc.createElement('script');
      vendor.id = vendorId;
      vendor.crossOrigin = true;
      vendor.onload = onVendorLoaded;
      vendor.type = 'text/javascript';
      vendor.src = `${assetServer}/vendor.js`;
      doc.body.appendChild(vendor);
    }
  };
  if (!doc.getElementById(styleId)) {
    style = doc.createElement('link');
    style.id = styleId;
    style.crossOrigin = true;
    style.onload = onCssLoaded;
    style.rel = 'stylesheet';
    style.href = `${assetServer}/app.css`;
    doc.body.appendChild(style);
  }
})(document);
