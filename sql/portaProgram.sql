-- Active: 1679018847898@@127.0.0.1@3306@weighing_db

-- !!! Törli az adatbázist !!!
DROP DATABASE IF EXISTS WEIGHING_DB;

-- Létrehozza az adatbázist
CREATE DATABASE IF NOT EXISTS WEIGHING_DB 
CHARACTER SET utf8mb4;

-- Használatba veszi az adatbázist
USE WEIGHING_DB;

-- Létrehozza a users táblát.
-- user az aki a mérlegelő programot kezelheti
-- Öt jogosultság van egyenlőre. 
-- - Megnézheti az adatokat
-- - Kezelheti a törzsadatokat. Felvehet újat, módosíthat, törölhet.
-- - méréseket csinálhat
-- - kezelheti a usereket. 
-- - beléphet a beállításokba.
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) not null,
  `password_hash` varchar(128) not null, # a felhasználó jelszavának HASH512 kódja
  `can_look_data` INT  not null,
  `can_edit_data` INT  not null,
  `can_weighing` INT  not null,
  `can_edit_users` INT  not null,
  `can_settings` INT  not null,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);



-- Ezek a címek, a userekhez, a partnerekhez, a tulajdonosokhoz, a szállítókhoz.
-- Az address_to_table mondja meg hogy melyik táblához tartozik a cím
-- P - partners
-- U - users
-- O - owners
-- C - carriers
-- Az address_to_id mondja meg hogy melyik id-hoz tartozik a cím.
-- Egy id-hez lehet több címet is társítani. Lehet egy alapértelmezett cím a sok közül.
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `to_table` char(1)  not null,
  `to_id` bigint  not null,
  `defaulted` boolean,
  `country_code` varchar(2),
  `zip_code` varchar(10),
  `city` varchar(50),
  `street_name` varchar(150),
  `street_type` varchar(50),
  `street_number` varchar(10),
  `lot_number` varchar(15),
  `gps_latitude` float,
  `gps_longitude` float, 
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Email címek táblázata
-- Ahogy a címek, ez is táblához van rendelve(email_to_table), és egy ID-hoz(email_to_id). 
-- Lehet egy megjegyzést mellé tenni, ha kellene valami info az email címhez.
-- Egy-egy id-hoz több email is rendelhető, lehet default email cím is.
CREATE TABLE IF NOT EXISTS `emails` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `to_table` char(1) not null,
  `to_id` bigint not null,
  `email` varchar(128) not null,
  `memo` text,
  `defaulted` boolean,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Telefonszámok. Hasonlóan működik mint a cím és az email adatok.
CREATE TABLE IF NOT EXISTS `phones` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `to_table` char(1) not null,
  `to_id` bigint not null,
  `phone` varchar(15) not null,
  `memo` text,
  `defaulted` boolean,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Partnerek azok, akik hoznak vagy visznek valamit.
-- Lehet hozzájuk címeket, email címeket, telefonszámokat rendelni.
CREATE TABLE IF NOT EXISTS `partners` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `vat_number` varchar(15) ,
  `name` varchar(200) not null,
  `memo` text,
  `bank_account` varchar(26),
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Tulajdonosok azok akik a telephely tulajdonosok.
-- Nekik adnak el a partnerek, vagy tőlük vásárolnak.
-- Lehet hozzájuk címeket, email címeket, telefonszámokat rendelni.
CREATE TABLE IF NOT EXISTS `owners` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `vat_number` varchar(15),
  `name` varchar(200) not null,
  `bank_account` varchar(26),
  `memo` text,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Szállítók, akik a fuvarozást végzik.
CREATE TABLE IF NOT EXISTS `carriers` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `ekaer_id` varchar(30),
  `name` varchar(200) not null,
  `memo` text,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- gépkocsik adatai.
