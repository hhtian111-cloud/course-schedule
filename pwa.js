const install=document.getElementById('install-app');const help=document.getElementById('install-help');let promptEvent=null;
function standalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
function update(){if(standalone()){install.hidden=true;help.textContent='已在 App 中打开 · 首次联网打开后可离线查看'}else{install.hidden=false;help.textContent=location.protocol==='file:'?'安装需要在线地址；直接打开本地文件只能查看课表。':'可添加到主屏幕 · 首次联网打开后可离线查看'}}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;install.textContent='安装课表 App'});
install.addEventListener('click',async()=>{if(promptEvent){await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null}else{document.getElementById('install-guide').showModal()}});
window.addEventListener('appinstalled',update);document.getElementById('close-guide').onclick=()=>document.getElementById('install-guide').close();
if('serviceWorker' in navigator&&window.isSecureContext&&location.protocol!=='file:'){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{help.textContent='离线功能暂未启用，请联网刷新后重试。'}))}update();
