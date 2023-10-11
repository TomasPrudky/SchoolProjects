#include "agenda.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define bufferLength 255

static stKandidat* prvniKandi = NULL, * aktKandi = NULL;
static stPozice* prvniPozice = NULL, * aktPozice = NULL;
static stPohovor** polePohovoru = NULL;
int dimenze = 10;
int counter = 0;


void nactiSeznamKandidatu(char* nazevSouboru)
{
	const char* pole[6];
	const char separator[] = ";";
	char* token;
	FILE* file;

	file = fopen(nazevSouboru, "r");
	char buffer[bufferLength];

	if (file == NULL) {
		printf("Chyba pøi orvírání souboru!!!");
		exit(1);
	}
	fgets(buffer, bufferLength, file);
	while (fgets(buffer, bufferLength, file)) {
		token = strtok_single(buffer, separator);
		for (int i = 0; i < 6; i++) {
			pole[i] = token;
			token = strtok_single(NULL, separator);
		}

		stKandidat* tmp = vytvorKandidata(atoi(pole[0]), pole[1], atoi(pole[2]), pole[3], pole[4], pole[5]);

		if (prvniKandi == NULL) {
			prvniKandi = tmp;
			aktKandi = prvniKandi;
		}
		else {
			aktKandi->dalsi = tmp;
			aktKandi = aktKandi->dalsi;
		}
	}
	fclose(file);
}

void nactiSeznamPozic(char* nazevSouboru)
{
	const char* pole[8];
	const char separator[] = ";";
	char* token;
	FILE* file;

	file = fopen(nazevSouboru, "r");
	char buffer[bufferLength];

	if (file == NULL) {
		printf("Chyba pøi orvírání souboru!!!");
		exit(1);
	}
	fgets(buffer, bufferLength, file);
	while (fgets(buffer, bufferLength, file)) {
		token = strtok_single(buffer, separator);
		for (int i = 0; i < 8; i++) {
			pole[i] = token;
			token = strtok_single(NULL, separator);
		}
		stPozice* tmp = vytvorPozici(atoi(pole[0]), pole[1], pole[2], pole[3], pole[4], pole[5], atof(pole[6]), atoi(pole[7]));

		if (prvniPozice == NULL) {
			prvniPozice = tmp;
			aktPozice = prvniPozice;
		}
		else {
			aktPozice->dalsi = tmp;
			aktPozice = aktPozice->dalsi;
		}
	}
}

void vypisSeznamKandidatu()
{
	if (prvniKandi != NULL) {
		stKandidat* tmpKandi = prvniKandi;
		while (tmpKandi != NULL) {
			vypisKandidata(tmpKandi);
			tmpKandi = tmpKandi->dalsi;
		}
	}
	else {
		printf("Seznam kandidatu je prazny");
	}
}

void pridejKandidata(stKandidat* kandidat)
{
	if (najdiKandidataZeSeznamu(kandidat->id) == NULL) {
		if (prvniKandi == NULL) {
			prvniKandi = kandidat;
			aktKandi = prvniKandi;
		}
		else {
			aktKandi->dalsi = kandidat;
			aktKandi = aktKandi->dalsi;
		}
	}
	else {
		printf("Tento kandidat uz existuje\n");
	}
}

stKandidat* odeberKandidataZeSeznamu(int cisloKandidata)
{
	if (prvniKandi != NULL) {
		stKandidat* aktualni = prvniKandi;
		stKandidat* hledany;
		if (prvniKandi->id == cisloKandidata) {
			hledany = prvniKandi;
			prvniKandi = aktualni->dalsi;
			return hledany;
		}
		while (aktualni != NULL) {
			if (aktualni->dalsi != NULL) {
				if (aktualni->dalsi->id == cisloKandidata) {
					hledany = aktualni->dalsi;
					aktualni->dalsi = hledany->dalsi;
					if (aktualni->dalsi == NULL) {
						aktKandi = aktualni;
					}
					else {
						aktKandi = aktualni->dalsi;
					}
					return hledany;
				}
			}
			aktualni = aktualni->dalsi;
			
		}
	}
	return NULL;
}

stKandidat* najdiKandidataZeSeznamu(int cisloKandidata)
{
	if (prvniKandi != NULL) {
		stKandidat* tmpKandi = prvniKandi;
		while (tmpKandi != NULL) {
			if (tmpKandi->id == cisloKandidata) {
				return tmpKandi;
			}
			tmpKandi = tmpKandi->dalsi;
		}
		return NULL;
	}
	return NULL;
}

void zrusSeznamKandidatu()
{
	stKandidat* akt = prvniKandi;
	while (akt != NULL) {
		stKandidat* dalsi = akt->dalsi;
		free(akt);
		akt = dalsi;
	}
	
	prvniKandi = NULL;
	aktKandi = NULL;
}

void vypisSeznamPozic()
{
	if (prvniPozice != NULL) {
		stPozice* tmpPozice = prvniPozice;
		while (tmpPozice != NULL) {
			vypisPozici(tmpPozice);
			tmpPozice = tmpPozice->dalsi;
		}
	}
	else {
		printf("Seznam poizc je prazdny");
	}
}

