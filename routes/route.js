const express = require('express')
const axios = require('axios')
const router = express.Router();
const Instagram = require('../lib/igdl')
const YoutubeAudio = require('../lib/ytmp3')
const YoutubeVideo = require('../lib/ytmp4');
const { fetchJson, getBuffer } = require('../lib/func');

// ------ Downloader ------- //
router.get("/dl/igdl", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ msg: "URL is required" });
  }
  try {
    const result = await Instagram(url);
    if (result.msg) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
});

router.get("/dl/ytmp3", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      status: false,
      creator: "© Void",
      message: "[!] Masukkan parameter url"
    });
  }
  try {
    const result = await YoutubeAudio(url); 
    if (!result.status) {
      return res.status(400).json({
        status: false,
        creator: "© Void",
        message: result.message || "[!] Gagal mengunduh MP3 dari YouTube."
      });
    }
    res.status(200).json({
      status: true,
      creator: "© Void",
      message: "Berhasil mengambil data MP3.",
      result: result.result
    });
  } catch (err) {
    console.error("Error fetching YouTube MP3:", err.message);
    res.status(500).json({
      status: false,
      creator: "© Void",
      message: "[!] Terjadi kesalahan, coba lagi nanti.",
      error: err.message
    });
  }
});

router.get('/dl/ytmp4', async (req, res) => {
  const { url, resolution } = req.query;
  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL is required",
    });
  }
  try {
    const result = await YoutubeVideo(url, resolution);
    if (!result.status) {
      return res.status(400).json(result);
    }
    res.status(200).json({
      status: true,
      message: "Success",
      result: result.result,
    });
  } catch (error) {
    console.error("Error processing ytmp4:", error.message);
    res.status(500).json({
      status: false,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
});

// ------ Maker ------- //

// ------ Gallery ------- //
router.get('/gallery/indo', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/111void/scraper-data/refs/heads/master/cecan/indo.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/indo2', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/111void/scraper-data/refs/heads/master/cecan/indo2.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/china', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/111void/scraper-data/refs/heads/master/cecan/cina.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/cosplay', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/111void/scraper-data/refs/heads/master/cosplay/cosplay.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

router.get('/gallery/lumba', async (req, res, next) => {
	let femdom = (await axios.get('https://raw.githubusercontent.com/VarrelKun/data/refs/heads/main/gurl/lumba.json')).data;
	let random = femdom[Math.floor(Math.random() * femdom.length)]
	var result = await getBuffer(random)
	res.set({'Content-Type': 'image/jpeg'})
	res.send(result)
})

module.exports = router;