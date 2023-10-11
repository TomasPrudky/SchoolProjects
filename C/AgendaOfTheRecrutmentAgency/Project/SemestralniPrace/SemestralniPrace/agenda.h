#pragma once
#include "pohovor.h"
#include "enums.h"
#include "kandidat.h"
#include <stdio.h>

void nactiSeznamKandidatu(char* nazevSouboru);
void nactiSeznamPozic(char* nazevSouboru);
void vypisSeznamKandidatu();
void pridejKandidata(stKandidat* kandidat);
stKandidat* odeberKandidataZeSeznamu(int cisloKandidata);
stKandidat* najdiKandidataZeSeznamu(int cisloKandidata);
void zrusSeznamKandidatu();
void vypisSeznamPozic();
void pridejPozice(stPozice* pozice);
stPozice* odeberPoziciZeSeznamu(int cisloPozice);
stPozice* najdiPoziciZeSeznamu(int cisloPozice);
void zrusSeznamPozic();
void alokujPolePohovoru();
void pridejPohovor(stPohovor* pohovor);
void zmenStavPohovor(int id, enum STAV_POHOVORU vysledek);
void vypisPohovory();
char* strtok_single(char* str, char const* delims);
void zvetsPole();
void zrusPohovory();
