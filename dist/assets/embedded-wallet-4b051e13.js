import{l as y,m as f,M as R,o as I,x as l,p as W,T as E,q as M,r as A,t as j,u as $,E as u,A as d,v as O,y as D,z as x,W as T,B as P}from"./index-6217cddb.js";import{r as h,c as g,n as w,o as k}from"./if-defined-1a194203.js";import{N as z}from"./index-9f641e3f.js";import{e as H,n as V}from"./index-a3bd8de6.js";import"./index-e24c3c8a.js";import"./index-db713312.js";import"./index-9aaca58d.js";import"./index-8bfa1e94.js";import"./index-cca4c4e8.js";import"./index-8982d0bf.js";const F=y`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var U=globalThis&&globalThis.__decorate||function(o,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,s);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};const S=600,N=360,G=64;let v=class extends f{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(R.subscribeKey("open",e=>{e||(this.onHideIframe(),I.popTransactionStack())}),R.subscribeKey("shake",e=>{e?this.iframe.style.animation="w3m-shake 500ms var(--wui-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){var e;this.onHideIframe(),this.unsubscribe.forEach(i=>i()),(e=this.bodyObserver)==null||e.unobserve(window.document.body)}async firstUpdated(){var i;await this.syncTheme(),this.iframe.style.display="block";const e=(i=this==null?void 0:this.renderRoot)==null?void 0:i.querySelector("div");this.bodyObserver=new ResizeObserver(s=>{var r,a;const n=(r=s==null?void 0:s[0])==null?void 0:r.contentBoxSize,t=(a=n==null?void 0:n[0])==null?void 0:a.inlineSize;this.iframe.style.height=`${S}px`,e.style.height=`${S}px`,t&&t<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset"):(this.iframe.style.width=`${N}px`,this.iframe.style.left=`calc(50% - ${N/2}px)`,this.iframe.style.top=`calc(50% - ${S/2}px + ${G/2}px)`,this.iframe.style.bottom="unset"),this.ready=!0,this.onShowIframe()}),this.bodyObserver.observe(window.document.body)}render(){return l`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const e=window.innerWidth<=430;this.iframe.style.animation=e?"w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)"}async syncTheme(){const e=W.getAuthConnector();if(e){const i=E.getSnapshot().themeMode,s=E.getSnapshot().themeVariables;await e.provider.syncTheme({themeVariables:s,w3mThemeVariables:M(s,i)})}}};v.styles=F;U([h()],v.prototype,"ready",void 0);v=U([g("w3m-approve-transaction-view")],v);var Y=globalThis&&globalThis.__decorate||function(o,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,s);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let _=class extends f{render(){return l`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${A.SECURE_SITE_DASHBOARD}
          imageSrc=${A.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};_=Y([g("w3m-upgrade-wallet-view")],_);const B=y`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;var b=globalThis&&globalThis.__decorate||function(o,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,s);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let p=class extends f{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return l`
      <wui-input-text
        value=${k(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return l`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${$.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?l`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};p.styles=[j,B];b([w()],p.prototype,"errorMessage",void 0);b([w({type:Boolean})],p.prototype,"disabled",void 0);b([w()],p.prototype,"value",void 0);b([w({type:Boolean})],p.prototype,"loading",void 0);p=b([g("wui-ens-input")],p);const L=y`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .suggestion:hover {
    background-color: var(--wui-color-gray-glass-005);
    cursor: pointer;
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
  }

  wui-icon-link {
    position: absolute;
    right: 20px;
    transform: translateY(11px);
  }
`;var m=globalThis&&globalThis.__decorate||function(o,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,s);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let c=class extends f{constructor(){super(),this.formRef=H(),this.usubscribe=[],this.name="",this.error="",this.loading=u.state.loading,this.suggestions=u.state.suggestions,this.registered=!1,this.profileName=d.state.profileName,this.onDebouncedNameInputChange=O.debounce(e=>{u.validateName(e)?(this.error="",this.name=e,u.getSuggestions(e),u.isNameRegistered(e).then(i=>{this.registered=i})):e.length<4?this.error="Name must be at least 4 characters long":this.error="Can only contain letters, numbers and - characters"}),this.usubscribe.push(u.subscribe(e=>{this.suggestions=e.suggestions,this.loading=e.loading}),d.subscribeKey("profileName",e=>{this.profileName=e,e&&(this.error="You already own a name")}))}firstUpdated(){var e;(e=this.formRef.value)==null||e.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){var e;super.disconnectedCallback(),this.usubscribe.forEach(i=>i()),(e=this.formRef.value)==null||e.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${V(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){return this.isAllowedToSubmit()?l`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        `:null}onSelectSuggestion(e){return()=>{this.name=e,this.registered=!1,this.requestUpdate()}}onNameInputChange(e){this.onDebouncedNameInputChange(e.detail)}nameSuggestionTagTemplate(){return this.loading?l`<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>`:this.registered?l`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:l`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){if(!this.name||this.name.length<4||this.error)return null;const e=this.registered?this.suggestions.filter(i=>i.name!==this.name):[];return l`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        data-testid="account-name-suggestion"
        .padding=${["m","m","m","m"]}
        justifyContent="space-between"
        class="suggestion"
        @click=${this.onSubmitName.bind(this)}
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${e.map(i=>this.availableNameTemplate(i.name))}
    </wui-flex>`}availableNameTemplate(e){return l` <wui-flex
      data-testid="account-name-suggestion"
      .padding=${["m","m","m","m"]}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(e)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${e}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`}isAllowedToSubmit(){return!this.loading&&!this.registered&&!this.error&&!this.profileName&&u.validateName(this.name)}async onSubmitName(){var i,s,n;const e=D.state.activeChain;try{if(!this.isAllowedToSubmit())return;const t=`${this.name}${$.WC_NAME_SUFFIX}`;x.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:((i=d.state.preferredAccountTypes)==null?void 0:i[e])===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}}),await u.registerName(t),x.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:((s=d.state.preferredAccountTypes)==null?void 0:s[e])===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}})}catch(t){P.showError(t.message),x.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:((n=d.state.preferredAccountTypes)==null?void 0:n[e])===T.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:`${this.name}${$.WC_NAME_SUFFIX}`,error:(t==null?void 0:t.message)||"Unknown error"}})}}onEnterKey(e){e.key==="Enter"&&this.isAllowedToSubmit()&&this.onSubmitName()}};c.styles=L;m([w()],c.prototype,"errorMessage",void 0);m([h()],c.prototype,"name",void 0);m([h()],c.prototype,"error",void 0);m([h()],c.prototype,"loading",void 0);m([h()],c.prototype,"suggestions",void 0);m([h()],c.prototype,"registered",void 0);m([h()],c.prototype,"profileName",void 0);c=m([g("w3m-register-account-name-view")],c);const K=y`
  .continue-button-container {
    width: 100%;
  }
`;var q=globalThis&&globalThis.__decorate||function(o,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,s);else for(var a=o.length-1;a>=0;a--)(r=o[a])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let C=class extends f{render(){return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{O.openHref(z.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return l` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return l`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){I.replace("Account")}};C.styles=K;C=q([g("w3m-register-account-name-success-view")],C);export{v as W3mApproveTransactionView,C as W3mRegisterAccountNameSuccess,c as W3mRegisterAccountNameView,_ as W3mUpgradeWalletView};
