import{A as p,y as w,z as T,o as f,p as v,B as m,v as c,J as _,l as y,t as b,m as x,x as d,D as $}from"./index-7d485662.js";import{n as u,c as C,o as E}from"./if-defined-265b4cad.js";function j(){try{return c.returnOpenHref("","popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}async function O(){f.push("ConnectingFarcaster");const e=v.getAuthConnector();if(e&&!p.state.farcasterUrl)try{const{url:o}=await e.provider.getFarcasterUri();p.setFarcasterUrl(o,w.state.activeChain)}catch(o){f.goBack(),m.showError(o)}}async function R(e){f.push("ConnectingSocial");const o=v.getAuthConnector();let t=null;try{const i=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(o&&e){if(c.isTelegram()||(t=j()),t)p.setSocialWindow(t,w.state.activeChain);else if(!c.isTelegram())throw new Error("Could not create social popup");const{uri:a}=await o.provider.getSocialRedirectUri({provider:e});if(!a)throw t==null||t.close(),new Error("Could not fetch the social redirect uri");if(t&&(t.location.href=a),c.isTelegram()){_.setTelegramSocialProvider(e);const r=c.formatTelegramSocialLoginUrl(a);c.openHref(r,"_top")}clearTimeout(i)}}catch(i){t==null||t.close(),m.showError(i==null?void 0:i.message)}}async function D(e){p.setSocialProvider(e,w.state.activeChain),T.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),e==="farcaster"?await O():await R(e)}const L=y`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var S=globalThis&&globalThis.__decorate||function(e,o,t,i){var a=arguments.length,r=a<3?o:i===null?i=Object.getOwnPropertyDescriptor(o,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,o,t,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(o,t,r):n(o,t))||r);return a>3&&r&&Object.defineProperty(o,t,r),r};let h=class extends x{constructor(){super(...arguments),this.logo="google"}render(){return d`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};h.styles=[b,L];S([u()],h.prototype,"logo",void 0);h=S([C("wui-logo")],h);const U=y`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var g=globalThis&&globalThis.__decorate||function(e,o,t,i){var a=arguments.length,r=a<3?o:i===null?i=Object.getOwnPropertyDescriptor(o,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,o,t,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(a<3?n(r):a>3?n(o,t,r):n(o,t))||r);return a>3&&r&&Object.defineProperty(o,t,r),r};let l=class extends x{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return d`
      <button ?disabled=${this.disabled} tabindex=${E(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return this.align==="center"?d` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};l.styles=[b,$,U];g([u()],l.prototype,"logo",void 0);g([u()],l.prototype,"name",void 0);g([u()],l.prototype,"align",void 0);g([u()],l.prototype,"tabIdx",void 0);g([u({type:Boolean})],l.prototype,"disabled",void 0);l=g([C("wui-list-social")],l);export{D as e};
