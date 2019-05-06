select match_id, p.account_id, localized_name, kills, deaths, assists, gold_per_min, xp_per_min
from players as p, hero_names as h
where p.account_id > 0 and p.hero_id = h.hero_id and p.account_id=759;

select account_id, total_wins, total_matches from player_ratings where account_id > 0;

select * from players where account_id > 0;
select * from player_ratings;
select * from chat;