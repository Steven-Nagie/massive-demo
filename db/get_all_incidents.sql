SELECT inc.id, inc.us_state, inj.name AS injury, a.name AS affected_area, c.name AS cause FROM incidents inc
JOIN injuries inj ON inc.injury_id = inj.id
JOIN affected_areas a ON inj.affected_area_id = a.id
JOIN causes c ON inc.cause_id = c.id;
