export default (fileName: string, resource: string): string => {
  const date = new Date();
  return `${resource}/${date.getFullYear()}/${date.getMonth() + 1}/${fileName}`;
};
