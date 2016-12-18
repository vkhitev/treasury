select
	i.id,
    i.name,
    count(*) as total_payment_orders,
    sum(p.money) as total_money
from institution i
inner join payment_order p
	on i.id = p.institution_id
    and p.order_date between
		cast('1997-11-28' as date) and
		cast('2016-11-19' as date)
group by i.id
order by i.name;

select
	extract(year from p.order_date) as year,
    count(*) as count_orders,
    sum(p.money) as total_money
from institution i
inner join payment_order p
	on i.id = p.institution_id
    and p.order_date between
		cast('1997-11-28' as date) and
		cast('2016-11-19' as date)
group by i.id, extract(year from p.order_date)
	having i.id = 182
order by extract(year from p.order_date);

select
	p.order_date,
    k.code,
    p.money,
    b.name
from payment_order p
inner join kekv k
	on k.id = p.kekv_id
inner join bank b
	on b.id = p.bank_id
where
	p.institution_id = 182 and
	extract(year from p.order_date) = 1995
	p.order_date between
	cast('1997-11-28' as date) and
	cast('2016-11-19' as date)
