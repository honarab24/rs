const express = require('express');
const request = require('request');
const cors = require('cors');
const { URL } = require('url');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// ✅ Stream channel map (key: m3u8 URL)
const streams = {
  hbofamily: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbofamily',
  hbohd: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbo',
  hbosignature: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbosignature',
  hbohits: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbohitshd',
  cinemax: 'https://smart.pendy.dpdns.org/Smart.php?id=Cinemax',
  animax: 'https://smart.pendy.dpdns.org/Smart.php?id=Animax',
  moviesnowhd: 'https://smart.pendy.dpdns.org/Smart.php?id=moviesnow_raj',
  starmovieshd: 'https://smart.pendy.dpdns.org/Smart.php?id=starmovies_raj',
  hits: 'https://smart.pendy.dpdns.org/Smart.php?id=Hits',
  warnertv: 'https://smart.pendy.dpdns.org/Smart.php?id=WarnerTV',
  scm: 'https://smart.pendy.dpdns.org/Smart.php?id=Weishimovie',
  dreamworks: 'https://smart.pendy.dpdns.org/Smart.php?id=Dreamworks',
  thrill: 'https://smart.pendy.dpdns.org/Smart.php?id=Thrill',
  hitsmovies: 'https://smart.pendy.dpdns.org/Smart.php?id=Hitsmovie',
  one: 'https://smart.pendy.dpdns.org/Smart.php?id=One',
  tvnmovies: 'https://smart.pendy.dpdns.org/Smart.php?id=Tvnmovie',
  celestialclassic: 'https://smart.pendy.dpdns.org/Smart.php?id=Celestial2',
  celestialmovieshd: 'https://smart.pendy.dpdns.org/Smart.php?id=Celestialindo',
  axnhd: 'https://smart.pendy.dpdns.org/Smart.php?id=Axn',
  paramountnetwork: 'https://smart.pendy.dpdns.org/Smart.php?id=Paramountnetwork',
  kplus: 'https://smart.pendy.dpdns.org/Smart.php?id=Kplus',
  rockactions: 'https://smart.pendy.dpdns.org/Smart.php?id=Rockaction',
  rockentertainment: 'https://smart.pendy.dpdns.org/Smart.php?id=Rockentertain',
  natgeohd_twn: 'https://smart.pendy.dpdns.org/Smart.php?id=natgeohd_twn',
  natgeohd: 'https://smart.pendy.dpdns.org/Smart.php?id=Natgeo',
  natgeowild_twn: 'https://smart.pendy.dpdns.org/Smart.php?id=natgeowild_twn',
  natgeowild: 'https://smart.pendy.dpdns.org/Smart.php?id=Natgeowild',
  animalplanet_twn: 'https://smart.pendy.dpdns.org/Smart.php?id=animalplanet_twn',
  animalplanet: 'https://smart.pendy.dpdns.org/Smart.php?id=AnimalPlanet',
  discoveryasia: 'https://smart.pendy.dpdns.org/Smart.php?id=discoverytwn_twn',
  ci: 'https://smart.pendy.dpdns.org/Smart.php?id=ci_twn',
  discoveryhd: 'https://smart.pendy.dpdns.org/Smart.php?id=discoveryhd_twn',
  fashiontv: 'https://smart.pendy.dpdns.org/Smart.php?id=fashiontv_twn',
  history: 'https://smart.pendy.dpdns.org/Smart.php?id=History',
  bbcearthhd: 'https://smart.pendy.dpdns.org/Smart.php?id=bbcearth_twn',
  bbclifestyle: 'https://smart.pendy.dpdns.org/Smart.php?id=bbclifestyle_twn',
  tlc: 'https://smart.pendy.dpdns.org/Smart.php?id=Tlc',
  foodnetworkhd: 'https://smart.pendy.dpdns.org/Smart.php?id=Foodnetwork',
  hgtv: 'https://smart.pendy.dpdns.org/Smart.php?id=HGTV',

  set_hd: 'https://tataplay.slivcdn.com/hls/live/2011671/SETHD/master_2000.m3u8',
  sony_sab_hd: 'https://tataplay.slivcdn.com/hls/live/2011749/SABHD/master_2000.m3u8',
  sony_marathii: 'https://tataplay.slivcdn.com/hls/live/2011740/SonyMarathi/master_2000.m3u8',
  sony_pal: 'https://tataplay.slivcdn.com/hls/live/2011741/SonyPalSD/master_2000.m3u8',
  sony_aath: 'https://tataplay.slivcdn.com/hls/live/2011641/SonyAathSD/master_2000.m3u8',
  sony_yay: 'https://tataplay.slivcdn.com/hls/live/2011746/SonyYaySD/master_2000.m3u8',
  sony_max_hd: 'https://tataplay.slivcdn.com/hls/live/2011670/SonyMaxhd/master_2000.m3u8',
  sony_max: 'https://tataplay.slivcdn.com/hls/live/2011745/SonyMaxSD/master_2000.m3u8',
  sony_max2: 'https://tataplay.slivcdn.com/hls/live/2011908/MAX2/master_2000.m3u8',
  sony_wah: 'https://tataplay.slivcdn.com/hls/live/2011906/SonyWah/master_2000.m3u8',
  sony_pix_hd: 'https://tataplay.slivcdn.com/hls/live/2011748/PIXHD/master_2000.m3u8',
  sony_bbc_earth_hd: 'https://tataplay.slivcdn.com/hls/live/2011907/SonyBBCEarthHD/master_2000.m3u8',
  sony_sports_ten_1_hd: 'https://tataplay.slivcdn.com/hls/live/2011747/TEN1HD/master_2000.m3u8',
  sony_sports_ten_2_hd: 'https://tataplay.slivcdn.com/hls/live/2020434/TEN2HD/master_2000.m3u8',
  sony_sports_ten_3_hd: 'https://tataplay.slivcdn.com/hls/live/2020591/TEN3HD/master_2000.m3u8',
  sony_sports_ten_4_hd: 'https://tataplay.slivcdn.com/hls/live/2020589/ten4hd/master_2000.m3u8',
  sony_sports_ten_5_hd: 'https://tataplay.slivcdn.com/hls/live/2020593/SONYSIXHD/master_2000.m3u8',

  // Add your long dice-hosted streams below
  // (already included in your original post, no change needed)
  tap_sports: 'https://dice-live-ap.akamaized.net/...' // shortened here for clarity
};

