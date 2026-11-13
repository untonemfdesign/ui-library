import icon0 from './icon-0.svg';
import icon1 from './icon-1.svg';
import icon2 from './icon-2.svg';
import icon3 from './icon-3.svg';
import icon4 from './icon-4.svg';
const cardIcons = [icon0, icon1, icon2, icon3, icon4];
import React, {useState, useRef, useEffect} from 'react';
const initial={hover:1.012,press:.985,enter:180,down:90,release:220,gap:8,easing:'cubic-bezier(0.2, 0, 0, 1)'};
const data=[['3 дня','Гарантия связи','Оставайтесь на связи при отрицательном балансе'],['12 месяцев','Заморозка цены','Гарантия сохранения цены'],['','Живой консультант','Без очередей и ботов'],['','Перенос остатков мин и ГБ','Перенесем на следующий месяц'],['','Безлимитные звонки на МегаФон','Не платите за связь во внутренней сети']];
function cssFor(s){return `/* Hover: +${((s.hover-1)*100).toFixed(1)}%; press: −${((1-s.press)*100).toFixed(1)}%. */
.card {
  --hover: ${s.hover};
  --press: ${s.press};
  transform: scale(1);
  transform-origin: center;
  transition: transform ${s.release}ms ${s.easing};
  touch-action: pan-y;
  position: relative;
}
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: scale(var(--hover));
    transition-duration: ${s.enter}ms;
    z-index: 1;
  }
}
.card[data-pressed="true"] {
  transform: scale(var(--press));
  transition-duration: ${s.down}ms;
}
.card:focus-visible { outline: 2px solid #731982; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .card, .card:hover, .card[data-pressed="true"] {
    transform: none;
    transition: none;
  }
}
/* data-pressed: pointerdown → true; pointerup / pointercancel /
   pointerleave / blur → false. Cancel press when scrolling (>8px).
   Space / Enter keydown → true; keyup → false.
   Use native <button type="button"> for keyboard activation.
   Keep the layout wrapper untransformed; animate the inner card. */`;}
