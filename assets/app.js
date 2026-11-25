(function(){
  // 飘雪
  var hero=document.getElementById('hero');
  if(hero)for(var i=0;i<26;i++){
    var s=document.createElement('span');
    s.className='snow';
    s.style.left=(Math.random()*100)+'%';
    s.style.width=s.style.height=(2+Math.random()*4)+'px';
    s.style.setProperty('--dur',(8+Math.random()*12)+'s');
    s.style.setProperty('--delay',(-Math.random()*20)+'s');
    s.style.setProperty('--drift',(30+Math.random()*90)+'px');
    s.style.opacity=(0.35+Math.random()*0.5);
    hero.appendChild(s);
  }

  // 费用计算器
  var box=document.getElementById('costBox');
  var totalEl=document.getElementById('totalCost');
  function calc(){
    var sum=0;
    box.querySelectorAll('input[data-cost]:checked').forEach(function(i){sum+=Number(i.dataset.cost)});
    totalEl.textContent='¥'+sum;
  }
  box.addEventListener('change',calc);
  calc();

  // 装备清单 + 本地保存
  var list=document.getElementById('gearList');
  var boxes=Array.prototype.slice.call(list.querySelectorAll('input'));
  var prog=document.getElementById('gearProgress');
  var KEY='ski-gear-checklist-v2';
  var saved=[0,1,2,3];
  try{var raw=localStorage.getItem(KEY);if(raw!==null)saved=JSON.parse(raw)}catch(e){saved=[0,1,2,3]}
  function refresh(){
    var n=0;
    boxes.forEach(function(b,i){
      b.parentElement.classList.toggle('done',b.checked);
      if(b.checked)n++;
    });
    prog.textContent=n+' / '+boxes.length+' 已准备';
  }
  boxes.forEach(function(b,i){
    b.checked=saved.indexOf(i)>-1;
    b.addEventListener('change',function(){
      var state=[];
      boxes.forEach(function(x,j){if(x.checked)state.push(j)});
      try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}
      refresh();
    });
  });
  refresh();

  // 滚动渐入 + 导航高亮
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

  var links=Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var secs=Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var io2=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.toggle('active',l.dataset.target===e.target.id)});
      }
    });
  },{rootMargin:'-42% 0px -55% 0px'});
  secs.forEach(function(s){io2.observe(s)});

  // 按雪场快速查看：Tab 切换
  var skiTabs=Array.prototype.slice.call(document.querySelectorAll('.ski-tab'));
  var skiPanels=Array.prototype.slice.call(document.querySelectorAll('.ski-panel'));
  skiTabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      var key=tab.getAttribute('data-s');
      skiTabs.forEach(function(t){t.classList.toggle('on',t===tab)});
      skiPanels.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-s')===key)});
    });
  });
})();
