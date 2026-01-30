import { Hono } from 'hono'

// test
type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// GET: 取得所有影片 (按觀看次數排序)
app.get('/api/clips', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM clips ORDER BY view_count DESC"
    ).all();
    return c.json({ data: results });
  } catch (e) {
    return c.json({ error: "資料庫讀取失敗" }, 500);
  }
})

// POST: 新增影片
app.post('/api/clips', async (c) => {
  const body = await c.req.json();
  try {
    await c.env.DB.prepare(`
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
    return c.json({ error: "寫入失敗，可能 ID 已存在" }, 400);
  }
})

export default app