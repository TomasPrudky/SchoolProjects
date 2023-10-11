#pragma once

typedef struct pozice {
	int id;
	char pozice[100];
	char popis[50];
	char pozadavky[50];
	char nabidka[50];
	char jazyky[50];
	float maxPlat;
	enum KRAJ kraj;
	struct pozice* dalsi;
} stPozice;

stPozice* vytvorPozici(int id, char* pozice, char* popis, char* pozadavky, char* nabidka, char* jazyky, float maxPlat, enum KRAJ kraj);
void vypisPozici(stPozice* pozice);
char* dejKraj(enum Kraj kraj);