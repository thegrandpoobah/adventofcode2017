#include <stdio.h>
#include <stdlib.h>
#include <vector>
#include <map>

const int INPUT_SIZE = 16;

struct TrieNode {
  int position;

  std::map<int, TrieNode *> chain;
};

int *redistribute(int *input) {
  int max = 0;
  int maxIndex = 0;

  int *output = new int[INPUT_SIZE];

  for (int i = 0; i < INPUT_SIZE; i++) {
    output[i] = input[i];

    if (input[i] > max) {
      max = input[i];
      maxIndex = i;
    }
  }

  int blockCount = input[maxIndex];
  output[maxIndex] = 0;

  while (blockCount!=0) {
    maxIndex++;
    output[maxIndex % INPUT_SIZE]++;
    blockCount--;
  }

  return output;
}

int add_to_trie(TrieNode *trie, int *input, int iteration) {
  TrieNode *cur = trie;

  int position = -1;
  bool divergent = false;

  for (int i = 0; i < INPUT_SIZE; i++) {
    if (cur->chain.find(input[i]) == cur->chain.end()) {
      TrieNode *t = new TrieNode();
      cur->chain[input[i]] = t;

      divergent = true;
    }

    cur = cur->chain[input[i]];
  }

  if (divergent) {
    cur->position = iteration;

    return -1;
  } else {
    return cur->position;
  }
}

int main() {
  // int input[INPUT_SIZE] = {0, 2, 7, 0};
  int input[INPUT_SIZE] = {2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14};

  TrieNode *trie = new TrieNode();

  int steps = 0;
  int *next = input;

  while (true) {
    int old_position = add_to_trie(trie, next, steps);
    if (old_position != -1) {
      printf("part 1: %i\n", steps);
      printf("part 2: %i\n", steps - old_position);
      break;
    }

    next = redistribute(next);

    steps++;
  }

  exit(0);
}
