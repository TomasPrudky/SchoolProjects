#include "pohovor.h"
#include "kandidat.h"
#include <stdio.h>
#include <stdlib.h>
#include "enums.h"

stPohovor* vytvorPohovor(stKandidat* kandidat, stPozice* idPozice)
{
    stPohovor* tmp = malloc(sizeof(stPohovor));
	stKandidat* kan = malloc(sizeof(stKandidat));
	stPozice* poz = malloc(sizeof(stPozice));
	*kan = *kandidat;
	*poz = *idPozice;

    tmp->id = idPohovor++;
	tmp->kandidat = kan;
	tmp->pozice = poz;
    tmp->vysledek = nenastaveno;
    return tmp;
}

void vypisPohovor(stPohovor* pohovor)
{
    printf("ID_POHOVOR: %d\nPOHOVOR S: %s\nPOZICE: %s\nSTAV_POHOVORU: %s\n", pohovor->id, pohovor->kandidat->jmeno, pohovor->pozice->pozice, dejVysledekPohovoru(pohovor->vysledek));
}

char* dejVysledekPohovoru(enum VYSLEDEK_POHOVORU vysledek) {
	switch (vysledek){
	case nenastaveno:
		return "nenastaveno";
		break;
	case nastaveno:
		return "nastaveno";
		break;
	case zaslano_CV:
		return "zaslano_CV";
		break;
	case prijat:
		return "prijat";
		break;
	case neprijat:
		return "neprijat";
		break;
	case odmitl:
		return "odmitl";
		break;
	case pozastaven:
		return "pozastaven";
		break;
	default:
		return "neznama pozice";
		break;
	}
}
