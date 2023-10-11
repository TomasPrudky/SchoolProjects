#define _CRTBDG_MAP_ALLOC
#include <crtdbg.h>
#include <stdio.h>
#include <stdlib.h>
#include "agenda.h"
#include "enums.h"

void printMenu();
void menu();
void kontrolaLeaku();
stKandidat* nactiKandidataZKlavesnice();
stPozice* nactiPoziciZKlavesnice();
void odeberKandidata();
void odeberPozici();
void najdiKandidata();
void najdiPozici();
stPohovor* pridejPohovorZKlavesnice();
void editujStavPohovoru();

int main(){

	menu();	
	kontrolaLeaku();
	return 0;
}

void printMenu()
{
	printf("Nacti data do seznamu\n");
	printf("    1 - seznam kandidatu\n");
	printf("    2 - seznam pozic\n");
	printf("Vypis seznam\n");
	printf("    3 - seznam kandidatu\n");
	printf("    4 - seznam pozic\n");
	printf("Pridej z klavesnice\n");
	printf("    5 - do seznamu kandidatu\n");
	printf("    6 - do seznamu pozic\n");
	printf("Odeber\n");
	printf("    7 - kandidata\n");
	printf("    8 - pozici\n");
	printf("Zrus seznam\n");
	printf("    9 - kandidatu\n");
	printf("   10 - pozic\n");
	printf("Najdi\n");
	printf("   11 - kandidata\n");
	printf("   12 - pozici\n");
	printf("Funkce pro pohovory\n");
	printf("   13 - Pridej pohovor\n");
	printf("   14 - Edituj stav pohovoru\n");
	printf("   15 - Vypis pohovory\n");
	printf("    0 - Ukoncit program\n");
}

void menu()
{
	stKandidat* stk;
	stPozice* poz;
	stPohovor* poh;
	int volba = -1;
 	while (volba != 0) {
		printMenu();
		printf("Zadej tvoji volbu: ");
		int tmp = scanf_s("%d", &volba);
		printf("\n");

		switch (volba){
		case 1:
			nactiSeznamKandidatu("kandidati.csv");
			break;
		case 2:
			nactiSeznamPozic("pozice.csv");
			break;
		case 3:
			vypisSeznamKandidatu();
			break;
		case 4: 
			vypisSeznamPozic();
			break;
		case 5:
			stk = nactiKandidataZKlavesnice();
			pridejKandidata(stk);
			break;
		case 6:
			poz = nactiPoziciZKlavesnice();
			pridejPozice(poz);
			break;
		case 7:
			odeberKandidata();
			break;
		case 8:
			odeberPozici();
			break;
		case 9:
			zrusSeznamKandidatu();
			break;
		case 10:
			zrusSeznamPozic();
			break;
		case 11:
			najdiKandidata();
			break;
		case 12:
			najdiPozici();
			break;
		case 13:
			alokujPolePohovoru();
			poh = pridejPohovorZKlavesnice();
			pridejPohovor(poh);
			break;
		case 14:
			editujStavPohovoru();
			break;
		case 15:
			vypisPohovory();
			break;
		case 0:
			printf("Ukoncit program\n");
			zrusSeznamKandidatu();
			zrusSeznamPozic();
			zrusPohovory();
			break;
		default:
			printf("Neplatna volba\n");
			break;
		}
		printf("\n");
	}
}

void kontrolaLeaku()
{
	if (_CrtDumpMemoryLeaks() != 0)
	{
		printf("\nNebyla provedena dealokace!\n");
		printf("Pravdepodobne jsi zapomnel dealokovat seznam!\n");
	}
	else {
		printf("\nDealokace probehla uspesne\n");
	}
}

stKandidat* nactiKandidataZKlavesnice()
{
	int id;
	char jmeno[50], tel[50], mail[50], jazyky[50];
	enum OBOR obor;
	printf("Zadej ID kandidata: ");
	scanf("%d", &id);

	printf("Zadej cele jmeno kandidata: ");
	scanf("%s", jmeno);

	printf("\n");
	for (int i = Administrativa; i <= Management; i++) {
		printf("Zadej %d pro obor: %s\n", i, dejObor(i));
	}
	printf("Zadej obor kandidata: ");
	scanf("%d", &obor);

	printf("Zadej telefon kandidata: ");
	scanf("%s", tel);

	printf("Zadej e-mail kandidata: ");
	scanf("%s", mail);

	printf("Zadej 1 hlavni cizi jazyk kandidata: ");
	scanf("%s", jazyky);

	stKandidat* kandidat = vytvorKandidata(id, jmeno, obor, tel, mail, jazyky);

	return kandidat;
}

