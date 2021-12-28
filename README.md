DictionaryTrie Webpage Overview

Inspired by the [NYT's spelling bee puzzle](https://www.nytimes.com/puzzles/spelling-bee), this project is a simple interactive webpage that displays dictionary words that can be generated with a set of letters. 

The letters field is the set of possible letters, the required field represents a character or string that must be included in the solution word, and the minimum length is how long a word must be to be a solution word. 

The webpage calls an [AWS hosted restAPI](https://github.com/nboadcodes/wordFinderLambda) and displays the output in the text box below. Note that the [wordlist](https://github.com/dwyl/english-words/blob/master/words.txt) used contains a lot of non-dictionary words. 