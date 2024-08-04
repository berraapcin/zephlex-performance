import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import fetch from 'node-fetch';
import cors from 'cors'; 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zephlex_123',
  database: 'panel',
});

const STOCK_PRICE_API = 'https://live-price-source.sentimentalgo.com/api/v1/marketdata/getStockBarData';

const fetchStockBarData = async (names, dateTime, period) => {
  const apiKey = 'a5f34332-0a26-4afe-96d3-9de0091e7933';
  const apiUrl = `${STOCK_PRICE_API}?names=${names}&dateTime=${dateTime}&period=${period}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('API isteği başarısız oldu.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API hatası:', error);
    throw error;
  }
};

const performCalculations = async (excelVeriId, entryDate, exitDate, stockName) => {
  try {
    const entryPriceResponse = await fetchStockBarData(stockName, entryDate, '1m');
    const exitPriceResponse = await fetchStockBarData(stockName, exitDate, '1m');

    if (!entryPriceResponse.isSuccess || !exitPriceResponse.isSuccess) {
      throw new Error('Hisse fiyatları çekilemedi.');
    }

    const entryPrice = entryPriceResponse.result.symbolBarData[0].barData[0];
    const exitPrice = exitPriceResponse.result.symbolBarData[0].barData[0];

    const performance = exitPrice.close - entryPrice.close;

    await db.promise().query(
      'INSERT INTO performans_bilgileri (excel_veri_id, entryDate, exitDate, performance, date) VALUES (?, ?, ?, ?, NOW())',
      [excelVeriId, entryDate, exitDate, performance]
    );

    await db.promise().query(
      'UPDATE performans_durumlari SET durum = ? WHERE excel_veri_id = ?',
      ['Tamamlandı', excelVeriId]
    );
  } catch (error) {
    console.error(error);

    await db.promise().query(
      'UPDATE performans_durumlari SET durum = ? WHERE excel_veri_id = ?',
      ['Hata', excelVeriId]
    );
  }
};

app.get('/excel_verileri', async (req, res) => {
  try {
    const results = await db.promise().query('SELECT * FROM excel_verileri');
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: 'Veriler alınamadı.' });
  }
});

app.get('/excel_verileri/:stockName', async (req, res) => {
  const { stockName } = req.params;

  try {
    const results = await db.promise().query('SELECT * FROM excel_verileri WHERE stockName = ?', [stockName]);
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: 'Veriler alınamadı.' });
  }
});

app.post('/excel_verileri', async (req, res) => {
  const { entryDate, stockName, exitDate, category } = req.body;

  try {
    const result = await db.promise().query(
      'INSERT INTO excel_verileri (entryDate, stockName, exitDate, category) VALUES (?, ?, ?, ?)',
      [entryDate, stockName, exitDate, category]
    );

    const excelVeriId = result[0].insertId;

    await db.promise().query(
      'INSERT INTO performans_durumlari (excel_veri_id, durum) VALUES (?, ?)',
      [excelVeriId, 'İşleniyor']
    );

    await performCalculations(excelVeriId, entryDate, exitDate, stockName);

    res.status(201).json({ message: 'Veri başarıyla eklendi.' });
  } catch (error) {
    res.status(500).json({ error: 'Veri eklenemedi.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} numarasıyla çalışıyor...`);
});
