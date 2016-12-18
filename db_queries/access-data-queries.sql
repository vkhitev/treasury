-- 1
SELECT
  i.name AS institution_name,
  p.money AS money,
  p.order_date AS order_date,
  k.code AS kekv_code,
  b.name AS bank_name
FROM
  payment_order p
  JOIN institution i ON p.institution_id = i.id
  JOIN bank b ON p.bank_id = b.id
  JOIN kekv k ON p.kekv_id = k.id;

-- 2
SELECT
  i.name AS institution_name,
  k.code AS kekv_code,
  e.year AS year,
  (Estimate_money_limit(e.institution_id,
    e.kekv_id,
    e.year) - Estimate_money_current(e.institution_id,
    e.kekv_id,
    e.year)) AS rest
FROM
  estimate e
  JOIN kekv k ON e.kekv_id = k.id
  JOIN institution i ON e.institution_id = i.id
ORDER BY i.name , e.year;

-- 3
SELECT
  i.name AS institution_name,
  k.code AS kekv_code,
  e.year AS year,
  Estimate_money_current(e.institution_id, e.kekv_id, e.year) AS cur,
  Estimate_money_limit(e.institution_id, e.kekv_id, e.year) AS lim
FROM estimate e
INNER JOIN kekv k
  ON e.kekv_id = k.id
INNER JOIN institution i
  ON e.institution_id = i.id
WHERE
  Estimate_money_current(e.institution_id, e.kekv_id, e.year) <
  _koef * Estimate_money_limit(e.institution_id, e.kekv_id, e.year);

-- 4
SELECT
  i.name AS institution_name,
  Count(DISTINCT e.year) AS years_working
FROM
  (estimate e
  JOIN institution i ON e.institution_id = i.id)
GROUP BY e.institution_id;

-- 5
SELECT
i.name AS institution_name,
Sum(Estimate_money_current(e.institution_id,
  e.kekv_id,
  e.year)) AS money_spent,
(SELECT
    institution_years_working.years_working
  FROM
    institution_years_working
  WHERE
    (institution_years_working.institution_name = i.name)) AS years_working
FROM
  estimate e
  JOIN institution i ON institution_id = i.id
GROUP BY e.institution_id;