void pridejPozice(stPozice* pozice)
{
	if (najdiPoziciZeSeznamu(pozice->id) == NULL) {
		if (prvniPozice == NULL) {
			prvniPozice = pozice;
			aktPozice = prvniPozice;
		}
		else {
			aktPozice->dalsi = pozice;
			aktPozice = aktPozice->dalsi;
		}
	}
	else {
		printf("Tato pozice uz existuje\n");
	}
}

stPozice* odeberPoziciZeSeznamu(int cisloPozice)
{
	if (prvniPozice != NULL) {
		stPozice* aktualni = prvniPozice;
		stPozice* hledany;
		if (prvniPozice->id == cisloPozice) {
			hledany = prvniPozice;
			prvniPozice = aktualni->dalsi;
			return hledany;
		}
		while (aktualni != NULL) {
			if (aktualni->dalsi != NULL) {
				if (aktualni->dalsi->id == cisloPozice) {
					hledany = aktualni->dalsi;
					aktualni->dalsi = hledany->dalsi;
					if (aktualni->dalsi == NULL) {
						aktPozice = aktualni;
					}
					else {
						aktPozice = aktualni->dalsi;
					}
					return hledany;
				}
			}
			aktualni = aktualni->dalsi;
		}
	}
	return NULL;
}

stPozice* najdiPoziciZeSeznamu(int cisloPozice)
{
	if (prvniPozice != NULL) {
		stPozice* tmpPozice = prvniPozice;
		while (tmpPozice != NULL) {
			if (tmpPozice->id == cisloPozice) {
				return tmpPozice;
			}
			tmpPozice = tmpPozice->dalsi;
		}
		return NULL;
	}
	return NULL;
}

void zrusSeznamPozic()
{
	stPozice* akt = prvniPozice;
	while (akt != NULL) {
		stPozice* dalsi = akt->dalsi;
		free(akt);
		akt = dalsi;
	}
	prvniPozice = NULL;
	aktPozice = NULL;
}


void alokujPolePohovoru()
{
	if (polePohovoru == NULL) {
		polePohovoru = (stPohovor**)malloc(sizeof(stPohovor*)*dimenze);
		for (int i = 0; i < dimenze; i++) {
			polePohovoru[i] = (stPohovor*)malloc(sizeof(stPohovor));
			polePohovoru[i]->kandidat = NULL;
			polePohovoru[i]->pozice = NULL;
		}
	}
}

void pridejPohovor(stPohovor* pohovor)
{
	if (pohovor != NULL) {
		if (counter < dimenze) {
			*polePohovoru[counter++] = *pohovor;
			free(pohovor);
		}
		else {	
			zvetsPole();
			pridejPohovor(pohovor);
		}
	}
}

void zmenStavPohovor(int id, enum STAV_POHOVORU vysledek)
{
	if ((polePohovoru != NULL) && (polePohovoru[0] != NULL)) {
		for (int i = 0; i < counter;i++) {
			if (polePohovoru[i]->id == id) {
				polePohovoru[i]->vysledek = vysledek;
			}
		}
	}else {
		printf("Seznam pohovoru je prazdny!\n");
	}
}

void vypisPohovory()
{
	if ((polePohovoru != NULL) && (polePohovoru[0] != NULL)) {
		for (int i = 0; i < counter; i++) {
			printf("\n");
			vypisPohovor(polePohovoru[i]);
		}
	}else {
		printf("Seznam pohovoru je prazdny!\n");
	}
}

char* strtok_single(char* str, char const* delims)
{
	static char* src = NULL;
	char* p, * ret = 0;

	if (str != NULL)
		src = str;

	if (src == NULL)
		return NULL;

	if ((p = strpbrk(src, delims)) != NULL) {
		*p = 0;
		ret = src;
		src = ++p;

	}
	else if (*src) {
		ret = src;
		src = NULL;
	}

	return ret;
}

void zvetsPole()
{
	dimenze = dimenze * 2;
	stPohovor** tmp = (stPohovor**)malloc(sizeof(stPohovor*) * dimenze);
	for (int i = 0; i < dimenze; i++) {
		tmp[i] = (stPohovor*)malloc(sizeof(stPohovor));
		tmp[i]->kandidat = NULL;
		tmp[i]->pozice = NULL;
	}

	for (int i = 0; i < dimenze / 2; i++) {
		*tmp[i] = *polePohovoru[i];
		free(polePohovoru[i]);
		polePohovoru[i] = NULL;
	}

	free(polePohovoru);
	polePohovoru = tmp;
}

void zrusPohovory()
{
	if (polePohovoru != NULL) {
		for (int i = 0; i < dimenze; i++) {
			if (polePohovoru[i]->kandidat != NULL) {
				free(polePohovoru[i]->kandidat);				
			}
			if (polePohovoru[i]->pozice != NULL) {
				free(polePohovoru[i]->pozice);	
			}
			free(polePohovoru[i]);
			polePohovoru[i] = NULL;
		}
		free(polePohovoru);
		polePohovoru = NULL;
	}
}

