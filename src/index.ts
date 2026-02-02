import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  api_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// GET: 取得所有影片 (按觀看次數排序)
app.get('/api/clips', async (c) => {
  try {
    const { results } = await c.env.api_db.prepare(
      "SELECT * FROM clips ORDER BY created_at DESC"
    ).all();
    return c.json({ data: results });
  } catch (e) {
    return c.json({ error: "資料庫讀取失敗" }, 500);
  }
})

// GET: 取得所有影片 (按觀看次數排序)
app.get('/api/clips/ids', async (c) => {
  try {
    const { results } = await c.env.api_db.prepare(
      "SELECT id FROM clips ORDER BY created_at"
    ).all();
    return c.json({ data: results });
  } catch (e) {
    return c.json({ error: "資料庫讀取失敗" }, 500);
  }
})

// GET: 取得所有影片 (按觀看次數排序)
app.get('/api/clips/id/:id', async (c) => {
  try {
    const { results } = await c.env.api_db.prepare(
      "SELECT * FROM clips WHERE id = ? "
    ).bind(c.req.param("id")).all();
    return c.json({ data: results });
  } catch (e) {
    return c.json({ error: "資料庫讀取失敗" }, 500);
  }
})


// POST: 新增影片
app.post('/api/clips', async (c) => {
  const body = await c.req.json();
  try {
    await c.env.api_db.prepare(`
      INSERT INTO clips (
        id, url, embed_url, broadcaster_id, broadcaster_name, 
        creator_id, creator_name, video_id, game_id, language, 
        title, view_count, created_at, thumbnail_url, duration, 
        vod_offset, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      body.id, body.url, body.embed_url, body.broadcaster_id, body.broadcaster_name,
      body.creator_id, body.creator_name, body.video_id, body.game_id, body.language,
      body.title, body.view_count, body.created_at, body.thumbnail_url, body.duration,
      body.vod_offset, body.is_featured
    )
    .run();

    return c.json({ message: "成功存入 D1 資料庫" }, 201);
  } catch (e) {
    return c.json({ error: e }, 400);
  }
})

export default app