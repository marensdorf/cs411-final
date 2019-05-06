/*
 * You generally want to .gitignore this file to prevent important credentials from being stored on your public repo.
 */
module.exports = {
    get_matches : "select match_id, start_time, duration, radiant_win, rad_kills, rad_deaths, dire_kills, dire_deaths from cs411.match join ( select match_id, sum(kills) as rad_kills, sum(deaths) as rad_deaths from cs411.players where player_slot < 5 group by match_id ) AS radiant using (match_id) join ( select match_id, sum(kills) as dire_kills, sum(deaths) as dire_deaths from cs411.players where player_slot > 127 group by match_id ) AS dire using (match_id) where duration > 0 order by match_id desc",
    get_match : "select account_id, localized_name as hero_name, player_level as level, gold + gold_spent as total_gold, gold_per_min, xp_per_min, kills, deaths, assists, last_hits, denies, stuns, hero_damage, hero_healing, tower_damage, item_0, item_1, item_2, item_3, item_4, item_5 from cs411.players as p, cs411.hero_names as h where p.hero_id=h.hero_id and match_id=",
    delete_match : "delete from cs411.players where match_id=",
    get_players : "select * from cs411.player_ratings where account_id > 0",
    get_player_games : "select match_id, localized_name, kills, deaths, assists, gold_per_min, xp_per_min from cs411.players as p, cs411.hero_names as h where p.account_id > 0 and p.hero_id = h.hero_id and p.account_id=",
    delete_player : "delete from cs411.player_ratings where account_id=",
    get_max_player_id : "select max(account_id) as max from cs411.player_ratings",
    insert_player : "insert into cs411.player_ratings (account_id, total_wins, total_matches) value (?, ?, ?)"

};
