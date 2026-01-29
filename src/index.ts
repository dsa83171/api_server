import { Hono } from 'hono'

const app = new Hono()

// 模擬資料庫 
let clips = [
  {
    "id": "DeafTentativePuppyAMPEnergy",
    "url": "https://www.twitch.tv/rockmanchronicles/clip/DeafTentativePuppyAMPEnergy",
    "broadcaster_name": "RockmanChronicles",
    "title": "穩",
    "view_count": 21
  },
  {
    "id": "KathishSlipperyPotDerp-w76RpUrc6b0QhNoF",
    "url": "https://www.twitch.tv/append/clip/KathishSlipperyPotDerp-w76RpUrc6b0QhNoF",
    "broadcaster_name": "Append",
    "title": "物理譴責FM",
    "view_count": 38
  }
]

// GET: 取得清單
app.get('/api/clips', (c) => {
  return c.json({ data: clips })
})

// GET: 取得單一資料
app.get('/api/clips/:id', (c) => {
  const id = c.req.param('id')
  const clip = clips.find(item => item.id === id)
  
  if (!clip) {
    return c.json({ message: '找不到該影片' }, 404)
  }
  return c.json(clip)
})

// POST: 新增資料
app.post('/api/clips', async (c) => {
  const body = await c.req.json()
  const newClip = {
    id: body.id,
    url: body.url,
    broadcaster_name: body.broadcaster_name,
    title: body.title,
    view_count: body.view_count || 0
  }
  
  clips.push(newClip)
  return c.json({ message: '新增成功', data: newClip }, 201)
})

export default app