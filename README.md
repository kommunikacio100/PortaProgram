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
	Partnerek (Adószám - text, név, megjegyzés, bankszámlaszám - text, Id)
	Szállítmányozók (Név, megjegyzés, Id) 
	Tulajdonosok (Eladók) (Adószám - text, név, bankszámlaszám - text, megjegyzés, Id)
	Termékek (Item number - text, név, mennyiségi egység, egységár, raktáron lévő mennyiség, kg/unit, ÁFA kulcs - text, Id)
	Járművek (Rendszám, empty weight, empty time, Id)
	Users (Név, e-mail cím, Jogosultságok, Id)

Mérlegelés:
	Delivery notes (Owner, Partner, Product)
		(befejezetlenek felsorolása)
		(Mérések felvétele)