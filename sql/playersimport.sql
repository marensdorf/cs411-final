CREATE TABLE cs411.players (
	match_id INT NOT NULL,
    account_id INT NOT NULL,
    hero_id INT NOT NULL,
    player_slot INT NOT NULL,
    gold INT NOT NULL,
    gold_spent INT NOT NULL,
    gold_per_min INT NOT NULL,
    xp_per_min INT NOT NULL,
    kills INT NOT NULL,
    deaths INT NOT NULL,
    assists INT NOT NULL,
    denies INT NOT NULL,
    last_hits INT NOT NULL,
    stuns DOUBLE NOT NULL,
    hero_damage INT NOT NULL,
    hero_healing INT NOT NULL,
    tower_damage INT NOT NULL,
    item_0 INT NOT NULL,
    item_1 INT NOT NULL,
    item_2 INT NOT NULL,
    item_3 INT NOT NULL,
    item_4 INT NOT NULL,
    item_5 INT NOT NULL,
    player_level INT NOT NULL,
    leaver_status INT NOT NULL,
    primary key (match_id, player_slot)
);

LOAD DATA INFILE '/Users/marensdorf/CloudStation/UIUC 2019S/CS 411/Final/dota-2-matches/players.csv' 
INTO TABLE cs411.players
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(match_id,account_id,hero_id,player_slot,gold,gold_spent,gold_per_min,xp_per_min,kills,deaths,assists,denies,last_hits,@vstuns,hero_damage,hero_healing,tower_damage,item_0,item_1,item_2,item_3,item_4,item_5,player_level,leaver_status,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy,@dummy)
SET stuns = IF(@vstuns='None', 0.0, @vstuns);