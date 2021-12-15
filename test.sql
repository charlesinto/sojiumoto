
select channel, avg(count) from
(
select DATE_TRUNC('day', occurred_at) as day,
channel, count(w.id) as count from 
web_events w
group by 1, 2
) sub
group by 1
order by 2 desc


select * from orders
where DATE_TRUNC('month', occurred_at) =
(
  select DATE_TRUNC('month',min(occurred_at))
     from orders
)