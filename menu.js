(function () {
  var style = document.createElement('style');
  style.textContent = [
    '#menu-btn{position:fixed;top:10px;left:10px;z-index:1000;background:#0FC;border:2px solid #0FC;border-radius:4px;width:36px;height:36px;font-size:20px;line-height:1;cursor:pointer;padding:0;}',
    '#menu-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:998;}',
    '#menu-overlay.menu-open{display:block;}',
    '#menu-panel{position:fixed;top:0;left:0;height:100%;width:220px;background:#fff;z-index:999;transform:translateX(-100%);transition:transform 0.25s ease;overflow-y:auto;box-shadow:2px 0 8px rgba(0,0,0,0.2);}',
    '#menu-panel.menu-open{transform:translateX(0);}',
    '#menu-close{position:absolute;top:8px;right:10px;background:none;border:none;font-size:20px;cursor:pointer;line-height:1;}',
    '#menu-panel a{display:block;padding:10px 16px;text-decoration:none;color:#222;font-size:15px;}',
    '#menu-panel a:hover{background:#0FC;}',
    '#menu-panel .menu-home{font-weight:bold;border-bottom:1px solid #ccc;margin-bottom:4px;}',
    '#menu-panel .menu-title{padding:14px 16px 6px;font-size:12px;color:#888;font-weight:bold;}'
  ].join('');
  document.head.appendChild(style);

  var regions = [
    ['counties','全縣市'],['keelung','基隆市'],['taipei','臺北市'],['newtaipei','新北市'],
    ['taoyuan','桃園市'],['hsinchucounty','新竹縣'],['hsinchucity','新竹市'],['miaoli','苗栗縣'],
    ['taichung','臺中市'],['changhua','彰化縣'],['nantou','南投縣'],['yunlin','雲林縣'],
    ['chiayicounty','嘉義縣'],['chiayicity','嘉義市'],['tainan','臺南市'],['kaohsiung','高雄市'],
    ['pingtung','屏東縣'],['yilan','宜蘭縣'],['hualien','花蓮縣'],['taitung','臺東縣'],
    ['penghu','澎湖縣'],['kinmen','金門縣'],['lienchiang','連江縣']
  ];

  var overlay = document.createElement('div');
  overlay.id = 'menu-overlay';
  document.body.appendChild(overlay);

  var panel = document.createElement('nav');
  panel.id = 'menu-panel';

  var closeBtn = document.createElement('button');
  closeBtn.id = 'menu-close';
  closeBtn.textContent = '✕';
  panel.appendChild(closeBtn);

  var homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.className = 'menu-home';
  homeLink.textContent = '← 回首頁';
  panel.appendChild(homeLink);

  var title = document.createElement('div');
  title.className = 'menu-title';
  title.textContent = '選擇地區';
  panel.appendChild(title);

  regions.forEach(function (r) {
    var a = document.createElement('a');
    a.href = r[0] + '.html';
    a.textContent = r[1];
    panel.appendChild(a);
  });

  document.body.appendChild(panel);

  var btn = document.createElement('button');
  btn.id = 'menu-btn';
  btn.textContent = '☰';
  document.body.appendChild(btn);

  function open() { panel.classList.add('menu-open'); overlay.classList.add('menu-open'); }
  function close() { panel.classList.remove('menu-open'); overlay.classList.remove('menu-open'); }

  btn.addEventListener('click', function (e) { e.stopPropagation(); open(); });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
})();
