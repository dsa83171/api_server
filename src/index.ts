import { Hono } from 'hono'

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
  const { id, url, broadcaster_name, creator_name, title, view_count, created_at, thumbnail_url } = body;

  try {
    await c.env.DB.prepare(
      `INSERT INTO clips (id, url, broadcaster_name, creator_name, title, view_count, created_at, thumbnail_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(id, url, broadcaster_name, creator_name, title, view_count, created_at, thumbnail_url)
    .run();

    return c.json({ message: "成功存入 D1 資料庫" }, 201);
  } catch (e) {
    return c.json({ error: "寫入失敗，可能 ID 已存在" }, 400);
  }
})

export default app