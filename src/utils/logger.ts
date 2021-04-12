export const logError = (title: string, error: any, color?: string) => {
  console.log(`%c\n${title}\n${error}\n`, `color: ${color || '#ff9800'}; font-size: 14px; line-height: 1.8;`);
  console.error('Error Stack: \n', error);
};

export default {};
