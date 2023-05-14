# PortaProgram

Radnóti vizsgaremek
Mérleges rendszer. 

OK - Létrehozandó HTML-ek:
-----------------------
    OK - 1. Introduction (csak megtekintésre)
    OK - 2. Bejelentkező (LogIn)
    OK - 3. Users (csak adminnak)
    OK - 4. Carriers (edit data)
    OK - 5. Owners (edit data)
    OK - 6. Pertners (edit data)
    OK - 7. Products (edit data)
    OK - 8. Vehicles (edit data)
    OK - 9. Change Password
    OK - 10. Mérés oldal / Szállítólevél létrehozása (Sorszám, owners, partners, carriers, movements)
    OK - Kimutatások, tételes listák stb. készítése (készletek, ügyfélstatisztikák)

    OK - Mindegyiknél kell: új felvétele, törlés, módosítás


    OK - Bejelentkezés után kell egy menü, a megfelelő jogosultságok alapján aktivált menüpontokkal.


# >>> 2023-04-26 - Lacza
----------------------
----------------------

A mai megbeszélés alapján:

OK - Login:
--------
Irányító oldal (Törzsadat kezelés ÉS Mérlegés)

OK - Törzsadat:
------------
	OK - Partnerek (név, adószám - text, bankszámlaszám - text, megjegyzés, Id)
	OK - Szállítmányozók (Név, megjegyzés, Id) 
	OK - Tulajdonosok (Eladók) (Adószám - text, név, bankszámlaszám - text, megjegyzés, Id)
	OK - Termékek (Item number - text, név, mennyiségi egység, egységár, raktáron lévő mennyiség, kg/unit, ÁFA kulcs - text, Id)
	OK - Járművek (Rendszám, empty weight, empty time, Id)
	OK - Users (Név, e-mail cím, Jogosultságok, Id)


# >>> 2023-05-01 és 2023-05-06 - Lacza
------------------------------------
------------------------------------


OK - open_deliveryNotes_table.html:
--------------------------------

Le nem zárt szállítólevelek listája.
sorszám, partner, owner, carrier, dátum
gomb_uj_szallitolevel
---> deliveryNote_edit.html

OK - closed_deliveryNotes_table.html:
--------------------------------

Zárt szállítólevelek listája.
---> deliveryNote_view.html

# deliveryNote_edit.html:
-----------------------

serial_no (csak olvasható, a backend adja ---> text), owner_id, owner_address_id, loadlocation_address_id, partner_id, partner_address_id, unloadlocation_address_id, carrier_id, carrier_address_id, movement_id, status

Táblázat: szállítólevélhez tartozó mérések listája (Rendszám, termék, 1. mérés (netto súly -> tára), 2. mérés, 3. kiszámított tömeg)

MINDEGYIK select!!!

GOMB (Szállítólevél megtekintése) ---> deliveryNote_view.html

# deliveryNote_view.html:
-------------------------

Táblázat: szállítólevélhez tartozó mérések listája (Rendszám, termék, 1. mérés (netto súly -> tára), 2. mérés, 3. kiszámított tömeg)

/NYOMTATÁS/ ---> CSAK A TÁBLÁZAT HTML OLDAL ÉS NYOMTATÁS GOMB

# deliveryNote_print.html:
------------------------

Táblázat: szállítólevélhez tartozó mérések listája (Rendszám, termék, 1. mérés (netto súly -> tára), 2. mérés, 3. kiszámított tömeg)

/NYOMTATÁS/ ---> CSAK A TÁBLÁZAT HTML OLDAL ÉS NYOMTATÁS GOMB

OK - measurements.html
-------------------

Táblázat: szállítólevélhez tartozó mérések listája (Rendszám, termék, 1. mérés (netto súly -> tára), 2. mérés, 3. kiszámított tömeg)

OK - Keresés:
----------

OK - Kezdő és záródátum közötti szállítólevelek listázása
OK - Kezdő és záródátum (date)

Dupla kattintásra megnyitja a rekordot... --->  deliveryNote_print.html

OK - Measurement_1.html:
-----------------
Új bemérés oldala

Rendszám
Termék
1. mérés
Mérések (Rendszám, Termék, Mért tömeg) --> Modal (Mérlegelés, megadás kézzel, gépkocsi táblából) ---> gomb_mentés
gomb_torles

A TERMÉKEKNÉL ---> select!!!

OK - Meaurement_2.html:
---------------
Visszamérés, melyen már szerepel a bemérés

Rendszám
Termék
1. mérés (bemérés)
2. mérés
Mérések (Rendszám, Termék, első mérés, Mért tömeg) --> Modal (Mérlegelés, megadás kézzel, gépkocsi táblából) --->
gomb_mentés
gomb_torles

A TERMÉKEKNÉL ---> select!!!

A KETTŐ MÉRÉS AD KI EGYETLEN 'MEASUREMENT'-ET, AMI A DELIVERY NOTES-on SZEREPEL.


>>> 2023-05-02 - Lacza:
-----------------------
-----------------------

OK - ÁTRENDEZÉS:
-------------

1. Menüből eltűnik:
- Cím
- E-mail
- Telefonszám

2. Minden oldalból kell egy-egy:
xxx_table.html (csak a táblázat)
xxx_edit.html (szerkesztéshez)

# >>> 2023-05-12 - HÁTRA LÉVŐ FELADATOK:
--------------------------------------
--------------------------------------

1. LOGIN - JWT token
2. Backend adjon sorszámot az új szállítólevélnek!
3. ADATBÁZIS MODELDIAGRAMJA (ER diagram)
4. VISSZAMÉRÉS oldalon: mindkét időpontot feltüntetni!!! (Lacza)
5. MÉRÉSEK listájánál feltüntetni a hordozó szállítólevél adatait (Sorszám, partner, Owner, Szállító, Művelet) (Lacza)
6. DOKUMENTÁCIÓ (Lacza)

7. (Összesítések: napi árumozgás össztömege, napi mozgások száma)

# >>> 2023-05-14:
-----------------
-----------------

1. OK - deliveryNote_edit.html-re 'Új mérés' gomb (ne vigyen sehova, Balázs intézi - measurement_1) - duplakatt: measurement_2
2. OK - LÉTREHOZNI: 
    addresses_table.html
    addresses_edit.html
3. parntner_edit.html, carrier_edit.html, owner_edit.html:
    - címek táblázat
    - 'Új cím hozzáadása' gomb
4. Mérlegjegy a mérlegelésről (egyetlen mérés adatai, szállító, partner, tulajdonos) + mérési időpontok.
5. // closed_deliveryNotes_table.html-ről a 'Megtekintés' gomb levétele ---> duplakatt veszi át a helyét!!!

