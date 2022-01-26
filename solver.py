from nltk.corpus import words
import numpy as np
import sys
import string


yellow = set()
black = set()


def get_solutions(res, guess, colors, suggestions):
    for idx, status in enumerate(colors):
        if status == 'g':
            res[idx] = guess[idx]
        elif status == 'y':
            yellow.add(guess[idx])
        else:
            black.add(guess[idx])
    temp = suggestions.copy()
    for word in temp:
        flag = True
        for letter in black:
            if letter in word:
                suggestions.remove(word)
                flag = False
                break
        if flag:
            for letter in yellow:
                if letter not in word:
                    suggestions.remove(word)
                    flag = False
                    break
        if flag:
            for idx, letter in enumerate(res):
                if letter != "0":
                    if letter != word[idx]:
                        suggestions.remove(word)
                        break
    return res, suggestions


def main():
    res = ["0", "0", "0", "0", "0"]
    dictionary = words.words()
    suggestions = set()
    for word in dictionary:
        if len(word) == 5:
            suggestions.add(word)
    for i in range(0, 6):
        print("Enter the word: ")
        guess = input()
        print("Enter result: ")
        colors = input()
        res, suggestions = get_solutions(res, guess, colors, suggestions)
        print(res)
        print(suggestions)
        print(len(suggestions))
        i += 1


if __name__ == "__main__":
    main()