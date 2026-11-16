require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const CONFIG = {
  PORT: 64304,
  API_KEY: process.env.DOUBAO_API_KEY,
  API_ENDPOINT: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
  MODEL_NAME: process.env.DOUBAO_MODEL
}

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages) throw new Error('参数错误');
    if (!CONFIG.API_KEY) throw new Error('API Key 未配置');

    const llmRes = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.MODEL_NAME,
        messages: messages,
        temperature: 0.8,
        max_tokens: 500
      })
    });
    const data = await llmRes.json();
    res.json(data);
  } catch (err) {
    console.error('错误：', err);
    res.status(500).json({ error: '服务调用失败' });
  }
});

app.listen(CONFIG.PORT, () => {
  console.log(`✅ 后端服务已启动，端口：${CONFIG.PORT}`);
});
