-- Active: 1677906231590@@127.0.0.1@3306@weighing_db
--delete from users;

--select 'ADmin123@' REGEXP '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8}$';


--select 'ADmin123@!+$"%/=' REGEXP '^(?=.*([A-Z]){1,})(?=.*[!-@]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$';
use weighing_db;


select * from addresses;
select * from users;
select * from emails;
select * from phones;
select * from carriers;
select * from owners;
select * from partners;
select * from products;


insert into carriers (carrier_ekaerid, carrier_name, carrier_memo, carrier_created_by) VALUES
    ( "123456", "Transport Hungary Kft.", "Hétvégén nem dolgoznak.", 1),    
    ( "123457", "Transport America Kft.", "Csak hétvégén dolgoznak.", 1);

insert into owners (owner_vatNumber, owner_name, owner_bankAccountNumber,
    owner_memo, owner_created_by) VALUES
    ( "HU12345678", "Mindent eladunk Kft.", "44444444-44444444-44444444", "Mindig dolgozunk.", 1),    
    ( "12345667-2-22", "Hozzán jöhetsz, de előbb telefonálj", "12345678-87654321-11111111", "Csak akkor dolgozunk ha előbb telefonáltál. Tudod, Covid van...", 1);

insert into partners (partner_vatNumber, partner_name, partner_bankAccountNumber,
    partner_note, partner_created_by) VALUES
    ( "HU12345678", "Mindent eladunk Kft.", "44444444-44444444-44444444", "Mindig dolgozunk.", 1),    
    ( "12345667-2-22", "Hozzánk jöhetsz, de előbb telefonálj", "12345678-87654321-11111111", "Csak akkor dolgozunk ha előbb telefonáltál. Tudod, Covid van...", 1);

insert into products (product_item_number, product_name, product_units,
    product_stock, product_kg_per_unit, product_unit_price, product_vtsz, 
    product_vatKey, product_vat_exemption_case, product_vat_exemption_reason, product_adr_number, 
    product_created_by) VALUES
    ( "CEMENT1", "Cement", "mázsa", 0, 100, 5600, "11221122", "27", "", "", "", 1),    
    ( "S1", "Sóder", "tonna", 0, 1000, 9000, "11221122", "27", "", "", "", 1),    
    ( "SH1", "Sárgahomok", "tonna", 0, 1000, 8000, "11221122", "27", "", "", "", 1),    
    ( "SZH1", "Szürkehomok", "tonna", 0, 1000, 8000, "11221122", "27", "", "", "", 1);



// DELETE 
delete from users WHERE user_id>4;
delete from emails;
delete from phones;
delete from carriers;
delete from owners;
delete from partners;
delete from products;