stPozice* nactiPoziciZKlavesnice()
{
	int id;
	char pozice[100], popis[50], pozadavky[50], jazyky[50], nabidka[50];
	float maxPlat;
	enum KRAJ kraj;
	printf("Zadej ID pozice: ");
	scanf("%d", &id);

	printf("Zadej nazev pozice: ");
	scanf("%s", pozice);

	printf("Zadej popis pozice: ");
	scanf("%s", popis);

	printf("Zadej pozadavky pozice: ");
	scanf("%s", pozadavky);

	printf("Zadej nabidku pozice: ");
	scanf("%s", nabidka);

	printf("Zadej 1 hlavni cizi jazyk pro pozici: ");
	scanf("%s", jazyky);

	printf("Zadej maxPlat pro pozici: ");
	scanf("%f", &maxPlat);

	printf("\n");
	for (int i = Praha; i <= Moravskoslezsky; i++) {
		printf("Zadej %d pro kraj: %s\n", i, dejKraj(i));
	}
	printf("Zadej kraj pro pozici: ");
	scanf("%d", &kraj);

	stPozice* poz = vytvorPozici(id, pozice, popis, pozadavky, nabidka, jazyky, maxPlat, kraj);

	return poz;
}

void odeberKandidata()
{
	int id;
	printf("Zadejte ID kandidata, ktereho chcete odstranit: ");
	scanf("%d", &id);
	stKandidat* kan = odeberKandidataZeSeznamu(id);
	if (kan != NULL) {
		vypisKandidata(kan);
		free(kan);
		kan = NULL;
	}
	else {
		printf("\Kandidat s ID: %d neexistuje!\n", id);
	}
}

void odeberPozici()
{
	int id;
	printf("Zadejte ID pozice, kterou chcete odstranit: ");
	scanf("%d", &id);
	stPozice* poz = odeberPoziciZeSeznamu(id);
	if (poz != NULL) {
		vypisPozici(poz);
		free(poz);
		poz = NULL;
	}
	else {
		printf("\Pozice s ID: %d neexistuje!\n", id);
	}
}

void najdiKandidata()
{
	int id;
	printf("Zadejte ID kandidata, ktereho chcete najit: ");
	scanf("%d", &id);
	stKandidat* kan = najdiKandidataZeSeznamu(id);
	if (kan != NULL) {
		vypisKandidata(kan);
	}
	else {
		printf("\nKandidat s ID: %d neexistuje!\n", id);
	}
}

void najdiPozici()
{
	int id;
	printf("Zadejte ID pozice, kterou chcete najit: ");
	scanf("%d", &id);
	stPozice* poz = najdiPoziciZeSeznamu(id);
	if (poz != NULL) {
		vypisPozici(poz);
	}
	else {
		printf("\Pozice s ID: %d neexistuje!\n", id);
	}
}

stPohovor* pridejPohovorZKlavesnice()
{
	int idKan, idPoz;
	printf("Zadej ID kandidata: ");
	scanf("%d", &idKan);

	printf("Zadej ID pozice: ");
	scanf("%d", &idPoz);

	stKandidat* kan = najdiKandidataZeSeznamu(idKan);
	stPozice* poz = najdiPoziciZeSeznamu(idPoz);
	if (kan != NULL && poz != NULL) {
		stPohovor* pohovor = vytvorPohovor(kan, poz);
		return pohovor;
	}
	printf("Kandidat nebo pozice neexistuje!\n");

	return NULL;
}

void editujStavPohovoru()
{
	int idPohovoru, stav;
	printf("Zadej ID pohovoru: ");
	scanf("%d", &idPohovoru);

	
	for (int i = nenastaveno; i <= pozastaven; i++) {
		printf("%d -> %s\n", i, dejVysledekPohovoru(i));
	}
	printf("Vyber stav pro pohovor: \n");
	scanf("%d", &stav);

	zmenStavPohovor(idPohovoru, stav);
}


