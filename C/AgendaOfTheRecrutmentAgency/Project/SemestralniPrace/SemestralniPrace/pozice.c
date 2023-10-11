#include "pozice.h"
#include "enums.h"
#include <stdio.h>
#include <stdlib.h>

stPozice* vytvorPozici(int id, char* pozice, char* popis, char* pozadavky, char* nabidka, char* jazyky, float maxPlat, enum KRAJ kraj)
{
	stPozice* tmp = malloc(sizeof(stPozice));
	tmp->id = id;
	strcpy(tmp->pozice, pozice);
	strcpy(tmp->popis, popis);
	strcpy(tmp->pozadavky, pozadavky);
	strcpy(tmp->nabidka, nabidka);
	strcpy(tmp->jazyky, jazyky);
	tmp->kraj = kraj;
	tmp->maxPlat = maxPlat;
	tmp->dalsi = NULL;
    return tmp;
}

void vypisPozici(stPozice* pozice)
{
	printf("ID_POZICE: %d\nPOZICE: %s\nPOPIS: %s\nPOZADAVKY: %s\nNABIDKA: %s\nJAZYKY: %s\nMAXPLAT: %.2f\nKRAJ: %s\n\n", pozice->id, pozice->pozice,
		pozice->popis, pozice->pozadavky, pozice->nabidka, pozice->jazyky, pozice->maxPlat, dejKraj(pozice->kraj));
}

char* dejKraj(enum Kraj kraj) {
	switch (kraj)
	{
	case Praha:
		return "Praha";
		break;
	case Stredocesky:
		return "Stredocesky";
		break;
	case Jihocesky:
		return "Jihocesky";
	case Plzensky:
		return "Plzensky";
		break;
	case Karlovarsky:
		return "Karlovarsky";
		break;
	case Ustecky:
		return "Ustecky";
		break;
	case Liberecky:
		return "Liberecky";
		break;
	case Kralovehradecky:
		return "Kralovehradecky";
		break;
	case Pardubicky:
		return "Pardubicky";
		break;
	case Vysocina:
		return "Vysocina";
		break;
	case Jihomoravsky:
		return "Jihomoravsky";
		break;
	case Olomoucky:
		return "Olomoucky";
		break;
	case Zlinsky:
		return "Zlinsky";
		break;
	case Moravskoslezsky:
		return "Moravskoslezsky";
		break;
	default:
		return "neznamy kraj";
		break;
	}
}
