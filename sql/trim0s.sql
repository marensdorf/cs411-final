DELETE FROM player_ratings
WHERE account_id=0;

DELETE FROM ability_ids
WHERE ability_id=0;

DELETE FROM hero_names
WHERE hero_id=0;

DELETE FROM item_ids
WHERE item_id=0;

INSERT item_ids
VALUES(0, 'empty');

DELETE FROM `match`
WHERE duration=0;

select * from players;