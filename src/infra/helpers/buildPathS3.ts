export default (fileName: string): string => {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${fileName}`;
};
