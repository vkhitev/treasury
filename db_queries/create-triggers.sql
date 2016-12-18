CREATE definer=`vlad`@`localhost` TRIGGER `treasure-department`.`estimate_before_insert` BEFORE INSERT ON `estimate` FOR EACH row
begin
  IF
    new.year < 1991 OR new.year > year(curdate())
    THEN
    signal SQLSTATE '45000'
      SET message_text = 'Can not add or update row: year not in range "1991 - current"';
    END IF;
END

CREATE definer=`vlad`@`localhost` TRIGGER `treasure-department`.`payment_order_before_insert` BEFORE INSERT ON `payment_order`
FOR EACH row
begin
  IF extract(year FROM new.order_date)
    NOT IN (SELECT year FROM estimate WHERE
      estimate.institution_id = new.institution_id)
  THEN
    signal SQLSTATE '45000'
      SET message_text = 'Can not add or update row: no corresponding estimate';
      ELSEIF is_new_money_less_than_limit(new.institution_id, new.kekv_id, new.order_date, new.money) = FALSE
    THEN
    signal SQLSTATE '45000'
      SET message_text = 'Can not add or update row: estimate limit is reached';
    END IF;
END
