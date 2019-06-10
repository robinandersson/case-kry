const uppercaseFirstLetter = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const jsonIdToReadableString = id =>
  uppercaseFirstLetter(id)
    .split('_')
    .join(' ');

export { uppercaseFirstLetter, jsonIdToReadableString };