export function App(){
 const [s,setS]=useState(initial),[mode,setMode]=useState('desktop'),[tab,setTab]=useState('preview'),[pressed,setPressed]=useState(null),[demo,setDemo]=useState(''),[notice,setNotice]=useState(''),[reduced,setReduced]=useState(false);const start=useRef(null);const timer=useRef(null);
 useEffect(()=>{const clear=()=>{setPressed(null);start.current=null};window.addEventListener('blur',clear);window.addEventListener('pointerup',clear);return()=>{window.removeEventListener('blur',clear);window.removeEventListener('pointerup',clear);clearTimeout(timer.current)}},[]);
 const set=(k,v)=>setS(x=>({...x,[k]:v}));
 function play(){clearTimeout(timer.current);setDemo(mode==='desktop'?'hover':'press');timer.current=setTimeout(()=>{setDemo('press');timer.current=setTimeout(()=>setDemo(''),450)},650)}
 function download(){const url=URL.createObjectURL(new Blob([cssFor(s)],{type:'text/css'}));const a=document.createElement('a');a.href=url;a.download='megafon-card-motion.css';a.click();URL.revokeObjectURL(url)}
 const vars={'--hover':s.hover,'--press':s.press,'--enter':s.enter+'ms','--down':s.down+'ms','--release':s.release+'ms','--ease':s.easing,'--gap':s.gap+'px'};
 function card(d,i){return <div className={'card-slot slot-'+i} key={i}><button type="button" className={'card '+(pressed===i?'pressed ':'')+(i===0&&demo?`demo-${demo}`:'')} data-pressed={pressed===i} onKeyDown={e=>{if(e.key===' '||e.key==='Enter')setPressed(i)}} onKeyUp={()=>setPressed(null)} onPointerDown={e=>{if(e.button!==0)return;start.current={x:e.clientX,y:e.clientY};setPressed(i)}} onPointerMove={e=>{if(start.current&&Math.hypot(e.clientX-start.current.x,e.clientY-start.current.y)>8)setPressed(null)}} onPointerUp={()=>{setPressed(null);start.current=null}} onPointerCancel={()=>setPressed(null)} onPointerLeave={()=>setPressed(null)} onBlur={()=>setPressed(current=>current===i?null:current)} onClick={()=>setNotice(`«${d[1]}»: нажатие зарегистрировано`)}>
 {d[0]&&<span className="badge">{d[0]}</span>}<span className="card-title">{d[1]}</span><span className="card-description">{d[2]}</span>{mode==='desktop'&&<span className="card-icon" aria-hidden="true"><img src={cardIcons[i]} alt=""/></span>}</button></div>}
 return <div className="app"><header className="topbar"><div className="brand">ui library</div><span className="tag">Прототип · v1.0</span></header><div className="library-layout"><nav className="component-nav" aria-label="Компоненты"><h2>Компоненты</h2><a href="#benefit-cards" aria-current="page">Карточки преимуществ</a><p>1 компонент</p></nav><main id="benefit-cards"><div className="intro"><div><div className="eyebrow">КОМПОНЕНТЫ / ОБЗОР</div><h1>Карточки преимуществ</h1><p>Наведите курсор или нажмите на карточку.<br/>Настройте ощущение — и заберите CSS в разработку.</p></div><div className="intro-note"><span className="dot"/> Без сдвига сетки<small>Анимируется только transform.<br/>Соседние карточки остаются на месте.</small></div></div>
 <div className="workspace"><section className="preview-panel"><div className="preview-toolbar"><div className="segmented">{['desktop','mobile'].map(m=><button key={m} className={mode===m?'selected':''} onClick={()=>{setMode(m);setDemo('');setPressed(null)}}>{m==='desktop'?'Десктоп':'Мобилка'}</button>)}</div><div className="view-tabs"><button className={tab==='preview'?'active':''} onClick={()=>setTab('preview')}>Превью</button><button className={tab==='code'?'active':''} onClick={()=>setTab('code')}>CSS</button></div></div>
 {tab==='preview'?<div className={'stage '+mode+(reduced?' reduce':'')} style={vars}><div className="canvas-caption"><span>{mode==='desktop'?'HOVER + PRESS':'TOUCH / PRESS'}</span><span>{mode==='desktop'?'Сетка преимуществ':'360 px · область контента'}</span></div><div className="preview-content"><div className="section-heading">{mode==='desktop'?'Преимущества':'Комфорт для тебя'}</div>{mode==='mobile'&&<p className="mobile-subtitle">Для диджитал нейтив</p>}<div className="cards">{data.slice(0,mode==='mobile'?4:5).map(card)}</div>{mode==='mobile'&&<div className="family"><span className="badge">до 2 участников</span><strong>Общие ГБ, минуты и СМС — для близких</strong><p>Подключите тариф с МегаСемьёй и делитесь им с близкими</p><button onClick={()=>setNotice('Кнопка тарифа: демонстрация без перехода')}>Посмотреть тариф</button></div>}</div><div className="stage-footer"><span>{demo?`Демонстрация: ${demo}`:pressed!==null?'Состояние: press':'Готово к взаимодействию'}</span><button onClick={play}>Проиграть эффект</button></div></div>:<div className="code-view"><div className="code-header">megafon-card-motion.css<button onClick={async()=>{try{await navigator.clipboard.writeText(cssFor(s));setNotice('CSS скопирован')}catch{setNotice('Буфер обмена недоступен. Используйте «Скачать CSS».')}}}>Копировать</button></div><pre>{cssFor(s)}</pre></div>}
 <div className="preview-bottom" role="status">{notice||'Карточки — интерактивная демонстрация. Переходы по услугам не подключены.'}</div></section>
 <aside><div className="aside-head"><h2>Параметры</h2><button className="reset" onClick={()=>{setS(initial);setReduced(false);setNotice('Параметры сброшены')}}>Сбросить</button></div><p className="aside-sub">Изменения сразу видны в превью</p><div className="presets">{[['Деликатно',1.008,.99],['Базовый',1.012,.985],['Выразительно',1.02,.975]].map(([name,h,p])=><button key={name} className={s.hover===h&&s.press===p?'chosen':''} onClick={()=>setS({...initial,hover:h,press:p})}>{name}</button>)}</div>
 <div className="control-section"><h3>Масштаб</h3>{[['hover','Наведение',1,1.03,.001,'×'],['press','Нажатие',.96,1,.001,'×']].map(([k,l,min,max,step,u])=><label className="control" key={k}><span>{l}<output>{s[k].toFixed(3)}{u}</output></span><input aria-label={l} type="range" min={min} max={max} step={step} value={s[k]} onChange={e=>set(k,+e.target.value)}/><small>{k==='hover'?'Только мышь и точный указатель':'Мышь, касание и клавиатура'}</small></label>)}</div>
 <div className="control-section"><h3>Время</h3>{[['enter','Наведение'],['down','Сжатие'],['release','Возврат']].map(([k,l])=><label className="control compact" key={k}><span>{l}<output>{s[k]} мс</output></span><input aria-label={l+' — время'} type="range" min="40" max="500" step="10" value={s[k]} onChange={e=>set(k,+e.target.value)}/></label>)}<label className="select-label">Кривая движения<select value={s.easing} onChange={e=>set('easing',e.target.value)}><option value="cubic-bezier(0.2, 0, 0, 1)">Мягкое торможение</option><option value="ease-in-out">Плавно в обе стороны</option><option value="linear">Линейная</option></select></label></div>
 <div className="control-section"><label className="control"><span>Расстояние между карточками<output>{s.gap} px</output></span><input aria-label="Расстояние" type="range" min="4" max="24" step="1" value={s.gap} onChange={e=>set('gap',+e.target.value)}/></label><label className="check"><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/> Проверить без анимации</label><small className="muted">Системный reduced motion учитывается всегда.</small></div><button className="download" onClick={download}>Скачать CSS</button></aside></div>
 <div className="notes"><article><span>01 / ГЕОМЕТРИЯ</span><h3>Место для движения</h3><p>При ширине 306 px масштаб {s.hover.toFixed(3)} добавит {((s.hover-1)*306/2).toFixed(2)} px с каждой стороны. При зазоре {s.gap} px остаётся {(s.gap-(s.hover-1)*306/2).toFixed(2)} px до соседней карточки.</p></article><article><span>02 / ПОВЕДЕНИЕ</span><h3>Нажатие важнее hover</h3><p>На десктопе: увеличение → сжатие → hover. На мобильном: сжатие → исходный размер. Прокрутка и отмена касания снимают press.</p></article><article><span>03 / ДЛЯ РАЗРАБОТКИ</span><h3>Настраиваемый эксперимент</h3><p>Цвета бренда — из Atoms. Шрифт Arial, радиусы и вторичные цвета приблизительны по скриншотам. Для точного совпадения понадобятся Figma и файл MegaFon Graphik LC.</p></article></div><footer>ui library <span>Локальный прототип · не изменение дизайн-системы</span></footer></main></div></div>
}
