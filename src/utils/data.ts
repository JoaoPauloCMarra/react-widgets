export const updateWidgetStyle = (widgetEl: any, theme: string, height?: string | number, width?: string | number) => {
  if (widgetEl && theme && !widgetEl?.className?.includes(theme)) {
    const [firstClassName] = widgetEl.className.split(' ');
    widgetEl.className = `${firstClassName} ${theme}`;
    let style = '';
    if (width) {
      style += `width:${width};`;
    }
    if (height) {
      style += `height:${height};`;
    }
    if (style.length > 0) {
      widgetEl.setAttribute('style', style);
    }
  }
};

export const toCamelCase = (str: string) => str.replace(/-(\w)/g, (_: any, c: any) => (c ? c.toUpperCase() : ''));
