export const generateButtonText = (connectionName: string) => {
  let label = connectionName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  if (label.length === 1) label = connectionName.substring(0, 3).toUpperCase();

  return label;
};

export default {
  generateButtonText,
};
