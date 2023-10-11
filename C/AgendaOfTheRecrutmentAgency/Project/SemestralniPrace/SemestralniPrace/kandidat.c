#include "kandidat.h"
#include <stdio.h>
#include <string.h>

#include "enums.h"


stKandidat* vytvorKandidata(int id, char* jmeno, enum OBOR obor, char* tel, char* mail, char* jazyky)
{
	stKandidat* tmp = malloc(sizeof(stKandidat));
	tmp->id = id;
	strcpy(tmp->jmeno, jmeno);
	tmp->obor = obor;
	strcpy(tmp->tel, tel);
	strcpy(tmp->mail, mail);
	strcpy(tmp->jazyky, jazyky);
	tmp->dalsi = NULL;
	return tmp;
}

void vypisKandidata(stKandidat* kandidat)
{
	printf("ID_KANDIDATA: %d\nJMENO: %s\nOBOR: %s\nTEL: %s\nEMAIL: %s\nJAZYKY: %s\n\n", kandidat->id, kandidat->jmeno, dejObor(kandidat->obor), kandidat->tel, kandidat->mail, kandidat->jazyky);
}

char* dejObor(enum OBOR obor) {
	switch (obor)
	{
	case Administrativa:
		return "Administrativa";
		break;
	case Ekonomie:
		return "Ekonomie";
		break;
	case Pravo:
		return "Pravo";
		break;
	case IT_All:
		return "IT_All";
		break;
	case Zdravotnictvi:
		return "Zdravotnictvi";
		break;
	case Obchod:
		return "Obchod";
		break;
	case Vyroba:
		return "Vyroba";
		break;
	case Stavebnictvi:
		return "Stavebnictvi";
		break;
	case Skolstvi:
		return "Skolstvi";
		break;
	case Doprava:
		return "Doprava";
		break;
	case Management:
		return "Management";
		break;
	default:
		return "neznamy obor";
		break;
	}
}
