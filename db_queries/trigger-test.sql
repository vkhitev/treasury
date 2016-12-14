-- Unique tuple validation failed
INSERT INTO estimate (kekv_id, institution_id, money_limit, year)
	VALUES (14, 3, 123321, 1997);
    
-- Unsigned value validation failed
INSERT INTO estimate (kekv_id, institution_id, money_limit, year)
	VALUES (14, 3, -30, 1997);

-- Year range validation failed
INSERT INTO estimate (kekv_id, institution_id, money_limit, year)
	VALUES (10, 10, 10, 1990);

-- No corresponding estimate validation failed
INSERT INTO payment_order (institution_id, kekv_id, bank_id, money, order_date)
	VALUES (3, 26, 6, 10, STR_TO_DATE('2002-02-11', '%Y-%m-%d'));
    
-- Estimate money limit reached validation failed
INSERT INTO payment_order (institution_id, kekv_id, bank_id, money, order_date)
	VALUES (3, 26, 6, 10000, STR_TO_DATE('1996-02-11', '%Y-%m-%d'));
    
-- No corresponding estimate validation failed
UPDATE payment_order
	SET order_date = STR_TO_DATE('2002-02-11', '%Y-%m-%d')
    WHERE
		institution_id = 3 AND
        kekv_id = 14 AND
        EXTRACT(YEAR FROM order_date) = 1997;
        
-- Estimate money limit reached validation failed
UPDATE payment_order
	SET money = 10000
    WHERE
		institution_id = 3 AND
        kekv_id = 14 AND
        EXTRACT(YEAR FROM order_date) = 1997;