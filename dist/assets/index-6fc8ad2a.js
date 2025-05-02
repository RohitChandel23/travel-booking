import{V as T,X as _,Y as O,l as h,t as y,m as d,x as c,O as a,D as R}from"./index-6217cddb.js";import{n as v,c as p,o as j,r as P}from"./if-defined-1a194203.js";import{e as U,n as L}from"./index-a3bd8de6.js";const u=T({isLegalCheckboxChecked:!1}),w={state:u,subscribe(i){return _(u,()=>i(u))},subscribeKey(i,e){return O(u,i,e)},setIsLegalCheckboxChecked(i){u.isLegalCheckboxChecked=i}},E=h`
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    column-gap: var(--wui-spacing-1xs);
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  label > span {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
    min-width: var(--wui-spacing-xl);
    min-height: var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-3xs);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-010);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  label > span:hover,
  label > input[type='checkbox']:focus-visible + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  label input[type='checkbox']:checked + span {
    background-color: var(--wui-color-blue-base-90);
  }

  label > span > wui-icon {
    opacity: 0;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span wui-icon {
    opacity: 1;
  }
`;var k=globalThis&&globalThis.__decorate||function(i,e,r,o){var n=arguments.length,t=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,e,r,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(t=(n<3?s(t):n>3?s(e,r,t):s(e,r))||t);return n>3&&t&&Object.defineProperty(e,r,t),t};let f=class extends d{constructor(){super(...arguments),this.inputElementRef=U(),this.checked=void 0}render(){return c`
      <label>
        <input
          ${L(this.inputElementRef)}
          ?checked=${j(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("checkboxChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};f.styles=[y,E];k([v({type:Boolean})],f.prototype,"checked",void 0);f=k([p("wui-checkbox")],f);const W=h`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: var(--wui-spacing-s);
  }
  a {
    text-decoration: none;
    color: var(--wui-color-fg-150);
    font-weight: 500;
  }
`;var C=globalThis&&globalThis.__decorate||function(i,e,r,o){var n=arguments.length,t=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,e,r,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(t=(n<3?s(t):n>3?s(e,r,t):s(e,r))||t);return n>3&&t&&Object.defineProperty(e,r,t),t};let b=class extends d{constructor(){super(),this.unsubscribe=[],this.checked=w.state.isLegalCheckboxChecked,this.unsubscribe.push(w.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){var n;const{termsConditionsUrl:e,privacyPolicyUrl:r}=a.state,o=(n=a.state.features)==null?void 0:n.legalCheckbox;return!e&&!r||!o?null:c`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:r}=a.state;return e&&r?"and":""}termsTemplate(){const{termsConditionsUrl:e}=a.state;return e?c`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=a.state;return e?c`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>`:null}onCheckboxChange(){w.setIsLegalCheckboxChecked(!this.checked)}};b.styles=[W];C([P()],b.prototype,"checked",void 0);b=C([p("w3m-legal-checkbox")],b);const B=h`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`;var z=globalThis&&globalThis.__decorate||function(i,e,r,o){var n=arguments.length,t=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,e,r,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(t=(n<3?s(t):n>3?s(e,r,t):s(e,r))||t);return n>3&&t&&Object.defineProperty(e,r,t),t};let x=class extends d{render(){return c`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0","0","l","0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `}};x.styles=[y,R,B];x=z([p("wui-ux-by-reown")],x);const D=h`
  :host > wui-flex {
    background-color: var(--wui-color-gray-glass-005);
    margin-top: var(--wui-spacing-s);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`;var S=globalThis&&globalThis.__decorate||function(i,e,r,o){var n=arguments.length,t=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,e,r,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(t=(n<3?s(t):n>3?s(e,r,t):s(e,r))||t);return n>3&&t&&Object.defineProperty(e,r,t),t};let m=class extends d{render(){var n;const{termsConditionsUrl:e,privacyPolicyUrl:r}=a.state,o=(n=a.state.features)==null?void 0:n.legalCheckbox;return!e&&!r||o?null:c`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
          <wui-text color="fg-250" variant="small-400" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        <wui-ux-by-reown></wui-ux-by-reown>
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:r}=a.state;return e&&r?"and":""}termsTemplate(){const{termsConditionsUrl:e}=a.state;return e?c`<a href=${e}>Terms of Service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=a.state;return e?c`<a href=${e}>Privacy Policy</a>`:null}};m.styles=[D];m=S([p("w3m-legal-footer")],m);const I=h`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var $=globalThis&&globalThis.__decorate||function(i,e,r,o){var n=arguments.length,t=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,e,r,o);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(t=(n<3?s(t):n>3?s(e,r,t):s(e,r))||t);return n>3&&t&&Object.defineProperty(e,r,t),t};let g=class extends d{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,o=36-e,n=116+o,t=245+o,s=360+o*1.75;return c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${n} ${t}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};g.styles=[y,I];$([v({type:Number})],g.prototype,"radius",void 0);g=$([p("wui-loading-thumbnail")],g);export{w as O};
