-- Active: 1679018847898@@127.0.0.1@3306@weighing_db
--delete from users;

--select 'ADmin123@' REGEXP '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8}$';


--select 'ADmin123@!+$"%/=' REGEXP '^(?=.*([A-Z]){1,})(?=.*[!-@]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$';
use weighing_db;


select * from addresses;
select * from users;
select * from emails;
select * from phones;
select * from carriers;


// DELETE 
delete from users WHERE user_id>4;
delete from emails;
delete from phones;
delete from carriers;