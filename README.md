# PortaProgram
Radnóti vizsgaremek
Mérleges rendszer. 

Létrehozandó HTML-ek:
    1. Introduction (csak megtekintésre)
    2. Bejelentkező (LogIn)
    3. Users (csak adminnak)
    4. Carriers (edit data)
    5. Owners (edit data)
    6. Pertners (edit data)
    7. Products (edit data)
    8. Vehicles (edit data)
    9. Change Password
    10. Mérés oldal / Szállítólevél létrehozása (Sorszám, owners, partners, carriers, movements)
    11. Kimutatások, tételes listák stb. készítése (készletek, ügyfélstatisztikák)

    Mindegyiknél kell: új felvétele, törlés, módosítás


    Bejelentkezés után kell egy menü, a megfelelő jogosultságok alapján aktivált menüpontokkal.

2023-04-26 - Lacza
A mai megbeszélés alapján:

Login ---> Irányító oldal (Törzsadat kezelés ÉS Mérlegés)

Törzsadat: 
	OK - Partnerek (név, adószám - text, bankszámlaszám - text, megjegyzés, Id)
	Szállítmányozók (Név, megjegyzés, Id) 
	Tulajdonosok (Eladók) (Adószám - text, név, bankszámlaszám - text, megjegyzés, Id)
	OK - Termékek (Item number - text, név, mennyiségi egység, egységár, raktáron lévő mennyiség, kg/unit, ÁFA kulcs - text, Id)
	OK - Járművek (Rendszám, empty weight, empty time, Id)
	OK - Users (Név, e-mail cím, Jogosultságok, Id)

Mérlegelés:
	Delivery notes (Owner, Partner, Product)
		(befejezetlenek felsorolása)
		(Mérések felvétele)

2023-05-01 - Lacza

Weighings.html:
---------
DeliveryNotes tömbben szereplő, le nem zárt szállítólevelek listája.
gomb_uj_szallitolevel, gomb_modosit, gomb_sztorno
---> deliveryNotes.html

Delivery Note.html (Nyitott):
------------------
Egyetlen delivery note

Owner --- Vásárló
Szállítmányozó

Táblázat: szállítólevélhez tartozó mérések listája (Rendszám, termék, 1. mérés (netto súly -> tára), 2. mérés, 3. kiszámított tömeg)

gomb_bemereshez (---> meauserents.html)
// gomb_meres_javitasa (---> meauserent_1.html - visszamérés nélküli, vagy ---> measurement_2.html - visszamért) //
// gomb_visszameres (---> measurment_2.html) //

Measurement_1.html:
-----------------
Új bemérés oldala

Rendszám
Termék
1. mérés
Mérések (Rendszám, Termék, Mért tömeg) --> Modal (Mérlegelés, megadás kézzel, gépkocsi táblából) ---> gomb_mentés
gomb_torles

Meaurement_2.html:
---------------
Visszamérés, melyen már szerepel a bemérés

Rendszám
Termék
1. mérés (bemérés)
2. mérés
Mérések (Rendszám, Termék, első mérés, Mért tömeg) --> Modal (Mérlegelés, megadás kézzel, gépkocsi táblából) --->
gomb_mentés
gomb_torles

A KETTŐ MÉRÉS AD KI EGYETLEN 'MEASUREMENT'-ET, AMI A DELIVERY NOTES-on SZEREPEL.