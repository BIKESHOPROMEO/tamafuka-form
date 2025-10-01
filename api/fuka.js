export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { date, start, end, reason } = req.body;

  const GAS_URL = 'hhttps://script.google.com/macros/s/AKfycbwvqxdEp4sWhAACzZRlPe9LzNdNxg2lY5XvIh_uRcfWJHMTnKlFaetKAdwSPdiGzTtwDg/exec'; // ← GASのWebアプリURLに差し替え！

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date, start, end, reason })
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({ success: false, message: 'GAS登録失敗' });
    }

    return res.status(200).json({ success: true, message: text });
  } catch (err) {
    console.error('GAS通信エラー:', err);
    return res.status(500).json({ success: false, message: '通信エラー' });
  }
}