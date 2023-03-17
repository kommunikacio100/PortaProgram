-- Active: 1677723883291@@127.0.0.1@3306@webshop

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
  `user_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(100) not null,
  `user_password_hash` varchar(128) not null, # a felhasználó jelszavának HASH512 kódja
  `user_can_look_data` INT  not null,
  `user_can_edit_data` INT  not null,
  `user_can_weighing` INT  not null,
  `user_can_edit_users` INT  not null,
  `user_can_settings` INT  not null,
  `user_created_at` timestamp,
  `user_created_by` bigint,
  `user_modified` datetime,
  `user_modified_by` bigint
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
  `address_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `address_to_table` char(1)  not null,
  `address_to_id` bigint  not null,
  `default_address` boolean,
  `country_code` varchar(2),
  `zip_code` varchar(10),
  `city` varchar(50),
  `street_name` varchar(150),
  `street_type` varchar(50),
  `street_number` varchar(10),
  `lot_number` varchar(15),
  `gps_latitude` float,
  `gps_longitude` float, 
  `address_created_at` timestamp,
  `address_created_by` bigint,
  `address_modified` datetime,
  `address_modified_by` bigint
);

-- Email címek táblázata
-- Ahogy a címek, ez is táblához van rendelve(email_to_table), és egy ID-hoz(email_to_id). 
-- Lehet egy megjegyzést mellé tenni, ha kellene valami info az email címhez.
-- Egy-egy id-hoz több email is rendelhető, lehet default email cím is.
CREATE TABLE IF NOT EXISTS `emails` (
  `email_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `email_to_table` char(1) not null,
  `email_to_id` bigint not null,
  `email` varchar(128) not null,
  `email_memo` text,
  `email_default` boolean,
  `email_created_at` timestamp,
  `email_created_by` bigint,
  `email_modified` datetime,
  `email_modified_by` bigint
);

-- Telefonszámok. Hasonlóan működik mint a cím és az email adatok.
CREATE TABLE IF NOT EXISTS `phones` (
  `phone_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `phone_to_table` char(1) not null,
  `phone_to_id` bigint not null,
  `phone` varchar(15) not null,
  `phone_memo` text,
  `phone_default` boolean,
  `phone_created_at` timestamp,
  `phone_created_by` bigint,
  `phone_modified` datetime,
  `phone_modified_by` bigint
);

-- Partnerek azok, akik hoznak vagy visznek valamit.
-- Lehet hozzájuk címeket, email címeket, telefonszámokat rendelni.
CREATE TABLE IF NOT EXISTS `partners` (
  `partner_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `partner_vatNumber` varchar(15) ,
  `partner_name` varchar(200) not null,
  `partner_note` text,
  `partner_bankAccountNumber` varchar(26),
  `partner_created_at` timestamp,
  `partner_created_by` bigint,
  `partner_modified` datetime,
  `partner_modified_by` bigint
);

-- Tulajdonosok azok akik a telephely tulajdonosok.
-- Nekik adnak el a partnerek, vagy tőlük vásárolnak.
-- Lehet hozzájuk címeket, email címeket, telefonszámokat rendelni.
CREATE TABLE IF NOT EXISTS `owners` (
  `owner_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `owner_vatNumber` varchar(15),
  `owner_name` varchar(200) not null,
  `owner_bankAccountNumber` varchar(26),
  `owner_memo` text,
  `owner_created_at` timestamp,
  `owner_created_by` bigint,
  `owner_modified` datetime,
  `owner_modified_by` bigint
);

-- Szállítók, akik a fuvarozást végzik.
CREATE TABLE IF NOT EXISTS `carriers` (
  `carrier_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `carrier_ekaerId` varchar(30),
  `carrier_name` varchar(200) not null,
  `carrier_memo` text,
  `carrier_created_at` timestamp,
  `carrier_created_by` bigint,
  `carrier_modified` datetime,
  `carrier_modified_by` bigint
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
  `vehicle_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `vehicle_plate_number1` varchar(20) not null,
  `vehicle_country_code1` varchar(5),
  `vehicle_plate_number2` varchar(20),
  `vehicle_country_code2` varchar(5),
  `vehicle_plate_number3` varchar(20),
  `vehicle_country_code3` varchar(5),
  `vehicle_empty_weight` float,
  `vehicle_empty_time` datetime,
  `vehicle_created_at` timestamp,
  `vehicle_created_by` bigint,
  `vehicle_modified` datetime,
  `vehicle_modified_by` bigint
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
  `movement_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `movement_name` varchar(30) not null,
  `movement_stock_relation` char(1),
  `movement_head` varchar(50),
  `movement_left_side` varchar(50),
  `movement_right_side` varchar(50),
  `movement_form_file_name` varchar(250),
  `movement_created_at` timestamp,
  `movement_created_by` bigint,
  `movement_modified` datetime,
  `movement_modified_by` bigint
);

-- Delivery_notes
-- Ez a szállítólevelek fejléce.
-- Egy egy szállítólevélhez több measurement tartozhat.
-- Sorszám, Tulajdonos, Partner, Szállító, Mozgásirány  
CREATE TABLE IF NOT EXISTS `delivery_notes` (
  `delivery_note_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `delivery_note_serial_no` varchar(20) not null,
  `delivery_note_owner_id` bigint,
  `delivery_note_owner_address_id` bigint,
  `delivery_note_loadlocation_address_id` bigint,
  `delivery_note_partner_id` bigint,
  `delivery_note_partner_address_id` bigint,
  `delivery_note_unloadlocation_address_id` bigint,
  `delivery_note_carrier_id` bigint,
  `delivery_note_carrier_address_id` bigint,
  `delivery_note_movement_id` bigint,
  `delivery_note_created_at` timestamp,
  `delivery_note_created_by` bigint,
  `delivery_note_modified` datetime,
  `delivery_note_modified_by` bigint
);

