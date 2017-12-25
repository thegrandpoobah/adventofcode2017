// this implementation eats memory like its going out of fashion and needs
// around 10Gb of ram. furtermore to make sure it compiles correctly you must
// enable the -fshort-enums flag for GCC otherwise it would eat around 40GB (or more)
// of RAM
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

enum direction_t {
	up = 0,
	right,
	down,
	left,
};

enum nodestate_t {
	clean,
	weakened,
	infected,
	flagged,
};

static const int STARTX = 12;
static const int STARTY = 12;
static const uint64_t GRID_MAX_X = 100000;
static const uint64_t GRID_MAX_Y = 100000;
static const int ITERATIONS = 10000000;

int main() {
	FILE *fp = fopen("day22input.txt", "rt");
	if (fp == NULL) {
		return -1;
	}

	int32_t x = -STARTX;
	int32_t y = -STARTY;
	enum nodestate_t *grid = malloc(GRID_MAX_X * 2 * GRID_MAX_Y * 2 * sizeof(enum nodestate_t));
	if (grid == NULL) {
		printf("Could not allocated memory.\n");
		return -1;
	}
	memset(grid, 0, GRID_MAX_X * 2 * GRID_MAX_Y * 2 * sizeof(enum nodestate_t));

	int c;
	for (;;) {
		c = fgetc(fp);
		if (c == EOF) {
			break;
		}
		if (c == '\n') {
			y++;
			x = -STARTX;
			continue;
		}

		if (c == '#') {
			grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = infected;
		} else {
			grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = clean;
		}
		
		x++;
	}

	x = 0; y = 0;
	enum direction_t direction = up;
	uint32_t nodesInfected = 0;

	for (uint32_t i = 0; i < ITERATIONS; i++) {
		int directionDelta = 0;
		bool rotateLeft = false;
		bool rotateRight = false;
		bool reverse = false;

		enum nodestate_t state = grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)];
		enum nodestate_t nextState = clean;

		switch (state) {
			case clean:
				nextState = weakened;
				directionDelta = -1;
				rotateLeft = true;
				break;
			case weakened:
				nextState = infected;
				nodesInfected++;
				break;
			case infected:
				nextState = flagged;
				directionDelta = 1;
				rotateRight = true;
				break;
			case flagged:
				nextState = clean;
				directionDelta = 2;
				reverse = true;
				break;
		}

		direction = (enum direction_t)((((int)direction + directionDelta) % 4 + 4) % 4);
		grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = nextState;

		switch (direction) {
			case up:
				y--;
				break;
			case right:
				x++;
				break;
			case down:
				y++;
				break;
			case left:
				x--;
				break;
		}
	}

	printf("part 2 %i\n", nodesInfected);

	free(grid);

	fclose(fp);
}

