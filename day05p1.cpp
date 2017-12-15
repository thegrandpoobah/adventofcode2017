#include <stdio.h>
#include <stdlib.h>
#include <vector>

int main() {
  FILE *fp = fopen("day05input.txt", "rt");
  if (fp == NULL) {
    exit(-1);
  }

  char *line = NULL;
  size_t len = 0;
  ssize_t read;

  std::vector<int> list;

  while ((read = getline(&line, &len, fp)) != -1) {
    list.push_back(atoi(line));
  }

  int position = 0;
  int steps = 0;

  while (true) {
    steps++;

    int delta = list[position];
    list[position]++;
    position += delta;

    if (position < 0 || position > list.size() - 1) {
      break;
    }
  }

  printf("%i\n", steps);

  fclose(fp);
  if (line) {
    free(line);
  }

  exit(0);
}
