WITH new_incident AS (
  INSERT INTO incidents (us_state, injury_id, cause_id)
  VALUES ($1, $2, $3)
  RETURNING *
)
SELECT inc.id, inc.us_state, inj.name AS injury, a.name AS affected_area, c.name AS cause FROM incidents inc
JOIN injuries inj ON inc.injury_id = inj.id
JOIN affected_areas a ON inj.affected_area_id = a.id
JOIN causes c ON inc.cause_id = c.id
WHERE inc.id = (SELECT id FROM new_incident);

--Problem seems to be that id does not exist when we insert the new row, so it looks for and grabs something that isn't there, which results in sending back an empty array.

-- INSERT INTO incidents (us_state, injury_id, cause_id)
--   VALUES ($1, $2, $3)
--   RETURNING id;