-- van egy üres súlyuk.
-- Előfordul hogy egy telephelyen nem mérik meg üresen a kocsikat,
-- vagy egy nap csak egyszer mérik meg üresen,
-- és csak tele mérik meg az autót, és az egyszer lemért üres súllyal számolnak nettó súlyt.
-- Van ahol évente egyszer mérik meg a kocsit, bár ez azért rizikós.
-- Kavicsbányákban, ahol az anyag nem annyira értékes nem számít +- 200 kg.
-- Mezőgazdasági cégeknél általában nem csinálnak ilyet. 
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `plate_number1` varchar(20) not null,
  `country_code1` varchar(5),
  `plate_number2` varchar(20),
  `country_code2` varchar(5),
  `plate_number3` varchar(20),
  `country_code3` varchar(5),
  `empty_weight` float,
  `empty_time` datetime,
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Mozgás kódok
-- Ez a kiszállítás, beszállítás, selejtezés, 
-- a portaProgramInsert.sql-ben vannak a lehetőségek, de fel lehet venni újabbakat is.
-- stock_relation a készletet hogyan változtatja meg ez a fajta mérés. + növeli, -csökkenti, vagy szóköz nem módosítja a készletet.
-- head a nyomtatvány fejléce
-- left side a bal oldali partner vagy owner elnevezése
-- right side a jobb oldali partner vagy owner elnevezése
-- from_file_name egy html fájl neve, amiben majd egy javascript kóddal le kell cserélni a html azonosítókat és kinyomtatni.
CREATE TABLE IF NOT EXISTS `movements` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30) not null,
  `stock_relation` char(1),
  `head` varchar(50),
  `left_side` varchar(50),
  `right_side` varchar(50),
  `form_file_name` varchar(250),
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Delivery_notes
-- Ez a szállítólevelek fejléce.
-- Egy egy szállítólevélhez több measurement tartozhat.
-- Sorszám, Tulajdonos, Partner, Szállító, Mozgásirány  
CREATE TABLE IF NOT EXISTS `delivery_notes` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `serial_no` varchar(20) not null,
  `owner_id` bigint,
  `owner_address_id` bigint,
  `loadlocation_address_id` bigint,
  `partner_id` bigint,
  `partner_address_id` bigint,
  `unloadlocation_address_id` bigint,
  `carrier_id` bigint,
  `carrier_address_id` bigint,
  `movement_id` bigint,
  `status` varchar(20),
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Termék adatok
-- Lehet egy cikkszáma, azaz item_number
-- Neve, mennyiségi egysége(units),
-- stock az aktuális raktárkészlet,
-- kg_per_unit akkor érdekes, ha mérleggel mérik, de mondjuk m3-ben van az egységára.
-- Ilyenkor át kell számolni a mennyiséget m3-re. De ezzel nem tudom hogy foglalkozzunk e.
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `item_number` varchar(20) not null,
  `name` varchar(200) not null,
  `units` varchar(20) not null,
  `stock` float,
  `kg_per_unit` float,
  `unit_price` float,
  `vtsz` varchar(10),
  `vat_key` varchar(10),
  `vat_exemption_case` varchar(10),
  `vat_exemption_reason` varchar(100),
  `adr_number` varchar(200),
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- Ezek a mérlegesek. Minden mérés egy Delivery_notehoz kapcsolódik.
-- A kezelő mérés előtt elkészít egy delivery_noteot,
-- egy méréshez kétszer áll a mérlegre a kocsi. 
-- Először amikor bejön a telephelyre. Másodszor amikor elmegy a telephelyről.
-- Távozáskor kell neki adni egy szállítólevelet ha kivisz valamit, 
-- és egy mérlegjegyet ha hozott valamit.
CREATE TABLE IF NOT EXISTS `measurements` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `delivery_note_id` bigint not null,
  `vehicle_id` bigint,
  `product_id` bigint,
  `first_weight` float,
  `second_weight` float,
  `first_time` datetime,
  `second_time` datetime,
  `net_weight` float,
  `first_type` char(1),
  `second_type` char(1),
  `created_at` timestamp,
  `created_by` bigint,
  `modified` datetime,
  `modified_by` bigint
);

-- országkódok az ekaer bejelentéshez Magyarország HU 
CREATE TABLE IF NOT EXISTS `countries` (
  `code` varchar(2) PRIMARY KEY,
  `name` varchar(40) not null
);

-- gépkocsi jelzések országkódok az ekaerhez. Magyarország H
CREATE TABLE IF NOT EXISTS `nationality_marks` (
  `mark` varchar(5) PRIMARY KEY,
  `name` varchar(40) not null
);

CREATE TABLE IF NOT EXISTS `measurement_types` (
  `id` char(1) PRIMARY KEY,
  `name` varchar(40) not null
);

-- A permissions tábla nem kell azt hiszem. Kivettem.
-- CREATE TABLE IF NOT EXISTS `permissions` (
--   `permission_id` char(1) PRIMARY KEY,
--   `permission` varchar(20) not null
-- );

-- irányítószámok és települések listája. Csak a zip_code és a city van kitöltve
CREATE TABLE IF NOT EXISTS `zip_codes` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `zip_code` varchar(20)  not null,
  `city` varchar(100)  not null,
  `city_part` varchar(100),
  `street_name` varchar(150),
  `street_type` varchar(50),
  `from_number` int,
  `to_number` int,
  `country_code` varchar(2)
);

-- közterület elnevezések felsorolása. út, utca, tér, stb..
CREATE TABLE IF NOT EXISTS `street_types` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `street_type` varchar(50) not null
);

-- ALTER TABLE `partners` ADD FOREIGN KEY (`partner_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `partners` ADD FOREIGN KEY (`partner_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `owners` ADD FOREIGN KEY (`owner_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `owners` ADD FOREIGN KEY (`owner_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `carriers` ADD FOREIGN KEY (`carrier_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `carriers` ADD FOREIGN KEY (`carrier_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `vehicles` ADD FOREIGN KEY (`vehicle_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `vehicles` ADD FOREIGN KEY (`vehicle_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `movements` ADD FOREIGN KEY (`movement_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `movements` ADD FOREIGN KEY (`movement_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `delivery_notes` ADD FOREIGN KEY (`delivery_note_vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);

-- ALTER TABLE `delivery_notes` ADD FOREIGN KEY (`delivery_note_owner_id`) REFERENCES `owners` (`owner_id`);

-- ALTER TABLE `delivery_notes` ADD FOREIGN KEY (`delivery_note_partner_id`) REFERENCES `partners` (`partner_id`);

-- ALTER TABLE `delivery_notes` ADD FOREIGN KEY (`delivery_note_carrier_id`) REFERENCES `carriers` (`carrier_id`);

-- ALTER TABLE `delivery_notes` ADD FOREIGN KEY (`delivery_note_movement_id`) REFERENCES `movements` (`movement_id`);

-- ALTER TABLE `products` ADD FOREIGN KEY (`product_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `products` ADD FOREIGN KEY (`product_modified_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `measurements` ADD FOREIGN KEY (`measurement_product_id`) REFERENCES `products` (`product_id`);

-- ALTER TABLE `measurements` ADD FOREIGN KEY (`measurement_created_by`) REFERENCES `users` (`user_id`);

-- ALTER TABLE `measurements` ADD FOREIGN KEY (`measurement_modified_by`) REFERENCES `users` (`user_id`);
