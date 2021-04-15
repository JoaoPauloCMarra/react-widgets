!(function (doc) {
  const assetServer = 'http://localhost:5000';
  let id = 'react-widgets-asset';
  let script,
    style,
    scriptId = `${id}-js`,
    styleId = `${id}-css`;

  const onCssLoaded = () => {
    if (!doc.getElementById(scriptId)) {
      script = doc.createElement('script');
      script.id = scriptId;
      script.crossOrigin = true;
      script.type = 'text/javascript';
      script.src = `${assetServer}/app.js`;
      doc.body.appendChild(script);
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
