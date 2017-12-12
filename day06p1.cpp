#include <stdio.h>
#include <stdlib.h>
#include <vector>

const int INPUT_SIZE = 16;

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

bool compare(int *a, int *b) {
  for (int i = 0; i < INPUT_SIZE; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
}

int main() {
  // int input[INPUT_SIZE] = {0, 2, 7, 0};
  int input[INPUT_SIZE] = {2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14};

  std::vector<int*> memos;

  memos.push_back(input);

  int steps = 0;
  int *next = input;

  while (true) {
    next = redistribute(next);

    memos.push_back(next);

    steps++;

    for (int i = 0; i < memos.size(); i++) {
      for (int j = i + 1; j < memos.size(); j++) {
        if (compare(memos[i], memos[j])) {
          goto allLoops;
        }
      }
    }
  }
allLoops:

  printf("%i\n", steps);

  exit(0);
}
