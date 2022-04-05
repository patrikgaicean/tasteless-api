import { LoremIpsum } from "lorem-ipsum";

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// console.log(lorem.generateWords(1));
// console.log(lorem.generateSentences(5));
// console.log(lorem.generateParagraphs(2));
