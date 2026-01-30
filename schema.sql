--DROP TABLE IF EXISTS clips; -- 先刪除舊的表
CREATE TABLE IF NOT EXISTS clips (
  id TEXT PRIMARY KEY,
  url TEXT,
  embed_url TEXT,
  broadcaster_id TEXT,
  broadcaster_name TEXT,
  creator_id TEXT,
  creator_name TEXT,
  video_id TEXT,
  game_id TEXT,
  language TEXT,
  title TEXT,
  view_count INTEGER,
  created_at TEXT,
  thumbnail_url TEXT,
  duration REAL,
  vod_offset REAL,
  is_featured BOOLEAN
);