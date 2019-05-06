select match_id, start_time, duration, radiant_win, rad_kills, rad_deaths, dire_kills, dire_deaths
from cs411.match
join (
select match_id, sum(kills) as rad_kills, sum(deaths) as rad_deaths
from cs411.players
where player_slot < 5
group by match_id
) AS radiant using (match_id)
join (
select match_id, sum(kills) as dire_kills, sum(deaths) as dire_deaths
from cs411.players
where player_slot > 127
group by match_id
) AS dire using (match_id)
where duration > 0
order by match_id desc
limit 10 offset 10;

select account_id, localized_name, player_level, gold + gold_spent, gold_per_min, xp_per_min, kills, deaths, assists, last_hits, denies, stuns, hero_damage, hero_healing, tower_damage, item_0, item_1, item_2, item_3, item_4, item_5
from cs411.players as p, cs411.hero_names as h
where p.hero_id=h.hero_id and match_id=0;
