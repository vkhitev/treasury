CREATE definer=`vlad`@`localhost` function `estimate_money_current`(_institution_id INT, _kekv_id INT, _year INT) returns DECIMAL(10,2)
begin
    RETURN (SELECT ifnull(sum(money), 0) FROM payment_order
  WHERE
    extract(year FROM order_date) = _year AND
    institution_id = _institution_id AND
    kekv_id = _kekv_id);
END


CREATE definer=`vlad`@`localhost` function `estimate_money_limit`(_institution_id INT, _kekv_id INT, _year INT) returns DECIMAL(10,2)
begin
    RETURN (SELECT money_limit FROM estimate
  WHERE
    year = _year AND
    institution_id = _institution_id AND
    kekv_id = _kekv_id);
END


CREATE definer=`vlad`@`localhost` function `is_new_money_less_than_limit`(_institution_id INT, _kekv_id INT, _date date, _new_money DECIMAL(10, 2)) returns TINYINT(1)
begin
    RETURN
    estimate_money_current(_institution_id, _kekv_id, extract(year FROM _date)) +
    _new_money <= estimate_money_limit(_institution_id, _kekv_id, extract(year FROM _date));
END
