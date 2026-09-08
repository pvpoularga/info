const { chromium } = require('C:/Users/danim/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const http = require('http');
const path = require('path');
(async () => {
 const server = http.createServer((req,res) => { let file=path.join(process.cwd(), decodeURIComponent(req.url.split('?')[0])); if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html'); try {res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.png')?'image/png':'text/html'); res.end(fs.readFileSync(file));}catch {res.statusCode=404;res.end();}}).listen(0,'127.0.0.1');
 await new Promise(r=>server.once('listening',r));
 let browser;
 try {
 browser=await chromium.launch({headless:true, executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const page=await browser.newPage();
 await page.route('**/*', route => route.request().url().startsWith('http://127.0.0.1')?route.continue():route.abort());
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const root='http://127.0.0.1:'+server.address().port;
 await page.goto(root+'/home/');
 await page.locator('.tiktok-embed').evaluate(el=>{ el.innerHTML='<iframe title="Test" style="width:320px;height:400px"></iframe>'; });
 for(const width of [1280,850,390]) {
  await page.setViewportSize({width,height:900});
  const sizes=await page.evaluate(()=>{const w=s=>document.querySelector(s).getBoundingClientRect().width;return {grid:w('.retro-latest-grid'),box:w('.retro-tiktok-preview'),embed:w('.tiktok-embed'),frame:w('.retro-tiktok-preview iframe')};});
  if(Math.abs(sizes.grid-sizes.box)>2 || Math.abs(sizes.embed-sizes.frame)>2 || Math.abs(sizes.box-sizes.embed)>3) throw Error(JSON.stringify(sizes));
  console.log('PASS width '+width+': '+JSON.stringify(sizes));
 }
 } finally {if(browser) await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});