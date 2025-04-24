import{l as a,m,x as f}from"./index-7d485662.js";import{c as p}from"./if-defined-265b4cad.js";import"./index-b7cd39ce.js";import"./index-ef9f65a8.js";import"./index-e6af6ae5.js";import"./index-a84f3d39.js";import"./index-3fbc86dd.js";import"./index-10422778.js";const w=a`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var u=globalThis&&globalThis.__decorate||function(o,i,e,r){var l=arguments.length,t=l<3?i:r===null?r=Object.getOwnPropertyDescriptor(i,e):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,i,e,r);else for(var s=o.length-1;s>=0;s--)(n=o[s])&&(t=(l<3?n(t):l>3?n(i,e,t):n(i,e))||t);return l>3&&t&&Object.defineProperty(i,e,t),t};let c=class extends m{render(){return f`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};c.styles=w;c=u([p("w3m-transactions-view")],c);export{c as W3mTransactionsView};
