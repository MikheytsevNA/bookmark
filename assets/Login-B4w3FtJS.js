import{d as n,e as m,j as e,F as d,l as c,R as p,f as u,i as o,g as x,k as h}from"./index-4-IW4Ev2.js";function g(){const s=n(),t=m();return e.jsx("div",{children:e.jsx(d,{initialValues:{email:"",password:""},onSubmit:async(r,{setSubmitting:a})=>{t(c(r.email)),a(!1),s("/")},validate:r=>{var l;const a={};return(l=p.getRegisteredUsers())!=null&&l.find(i=>i.email===r.email&&i.password===r.password)||(a.email="Неправильный(ые) логин и/или пароль"),a},validateOnBlur:!1,validateOnChange:!1,children:({isSubmitting:r,errors:a})=>e.jsxs(u,{children:[e.jsxs("div",{className:"form-group m-1 p-1",children:[e.jsx("label",{htmlFor:"exampleFormControlEmail",children:"Email address"}),e.jsx(o,{type:"email",name:"email",id:"exampleFormControlEmail",className:"form-control",required:!0})]}),e.jsxs("div",{className:"form-group m-1 p1",children:[e.jsx("label",{htmlFor:"exampleFormControlPassword",children:"Password"}),e.jsx(o,{type:"password",name:"password",id:"exampleFormControlPassword",className:"form-control",required:!0})]}),a.email&&e.jsx("div",{className:"alert alert-danger m-1",role:"alert",children:a.email}),e.jsx("button",{type:"submit",disabled:r,className:"btn btn-primary m-3",children:"Sign on"})]})})})}async function j(){try{if(x()!==null)throw Error("Доступно после выхода")}catch{return h("/")}return 0}export{g as Component,j as loader};