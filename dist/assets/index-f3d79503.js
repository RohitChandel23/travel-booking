import{l as d,t as m,m as v,x as c}from"./index-6217cddb.js";import{n as u,c as f,o as b}from"./if-defined-1a194203.js";import"./index-db713312.js";const h=d`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var a=globalThis&&globalThis.__decorate||function(o,i,r,l){var s=arguments.length,e=s<3?i:l===null?l=Object.getOwnPropertyDescriptor(i,r):l,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(o,i,r,l);else for(var p=o.length-1;p>=0;p--)(n=o[p])&&(e=(s<3?n(e):s>3?n(i,r,e):n(i,r))||e);return s>3&&e&&Object.defineProperty(i,r,e),e};let t=class extends v{constructor(){super(...arguments),this.disabled=!1}render(){return c`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${b(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?c`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};t.styles=[m,h];a([u()],t.prototype,"errorMessage",void 0);a([u({type:Boolean})],t.prototype,"disabled",void 0);a([u()],t.prototype,"value",void 0);a([u()],t.prototype,"tabIdx",void 0);t=a([f("wui-email-input")],t);
