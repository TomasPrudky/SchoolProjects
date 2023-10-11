#pragma once
#include "kandidat.h"
#include "pozice.h"

static int idPohovor = 1;

typedef struct pohovor {
	int id;
	stKandidat* kandidat;
	stPozice* pozice;
	enum VYSLEDEK_POHOVORU vysledek;
} stPohovor;

stPohovor* vytvorPohovor(stKandidat* kandidat, stPozice* idPozice);
void vypisPohovor(stPohovor* pohovor);
char* dejVysledekPohovoru(enum VYSLEDEK_POHOVORU vysledek);