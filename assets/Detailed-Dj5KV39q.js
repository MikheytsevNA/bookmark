import{u,a as x,g,r as c,c as j,b as f,j as s,h as v,R as p}from"./index-C_iAeZJF.js";function S(){const t=u().id,{data:e,isFetching:d,isSuccess:l}=x(t),a=g(),[o,h]=c.useState(j(t)),n=f(o,200);c.useEffect(()=>{(m=>{a&&p.changeFavorites(a,m)})(t)},[t,a,n]);let i;return d?i=s.jsx("div",{children:"Loading..."}):l&&(i=s.jsx(s.Fragment,{children:e?s.jsxs("div",{className:"detailed-card",children:[s.jsx("img",{src:e.images.big,alt:e.title}),s.jsx("img",{src:v,className:`bookmark-heart-detailed ${n?"bg-info":""}`,onClick:()=>h(r=>!r)}),s.jsx("div",{className:"d-flex justify-content-center",children:s.jsxs("div",{children:[s.jsx("b",{children:e.author}),s.jsx("p",{children:e.title})]})}),s.jsx("div",{children:s.jsx("p",{children:e.description})})]}):s.jsx("div",{children:"Что-то пошло не так"})})),s.jsx(s.Fragment,{children:i})}export{S as Component};