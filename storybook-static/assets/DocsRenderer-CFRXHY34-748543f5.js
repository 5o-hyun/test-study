import{_ as p}from"./iframe-b95d0a21.js";import{R as e,r as c}from"./index-8365acb2.js";import{ae as l,af as h,ag as u,ah as E}from"./index-32b837f1.js";import{renderElement as d,unmountElement as x}from"./react-18-7e99bf28.js";import"../sb-preview/runtime.js";import"./jsx-runtime-c64c8078.js";import"./index-a0963841.js";import"./index-0cfd3311.js";import"./index-356e4a49.js";var _={code:l,a:h,...u},f=class extends c.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(t){let{showException:r}=this.props;r(t)}render(){let{hasError:t}=this.state,{children:r}=this.props;return t?null:e.createElement(e.Fragment,null,r)}},F=class{constructor(){this.render=async(t,r,o)=>{let n={..._,...r==null?void 0:r.components},s=E;return new Promise((a,m)=>{p(()=>import("./index-88fde880.js"),["./index-88fde880.js","./index-2603eae8.js","./index-8365acb2.js"],import.meta.url).then(({MDXProvider:i})=>d(e.createElement(f,{showException:m,key:Math.random()},e.createElement(i,{components:n},e.createElement(s,{context:t,docsParameter:r}))),o)).then(()=>a())})},this.unmount=t=>{x(t)}}};export{F as DocsRenderer,_ as defaultComponents};
