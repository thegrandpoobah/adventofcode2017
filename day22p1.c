#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

enum direction_t {
	up,
	right,
	down,
	left,
};

static const int STARTX = 12;
static const int STARTY = 12;
static const int GRID_MAX_X = 10000;
static const int GRID_MAX_Y = 10000;
static const int ITERATIONS = 10000;

int main() {
	FILE *fp = fopen("day22input.txt", "rt");
	if (fp == NULL) {
		return -1;
	}

	int32_t x = -STARTX;
	int32_t y = -STARTY;
	uint8_t *grid = malloc(GRID_MAX_X * 2 * GRID_MAX_Y * 2 * sizeof(uint8_t));
	if (grid == NULL) {
		return -1;
	}
	memset(grid, 0, GRID_MAX_X * 2 * GRID_MAX_Y * 2 * sizeof(uint8_t));

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
			grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = 1;
		} else {
			grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = 0;
		}
			
		x++;
	}

	x = 0; y = 0;
	enum direction_t direction = up;
	uint32_t infected = 0;

	for (uint32_t i = 0; i < ITERATIONS; i++) {
		bool rotateLeft = false;
		bool rotateRight = false;

		if (grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] == 1) {
			rotateRight = true;
		} else if (grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] == 0) {
			rotateLeft = true;
			infected++;
	        }

		if (rotateRight) {
			switch (direction) {
				case up:
					direction = right;
					break;
				case right:
					direction = down;
					break;
				case down:
					direction = left;
					break;
				case left:
					direction = up;
					break;
			}
		}
		if (rotateLeft) {
			switch (direction) {
				case up:
					direction = left;
					break;
				case left:
					direction = down;
					break;
				case down:
					direction = right;
					break;
				case right:
					direction = up;
					break;
			}
		}

		grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)] = !grid[(y + GRID_MAX_Y) * GRID_MAX_X * 2 + (x + GRID_MAX_X)];

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


	printf("part 1: %i\n", infected);

	free(grid);

	fclose(fp);
}

