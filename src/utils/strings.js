const firstLetterToUpperCase = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const snakeCaseToSentence = str => str.split('_').join(' ');

export { firstLetterToUpperCase, snakeCaseToSentence };
