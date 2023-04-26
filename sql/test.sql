-- Active: 1678652479984@@127.0.0.1@3306@weighing_db
--delete from users;

--select 'ADmin123@' REGEXP '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8}$';


--select 'ADmin123@!+$"%/=' REGEXP '^(?=.*([A-Z]){1,})(?=.*[!-@]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$';
use weighing_db;
select * from addresses;
delete from users WHERE id>4;
select * from users;
select * from emails;
select * from phones;
select * from carriers;
select * from owners;
select * from partners;
select * from products;
select * from delivery_notes;


insert into carriers (ekaer_id, name, memo, created_by) VALUES
    ( "123456", "Transport Hungary Kft.", "H�tv�g�n nem dolgoznak.", 1),    
    ( "123457", "Transport America Kft.", "Csak h�tv�g�n dolgoznak.", 1);

insert into owners (vat_number, name, bank_account,
    memo, created_by) VALUES
    ( "HU12345678", "Mindent eladunk Kft.", "44444444-44444444-44444444", "Mindig dolgozunk.", 1),    
    ( "12345667-2-22", "Hozz�n j�hetsz, de el�bb telefon�lj", "12345678-87654321-11111111", "Csak akkor dolgozunk ha el�bb telefon�lt�l. Tudod, Covid van...", 1);

insert into partners (vat_number, name, bank_account,
    memo, created_by) VALUES
    ( "HU12345678", "Mindent eladunk Kft.", "44444444-44444444-44444444", "Mindig dolgozunk.", 1),    
    ( "12345667-2-22", "Hozz�nk j�hetsz, de el�bb telefon�lj", "12345678-87654321-11111111", "Csak akkor dolgozunk ha el�bb telefon�lt�l. Tudod, Covid van...", 1);

insert into products (item_number, name, units,
    stock, kg_per_unit, unit_price, vtsz, 
    vat_key, vat_exemption_case, vat_exemption_reason, adr_number, 
    created_by) VALUES
    ( "CEMENT1", "Cement", "m�zsa", 0, 100, 5600, "11221122", "27", "", "", "", 1),    
    ( "S1", "S�der", "tonna", 0, 1000, 9000, "11221122", "27", "", "", "", 1),    
    ( "SH1", "S�rgahomok", "tonna", 0, 1000, 8000, "11221122", "27", "", "", "", 1),    
    ( "SZH1", "Sz�rkehomok", "tonna", 0, 1000, 8000, "11221122", "27", "", "", "", 1);

  insert into 
    delivery_notes (
      serial_no, owner_id, owner_address_id, 
      loadlocation_address_id, partner_id, 
      partner_address_id, unloadlocation_address_id, 
      carrier_id, carrier_address_id, 
      movement_id, status, 
      created_by ) values
    ( "SNO-2023-000001", 5,  
      $delivery_note_owner_address_id, 
      $delivery_note_loadlocation_address_id, 
      $delivery_note_partner_id, 
      $delivery_note_partner_address_id, 
      $delivery_note_unloadlocation_address_id, 
      $delivery_note_carrier_id, 
      $delivery_note_carrier_address_id, 
      $delivery_note_movement_id, 
      $delivery_note_status, 
      $delivery_note_created_at, 
      $delivery_note_created_by, 
      $delivery_note_modified, 
      $delivery_note_modified_by
    );

--DELETE 
delete from users WHERE id>4;
delete from emails;
delete from phones;
delete from carriers;
delete from owners;
delete from partners;
delete from products;

