ALTER TABLE admins ADD password VARCHAR(100);

UPDATE admins set password=crypt(code, gen_salt('bf', 10));

ALTER TABLE admins ALTER COLUMN password SET NOT NUll;
