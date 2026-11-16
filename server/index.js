require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 64304

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  try {
    const userMsg = req.body.message
    const apiKey = process.env.DOUBAO_API_KEY
    const modelName = process.env.DOUBAO_MODEL

    if (!apiKey) {
      return res.status(500).json({ reply: "API Key 未加载" })
    }

    const result = await axios.post(
      "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
      {
        model: modelName,
        messages: [
          { role: "user", content: userMsg }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    )
    res.json({ reply: result.data.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: "接口调用失败" })
  }
})

app.listen(port, () => {
  console.log(`后端服务运行在 http://localhost:${port}`)
})