-- Termék adatok
-- Lehet egy cikkszáma, azaz item_number
-- Neve, mennyiségi egysége(units),
-- stock az aktuális raktárkészlet,
-- kg_per_unit akkor érdekes, ha mérleggel mérik, de mondjuk m3-ben van az egységára.
-- Ilyenkor át kell számolni a mennyiséget m3-re. De ezzel nem tudom hogy foglalkozzunk e.
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_item_number` varchar(20) not null,
  `product_name` varchar(200) not null,
  `product_units` varchar(20) not null,
  `product_stock` float,
  `product_kg_per_unit` float,
  `product_unit_price` float,
  `product_vtsz` varchar(10),
  `product_vatKey` varchar(10),
  `product_vat_exemption_case` varchar(10),
  `product_vat_exemption_reason` varchar(100),
  `product_adr_number` varchar(200),
  `product_created_at` timestamp,
  `product_created_by` bigint,
  `product_modified` datetime,
  `product_modified_by` bigint
);

-- Ezek a mérlegesek. Minden mérés egy Delivery_notehoz kapcsolódik.
-- A kezelő mérés előtt elkészít egy delivery_noteot,
-- egy méréshez kétszer áll a mérlegre a kocsi. 
-- Először amikor bejön a telephelyre. Másodszor amikor elmegy a telephelyről.
-- Távozáskor kell neki adni egy szállítólevelet ha kivisz valamit, 
-- és egy mérlegjegyet ha hozott valamit.
CREATE TABLE IF NOT EXISTS `measurements` (
  `measurement_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `measurement_delivery_note_id` bigint not null,
  `delivery_note_vehicle_id` bigint,
  `measurement_product_id` bigint,
  `measurement_first_weight` float,
  `measurement_second_weight` float,
  `measurement_first_time` datetime,
  `measurement_second_time` datetime,
  `measurement_net_weight` float,
  `measurement_first_type` char(1),
  `measurement_second_type` char(1),
  `measurement_created_at` timestamp,
  `measurement_created_by` bigint,
  `measurement_modified` datetime,
  `measurement_modified_by` bigint
);

-- országkódok az ekaer bejelentéshez Magyarország HU 
CREATE TABLE IF NOT EXISTS `countries` (
  `country_code` varchar(2) PRIMARY KEY,
  `country_name` varchar(40) not null
);

-- gépkocsi jelzések országkódok az ekaerhez. Magyarország H
CREATE TABLE IF NOT EXISTS `nationality_marks` (
  `nationality_mark` varchar(5) PRIMARY KEY,
  `nationality_mark_name` varchar(40) not null
);

CREATE TABLE IF NOT EXISTS `measurement_types` (
  `measurement_type_id` char(1) PRIMARY KEY,
  `measurement_type_name` varchar(40) not null
);

-- A permissions tábla nem kell azt hiszem. Kivettem.
-- CREATE TABLE IF NOT EXISTS `permissions` (
--   `permission_id` char(1) PRIMARY KEY,
--   `permission` varchar(20) not null
-- );

-- irányítószámok és települések listája. Csak a zip_code és a city van kitöltve
CREATE TABLE IF NOT EXISTS `zip_codes` (
  `zip_code_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `zip_code` varchar(20)  not null,
  `city` varchar(100)  not null,
  `city_part` varchar(100),
  `street_name` varchar(150),
  `street_type` varchar(50),
  `hazszamtol` int,
  `haszszamig` int,
  `country_code` varchar(2)
);

-- közterület elnevezések felsorolása. út, utca, tér, stb..
CREATE TABLE IF NOT EXISTS `street_types` (
  `street_type_id` bigint PRIMARY KEY AUTO_INCREMENT,
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
