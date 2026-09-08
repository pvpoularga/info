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
 await page.goto(root+'/rules/');
 await page.click('#language-toggle');
 if(await page.locator('html').getAttribute('lang')!=='en') throw Error('English toggle failed');
 if(!await page.getByText('Server Rules',{exact:true}).count()) throw Error('Rules untranslated');
 if(!await page.getByText('● Impersonating staff members is prohibited.',{exact:false}).count()) throw Error('Rule untranslated');
 await page.goto(root+'/FAQ/');
 if(!await page.getByText('Frequently Asked Questions',{exact:true}).count()) throw Error('Persistence failed');
 await page.click('#language-toggle');
 if(!await page.getByText('Perguntas Frequentes',{exact:true}).count()) throw Error('Portuguese restore failed');
 await page.goto(root+'/home/');
 await page.click('#language-toggle');
 if(!await page.getByText('COMMUNITY',{exact:true}).count()) throw Error('Home untranslated');
 await page.screenshot({path:'language-preview.png',fullPage:false});
 if(errors.length) throw Error(errors.join('\n'));
 console.log('PASS: PT/EN switching, Rules/Home/FAQ translation, persistence, Portuguese restoration; no script errors.');
 } finally {if(browser) await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