// 📺 Stream route: /CHANNEL_NAME/playlist.m3u8
app.get('/:stream/playlist.m3u8', (req, res) => {
  const key = req.params.stream;
  const streamUrl = streams[key];

  if (!streamUrl) return res.status(404).send('❌ Invalid stream key');

  const baseUrl = new URL(streamUrl);
  const basePath = baseUrl.href.substring(0, baseUrl.href.lastIndexOf('/') + 1);

  request.get(streamUrl, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(502).send('❌ Failed to fetch playlist');
    }

    const modified = body.replace(/^(?!#)(.+)$/gm, (line) => {
      line = line.trim();
      if (!line || line.startsWith('#')) return line;
      const fullUrl = new URL(line, basePath).href;
      return `/segment.ts?url=${encodeURIComponent(fullUrl)}`;
    });

    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(modified);
  });
});

// 🎬 Proxy segment.ts
app.get('/segment.ts', (req, res) => {
  const segmentUrl = req.query.url;
  if (!segmentUrl) return res.status(400).send('❌ No segment URL');

  request
    .get(segmentUrl)
    .on('response', (r) => res.set(r.headers))
    .on('error', () => res.status(502).send('❌ Segment failed'))
    .pipe(res);
});

// 📃 List all available stream keys
app.get('/streams', (req, res) => {
  res.json(Object.keys(streams));
});

// 🌐 Root
app.get('/', (req, res) => {
  res.send('');
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

// Optional variants (for future resolution support)
const variants = [
  { bw: 400000, res: '640x360', path: 'exchange274551lrmlx_274551_800' },
  { bw: 1400000, res: '854x480', path: 'exchange274551lrmlx_274551_1400' },
  { bw: 2400000, res: '1280x720', path: 'exchange274551lrmlx_274551_3000' },
  { bw: 4500000, res: '1920x1080', path: 'exchange274551lrmlx_274551_4500' },
];
