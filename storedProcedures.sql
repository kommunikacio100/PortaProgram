-- Active: 1677906231590@@127.0.0.1@3306@weighing_db
DROP PROCEDURE IF EXISTS add_user;
DELIMITER //
CREATE PROCEDURE add_user( 
    in _user_name varchar(128), 
    in _user_password varchar(128), 
    in _user_can_look_data INT, 
    in _user_can_edit_data INT, 
    in _user_can_weighing INT, 
    in _user_can_edit_users INT, 
    in _user_can_settings INT, 
    out the_user_id BIGINT,
    out error_text varchar(128))
BEGIN
    SET error_text = 'START';
    IF LENGTH( _user_name)>0 
        and _user_password REGEXP '^(?=.*([A-Z]){1,})(?=.*[!-@]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$'
    THEN 
        SET error_text = 'start';
        

        SET @SAMEUSER = (SELECT Count( user_id) from users WHERE user_name= _user_name);
        IF @SAMEUSER = 0 THEN
            SET error_text = 'Hibás Insert utasítás az add_user stored procedure-ban';
            INSERT into users 
                ( user_name,  user_password_hash,         user_can_look_data,  user_can_edit_data,  user_can_weighing,  user_can_edit_users,  user_can_settings)
            VALUES 
                ( _user_name, SHA2( _user_password, 512), _user_can_look_data, _user_can_edit_data, _user_can_weighing, _user_can_edit_users, _user_can_settings);
            SET the_user_id = LAST_INSERT_ID();
            SET error_text = 'Az új felhasználó létrehozva.';
        ELSE
            SET error_text = 'A felhasználó már létezik.';
        END IF;
    ELSE
        SET error_text = 'A jelszó nem megfelelő. Kisbetű+Nagybetű+Szám+Írásjel(!-@)';
    END IF;
END//
DELIMITER ;

call add_user( 'Kálmán', '!!ALLman1234', 1, 1, 1, 0, 0, @ID, @Err);
call add_user( 'Administrator', 'ADmin123@$!', 1, 1, 1, 1, 1, @ID, @Err);
call add_user( 'User', 'User123!', 1, 1, 1, 0, 0, @ID, @Err);
call add_user( 'Eszter', 'User123!', 1, 1, 1, 0, 0, @ID, @Err);
select @ID, @Err;


DROP PROCEDURE IF EXISTS add_user_hash;
DELIMITER //
CREATE PROCEDURE add_user_hash( 
    in _user_name varchar(128), 
    in _user_pwd_hash varchar(128), 
    in _user_can_look_data INT, 
    in _user_can_edit_data INT, 
    in _user_can_weighing INT, 
    in _user_can_edit_users INT, 
    in _user_can_settings INT, 
    out the_user_id BIGINT,
    out error_text varchar(128))
BEGIN
    SET error_text = 'START';
    SET @SAMEUSER = (SELECT Count( user_id) from users WHERE user_name= _user_name);
    IF @SAMEUSER = 0 THEN
        SET error_text = 'Hibás Insert utasítás az add_user_hash stored procedure-ban';
        INSERT into users 
            ( user_name,   user_pwd_hash,  user_can_look_data,  user_can_edit_data,  user_can_weighing,  user_can_edit_users,  user_can_settings)
        VALUES 
            ( _user_name, _user_pwd_hash, _user_can_look_data, _user_can_edit_data, _user_can_weighing, _user_can_edit_users, _user_can_settings);
        SET the_user_id = LAST_INSERT_ID();
        SET error_text = 'Az új felhasználó létrehozva.';
    ELSE
        SET error_text = 'A felhasználó már létezik.';
    END IF;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS update_user;
DELIMITER //
CREATE PROCEDURE update_user( 
    in _user_id BIGINT,
    in _user_name varchar(128), 
    in _user_password varchar(128), 
    in _user_can_look_data INT, 
    in _user_can_edit_data INT, 
    in _user_can_weighing INT, 
    in _user_can_edit_users INT, 
    in _user_can_settings INT, 
    out the_user_id BIGINT,
    out error_text varchar(128))
BEGIN
    SET error_text = 'START';
    IF LENGTH( _user_name)>0 
        and _user_password REGEXP '^(?=.*([A-Z]){1,})(?=.*[!-@]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,100}$'
    THEN 
        SET error_text = 'start';
        

        SET @SAMEUSER = (SELECT Count( user_id) from users WHERE user_name= _user_name and user_id <> _user_id);
        IF @SAMEUSER = 0 THEN
            SET error_text = 'Hibás Insert utasítás az add_user stored procedure-ban';
            REPLACE into users 
                ( user_id,  user_name,  user_password_hash,         user_can_look_data,  user_can_edit_data,  user_can_weighing,  user_can_edit_users,  user_can_settings)
            VALUES 
                ( _user_id, _user_name, SHA2( _user_password, 512), _user_can_look_data, _user_can_edit_data, _user_can_weighing, _user_can_edit_users, _user_can_settings);
            SET the_user_id = _user_id;
            SET error_text = 'A felhasználó módosítva.';
        ELSE
            SET error_text = 'A felhasználónév már létezik.';
        END IF;
    ELSE
        SET error_text = 'A jelszó nem megfelelő. Kisbetű+Nagybetű+Szám+Írásjel(!-@)';
    END IF;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS update_user_hash;
DELIMITER //
CREATE PROCEDURE update_user_hash( 
    in _user_id BIGINT,
    in _user_name varchar(128), 
    in _user_pwd_hash varchar(128), 
    in _user_can_look_data INT, 
    in _user_can_edit_data INT, 
    in _user_can_weighing INT, 
    in _user_can_edit_users INT, 
    in _user_can_settings INT, 
    out the_user_id BIGINT,
    out error_text varchar(128))
BEGIN
    SET error_text = 'START';
    SET @SAMEUSER = (SELECT Count( user_id) from users WHERE user_name= _user_name and user_id <> _user_id);
    IF @SAMEUSER = 0 THEN
        SET error_text = 'Hibás Insert utasítás az add_user stored procedure-ban';
        REPLACE into users 
            ( user_id,  user_name,  user_password_hash,         user_can_look_data,  user_can_edit_data,  user_can_weighing,  user_can_edit_users,  user_can_settings)
        VALUES 
            ( _user_id, _user_name, SHA2( _user_password, 512), _user_can_look_data, _user_can_edit_data, _user_can_weighing, _user_can_edit_users, _user_can_settings);
        SET the_user_id = _user_id;
        SET error_text = 'A felhasználó módosítva.';
    ELSE
        SET error_text = 'A felhasználónév már létezik.';
    END IF;
END//
DELIMITER ;
