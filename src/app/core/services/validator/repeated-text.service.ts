import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimilarWordService {

  constructor() { }

   public getSimilarWords(words: string[], wordToCompare: string): string[] {
    const SIMILARITY_ACCEPTED_LEVEL = 65;
    return words.filter( (word) => {
      return this.wordsSimilarity(word, wordToCompare) >= SIMILARITY_ACCEPTED_LEVEL;
    });
  }

  private wordsSimilarity(wrd1: string, wrd2: string): number {
    const longestLenght = wrd1.length > wrd2.length ? wrd1.length : wrd2.length;
    if (wrd1 && wrd2) {
      let sameLetterCounter = 0;
      wrd1 = this.transformWord(wrd1);
      wrd2 = this.transformWord(wrd2);
      for (let i = 0; i < longestLenght ; i++) {
        if (wrd1[i] === wrd2[i]) { sameLetterCounter++; }
      }
      return this.calculateSimilarityPercentage(longestLenght, sameLetterCounter);
    }
    return 0;
  }

  private calculateSimilarityPercentage(ammoutOfLetter: number, sameLetterCounter: number) {
    const differencePercentage =  (ammoutOfLetter - sameLetterCounter) * 100 / ammoutOfLetter;
    return 100 - differencePercentage;
  }

  private transformWord(word: string): string {
    const SPACE = ' ';
    const EMPTY_SPACE = '';
    word = word.toLowerCase();
    return word.replace(SPACE, EMPTY_SPACE);
  }
}
