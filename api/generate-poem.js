// api/generate-poem.js
export default async function handler(req, res) {
  // 1. 设置跨域请求头，允许你的前端网页访问这个接口
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理浏览器的预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  // 2. 接收前端传来的 prompt
  const { prompt } = req.body;
  
  // 3. 从 Vercel 环境变量中读取密钥
  const apiKey = process.env.API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: '未配置 API_KEY 环境变量，请检查 Vercel 设置' });
  }

  try {
    // 4. 调用大模型 API（以豆包/火山引擎为例）
    const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        // ⚠️⚠️⚠️ 必须修改这里 ⚠️⚠️⚠️
        // 把下面单引号里的内容，换成你真实申请的豆包模型接入点 ID（ep-xxxx 那个）
        model: 'doubao-seed-2.1-lite',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`大模型接口返回错误: ${errText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // 5. 将 AI 结果返回给前端
    res.status(200).json({ content: content });
  } catch (error) {
    console.error('API 请求失败:', error);
    res.status(500).json({ error: 'AI 服务调用失败，请稍后重试' });
  }
}
