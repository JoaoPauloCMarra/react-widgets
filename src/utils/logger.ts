export const logError = (title: string, error: any) => {
  console.log(`%c\n${title}\n${error}\n`, 'color: #ff9800; font-size: 16px; line-height: 1.8;');
  console.error('Error Stack: \n', error);
};

export default {};
