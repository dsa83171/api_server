CREATE TABLE IF NOT EXISTS clips (
  id TEXT PRIMARY KEY,
  url TEXT,
  broadcaster_name TEXT,
  creator_name TEXT,
  title TEXT,
  view_count INTEGER,
  created_at TEXT,
  thumbnail_url TEXT
);