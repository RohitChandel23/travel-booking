import{l as d,t as b,D as p,m as f,x as v}from"./index-6217cddb.js";import{n as u,c as g,o as h}from"./if-defined-1a194203.js";const m=d`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var n=globalThis&&globalThis.__decorate||function(s,t,r,i){var l=arguments.length,o=l<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,r):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(s,t,r,i);else for(var c=s.length-1;c>=0;c--)(a=s[c])&&(o=(l<3?a(o):l>3?a(t,r,o):a(t,r))||o);return l>3&&o&&Object.defineProperty(t,r,o),o};let e=class extends f{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return v`
      <button ?disabled=${this.disabled} tabindex=${h(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};e.styles=[b,p,m];n([u()],e.prototype,"tabIdx",void 0);n([u({type:Boolean})],e.prototype,"disabled",void 0);n([u()],e.prototype,"color",void 0);e=n([g("wui-link")],e);
