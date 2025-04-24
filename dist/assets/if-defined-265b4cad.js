import{ae as k,af as B,ag as A,l as P,t as R,a5 as j,m as O,x as E,_ as o,aa as M}from"./index-7d485662.js";const h={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:i,truncate:a}){return t.length<=e+i?t:a==="end"?`${t.substring(0,e)}...`:a==="start"?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`},generateAvatarColors(t){const i=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),a=this.hexToRgb(i),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(n==null?void 0:n.replace("px","")),c=`${s}% ${s}% at 65% 40%`,_=[];for(let v=0;v<5;v+=1){const d=this.tintColor(a,.15*v);_.push(`rgb(${d[0]}, ${d[1]}, ${d[2]})`)}return`
    --local-color-1: ${_[0]};
    --local-color-2: ${_[1]};
    --local-color-3: ${_[2]};
    --local-color-4: ${_[3]};
    --local-color-5: ${_[4]};
    --local-radial-circle: ${c}
   `},hexToRgb(t){const e=parseInt(t,16),i=e>>16&255,a=e>>8&255,n=e&255;return[i,a,n]},tintColor(t,e){const[i,a,n]=t,r=Math.round(i+(255-i)*e),s=Math.round(a+(255-a)*e),c=Math.round(n+(255-n)*e);return[r,s,c]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){var e;return t||(typeof window<"u"&&window.matchMedia?(e=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&e.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,i){return t.toString().length>=e?Number(t).toFixed(i):t},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}};function U(t,e){const{kind:i,elements:a}=e;return{kind:i,elements:a,finisher(n){customElements.get(t)||customElements.define(t,n)}}}function H(t,e){return customElements.get(t)||customElements.define(t,e),e}function L(t){return function(i){return typeof i=="function"?H(t,i):U(t,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:B},F=(t=N,e,i)=>{const{kind:a,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),a==="accessor"){const{name:s}=i;return{set(c){const _=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,_,t)},init(c){return c!==void 0&&this.C(s,void 0,t,c),c}}}if(a==="setter"){const{name:s}=i;return function(c){const _=this[s];e.call(this,c),this.requestUpdate(s,_,t)}}throw Error("Unsupported decorator location: "+a)};function l(t){return(e,i)=>typeof i=="object"?F(t,e,i):((a,n,r)=>{const s=n.hasOwnProperty(r);return n.constructor.createProperty(r,a),s?Object.getOwnPropertyDescriptor(n,r):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=t=>t===null||typeof t!="object"&&typeof t!="function",W=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},C=t=>(...e)=>({_$litDirective$:t,values:e});let x=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,a){this._$Ct=e,this._$AM=i,this._$Ci=a}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=(t,e)=>{var a;const i=t._$AN;if(i===void 0)return!1;for(const n of i)(a=n._$AO)==null||a.call(n,e,!1),f(n,e);return!0},$=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while((i==null?void 0:i.size)===0)},z=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),K(e)}};function Y(t){this._$AN!==void 0?($(this),this._$AM=t,z(this)):this._$AM=t}function q(t,e=!1,i=0){const a=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(e)if(Array.isArray(a))for(let r=i;r<a.length;r++)f(a[r],!1),$(a[r]);else a!=null&&(f(a,!1),$(a));else f(this,t)}const K=t=>{t.type==V.CHILD&&(t._$AP??(t._$AP=q),t._$AQ??(t._$AQ=Y))};class X extends x{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,a){super._$AT(e,i,a),z(this),this.isConnected=e._$AU}_$AO(e,i=!0){var a,n;e!==this.isConnected&&(this.isConnected=e,e?(a=this.reconnected)==null||a.call(this):(n=this.disconnected)==null||n.call(this)),i&&(f(this,e),$(this))}setValue(e){if(W(this._$Ct))this._$Ct._$AI(e,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Z{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class Q{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(e=>this.Z=e))}resume(){var e;(e=this.Z)==null||e.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=t=>!G(t)&&typeof t.then=="function",D=1073741823;class J extends X{constructor(){super(...arguments),this._$Cwt=D,this._$Cbt=[],this._$CK=new Z(this),this._$CX=new Q}render(...e){return e.find(i=>!I(i))??A}update(e,i){const a=this._$Cbt;let n=a.length;this._$Cbt=i;const r=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let c=0;c<i.length&&!(c>this._$Cwt);c++){const _=i[c];if(!I(_))return this._$Cwt=c,_;c<n&&_===a[c]||(this._$Cwt=D,n=0,Promise.resolve(_).then(async v=>{for(;s.get();)await s.get();const d=r.deref();if(d!==void 0){const T=d._$Cbt.indexOf(_);T>-1&&T<d._$Cwt&&(d._$Cwt=T,d.setValue(v))}}))}return A}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const tt=C(J);class et{constructor(){this.cache=new Map}set(e,i){this.cache.set(e,i)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}const S=new et,it=P`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var m=globalThis&&globalThis.__decorate||function(t,e,i,a){var n=arguments.length,r=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};const b={add:async()=>(await o(()=>import("./add-cf111e5f.js"),["assets/add-cf111e5f.js","assets/index-7d485662.js","assets/index-c440448c.css"])).addSvg,allWallets:async()=>(await o(()=>import("./all-wallets-728a8157.js"),["assets/all-wallets-728a8157.js","assets/index-7d485662.js","assets/index-c440448c.css"])).allWalletsSvg,arrowBottomCircle:async()=>(await o(()=>import("./arrow-bottom-circle-00e25e16.js"),["assets/arrow-bottom-circle-00e25e16.js","assets/index-7d485662.js","assets/index-c440448c.css"])).arrowBottomCircleSvg,appStore:async()=>(await o(()=>import("./app-store-5a837cbb.js"),["assets/app-store-5a837cbb.js","assets/index-7d485662.js","assets/index-c440448c.css"])).appStoreSvg,apple:async()=>(await o(()=>import("./apple-5da9876e.js"),["assets/apple-5da9876e.js","assets/index-7d485662.js","assets/index-c440448c.css"])).appleSvg,arrowBottom:async()=>(await o(()=>import("./arrow-bottom-de1a9682.js"),["assets/arrow-bottom-de1a9682.js","assets/index-7d485662.js","assets/index-c440448c.css"])).arrowBottomSvg,arrowLeft:async()=>(await o(()=>import("./arrow-left-5cd77775.js"),["assets/arrow-left-5cd77775.js","assets/index-7d485662.js","assets/index-c440448c.css"])).arrowLeftSvg,arrowRight:async()=>(await o(()=>import("./arrow-right-5e420980.js"),["assets/arrow-right-5e420980.js","assets/index-7d485662.js","assets/index-c440448c.css"])).arrowRightSvg,arrowTop:async()=>(await o(()=>import("./arrow-top-6d3d1901.js"),["assets/arrow-top-6d3d1901.js","assets/index-7d485662.js","assets/index-c440448c.css"])).arrowTopSvg,bank:async()=>(await o(()=>import("./bank-2e1b9ae4.js"),["assets/bank-2e1b9ae4.js","assets/index-7d485662.js","assets/index-c440448c.css"])).bankSvg,browser:async()=>(await o(()=>import("./browser-6995e499.js"),["assets/browser-6995e499.js","assets/index-7d485662.js","assets/index-c440448c.css"])).browserSvg,card:async()=>(await o(()=>import("./card-1528d97c.js"),["assets/card-1528d97c.js","assets/index-7d485662.js","assets/index-c440448c.css"])).cardSvg,checkmark:async()=>(await o(()=>import("./checkmark-bacd4eb8.js"),["assets/checkmark-bacd4eb8.js","assets/index-7d485662.js","assets/index-c440448c.css"])).checkmarkSvg,checkmarkBold:async()=>(await o(()=>import("./checkmark-bold-733c25ea.js"),["assets/checkmark-bold-733c25ea.js","assets/index-7d485662.js","assets/index-c440448c.css"])).checkmarkBoldSvg,chevronBottom:async()=>(await o(()=>import("./chevron-bottom-6ebb7364.js"),["assets/chevron-bottom-6ebb7364.js","assets/index-7d485662.js","assets/index-c440448c.css"])).chevronBottomSvg,chevronLeft:async()=>(await o(()=>import("./chevron-left-68464d35.js"),["assets/chevron-left-68464d35.js","assets/index-7d485662.js","assets/index-c440448c.css"])).chevronLeftSvg,chevronRight:async()=>(await o(()=>import("./chevron-right-c4048b38.js"),["assets/chevron-right-c4048b38.js","assets/index-7d485662.js","assets/index-c440448c.css"])).chevronRightSvg,chevronTop:async()=>(await o(()=>import("./chevron-top-b4f3d395.js"),["assets/chevron-top-b4f3d395.js","assets/index-7d485662.js","assets/index-c440448c.css"])).chevronTopSvg,chromeStore:async()=>(await o(()=>import("./chrome-store-51604e85.js"),["assets/chrome-store-51604e85.js","assets/index-7d485662.js","assets/index-c440448c.css"])).chromeStoreSvg,clock:async()=>(await o(()=>import("./clock-eb519cde.js"),["assets/clock-eb519cde.js","assets/index-7d485662.js","assets/index-c440448c.css"])).clockSvg,close:async()=>(await o(()=>import("./close-9ee57e3d.js"),["assets/close-9ee57e3d.js","assets/index-7d485662.js","assets/index-c440448c.css"])).closeSvg,compass:async()=>(await o(()=>import("./compass-60a3bf1f.js"),["assets/compass-60a3bf1f.js","assets/index-7d485662.js","assets/index-c440448c.css"])).compassSvg,coinPlaceholder:async()=>(await o(()=>import("./coinPlaceholder-70544a76.js"),["assets/coinPlaceholder-70544a76.js","assets/index-7d485662.js","assets/index-c440448c.css"])).coinPlaceholderSvg,copy:async()=>(await o(()=>import("./copy-62f24612.js"),["assets/copy-62f24612.js","assets/index-7d485662.js","assets/index-c440448c.css"])).copySvg,cursor:async()=>(await o(()=>import("./cursor-13bfc3ec.js"),["assets/cursor-13bfc3ec.js","assets/index-7d485662.js","assets/index-c440448c.css"])).cursorSvg,cursorTransparent:async()=>(await o(()=>import("./cursor-transparent-17083d97.js"),["assets/cursor-transparent-17083d97.js","assets/index-7d485662.js","assets/index-c440448c.css"])).cursorTransparentSvg,desktop:async()=>(await o(()=>import("./desktop-fc6fdb97.js"),["assets/desktop-fc6fdb97.js","assets/index-7d485662.js","assets/index-c440448c.css"])).desktopSvg,disconnect:async()=>(await o(()=>import("./disconnect-2d0f6efe.js"),["assets/disconnect-2d0f6efe.js","assets/index-7d485662.js","assets/index-c440448c.css"])).disconnectSvg,discord:async()=>(await o(()=>import("./discord-eb0823fb.js"),["assets/discord-eb0823fb.js","assets/index-7d485662.js","assets/index-c440448c.css"])).discordSvg,etherscan:async()=>(await o(()=>import("./etherscan-51f1c633.js"),["assets/etherscan-51f1c633.js","assets/index-7d485662.js","assets/index-c440448c.css"])).etherscanSvg,extension:async()=>(await o(()=>import("./extension-62363ea8.js"),["assets/extension-62363ea8.js","assets/index-7d485662.js","assets/index-c440448c.css"])).extensionSvg,externalLink:async()=>(await o(()=>import("./external-link-333074be.js"),["assets/external-link-333074be.js","assets/index-7d485662.js","assets/index-c440448c.css"])).externalLinkSvg,facebook:async()=>(await o(()=>import("./facebook-edaade8b.js"),["assets/facebook-edaade8b.js","assets/index-7d485662.js","assets/index-c440448c.css"])).facebookSvg,farcaster:async()=>(await o(()=>import("./farcaster-991e2afa.js"),["assets/farcaster-991e2afa.js","assets/index-7d485662.js","assets/index-c440448c.css"])).farcasterSvg,filters:async()=>(await o(()=>import("./filters-a8f5e763.js"),["assets/filters-a8f5e763.js","assets/index-7d485662.js","assets/index-c440448c.css"])).filtersSvg,github:async()=>(await o(()=>import("./github-cf4d4194.js"),["assets/github-cf4d4194.js","assets/index-7d485662.js","assets/index-c440448c.css"])).githubSvg,google:async()=>(await o(()=>import("./google-f606d00e.js"),["assets/google-f606d00e.js","assets/index-7d485662.js","assets/index-c440448c.css"])).googleSvg,helpCircle:async()=>(await o(()=>import("./help-circle-7f1c50dc.js"),["assets/help-circle-7f1c50dc.js","assets/index-7d485662.js","assets/index-c440448c.css"])).helpCircleSvg,image:async()=>(await o(()=>import("./image-4964d764.js"),["assets/image-4964d764.js","assets/index-7d485662.js","assets/index-c440448c.css"])).imageSvg,id:async()=>(await o(()=>import("./id-3245ef99.js"),["assets/id-3245ef99.js","assets/index-7d485662.js","assets/index-c440448c.css"])).idSvg,infoCircle:async()=>(await o(()=>import("./info-circle-4a01c0d9.js"),["assets/info-circle-4a01c0d9.js","assets/index-7d485662.js","assets/index-c440448c.css"])).infoCircleSvg,lightbulb:async()=>(await o(()=>import("./lightbulb-7bd3c3ad.js"),["assets/lightbulb-7bd3c3ad.js","assets/index-7d485662.js","assets/index-c440448c.css"])).lightbulbSvg,mail:async()=>(await o(()=>import("./mail-74379e87.js"),["assets/mail-74379e87.js","assets/index-7d485662.js","assets/index-c440448c.css"])).mailSvg,mobile:async()=>(await o(()=>import("./mobile-d70d7c18.js"),["assets/mobile-d70d7c18.js","assets/index-7d485662.js","assets/index-c440448c.css"])).mobileSvg,more:async()=>(await o(()=>import("./more-7460ccce.js"),["assets/more-7460ccce.js","assets/index-7d485662.js","assets/index-c440448c.css"])).moreSvg,networkPlaceholder:async()=>(await o(()=>import("./network-placeholder-6e0d029d.js"),["assets/network-placeholder-6e0d029d.js","assets/index-7d485662.js","assets/index-c440448c.css"])).networkPlaceholderSvg,nftPlaceholder:async()=>(await o(()=>import("./nftPlaceholder-16287911.js"),["assets/nftPlaceholder-16287911.js","assets/index-7d485662.js","assets/index-c440448c.css"])).nftPlaceholderSvg,off:async()=>(await o(()=>import("./off-fe1aae36.js"),["assets/off-fe1aae36.js","assets/index-7d485662.js","assets/index-c440448c.css"])).offSvg,playStore:async()=>(await o(()=>import("./play-store-8d318c30.js"),["assets/play-store-8d318c30.js","assets/index-7d485662.js","assets/index-c440448c.css"])).playStoreSvg,plus:async()=>(await o(()=>import("./plus-a7bc7f15.js"),["assets/plus-a7bc7f15.js","assets/index-7d485662.js","assets/index-c440448c.css"])).plusSvg,qrCode:async()=>(await o(()=>import("./qr-code-0eef184b.js"),["assets/qr-code-0eef184b.js","assets/index-7d485662.js","assets/index-c440448c.css"])).qrCodeIcon,recycleHorizontal:async()=>(await o(()=>import("./recycle-horizontal-cabf6047.js"),["assets/recycle-horizontal-cabf6047.js","assets/index-7d485662.js","assets/index-c440448c.css"])).recycleHorizontalSvg,refresh:async()=>(await o(()=>import("./refresh-b920dc76.js"),["assets/refresh-b920dc76.js","assets/index-7d485662.js","assets/index-c440448c.css"])).refreshSvg,search:async()=>(await o(()=>import("./search-561a02f2.js"),["assets/search-561a02f2.js","assets/index-7d485662.js","assets/index-c440448c.css"])).searchSvg,send:async()=>(await o(()=>import("./send-d42cadf2.js"),["assets/send-d42cadf2.js","assets/index-7d485662.js","assets/index-c440448c.css"])).sendSvg,swapHorizontal:async()=>(await o(()=>import("./swapHorizontal-15b40544.js"),["assets/swapHorizontal-15b40544.js","assets/index-7d485662.js","assets/index-c440448c.css"])).swapHorizontalSvg,swapHorizontalMedium:async()=>(await o(()=>import("./swapHorizontalMedium-ff5e289f.js"),["assets/swapHorizontalMedium-ff5e289f.js","assets/index-7d485662.js","assets/index-c440448c.css"])).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await o(()=>import("./swapHorizontalBold-02586b06.js"),["assets/swapHorizontalBold-02586b06.js","assets/index-7d485662.js","assets/index-c440448c.css"])).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await o(()=>import("./swapHorizontalRoundedBold-72e94604.js"),["assets/swapHorizontalRoundedBold-72e94604.js","assets/index-7d485662.js","assets/index-c440448c.css"])).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await o(()=>import("./swapVertical-09fcbb9a.js"),["assets/swapVertical-09fcbb9a.js","assets/index-7d485662.js","assets/index-c440448c.css"])).swapVerticalSvg,telegram:async()=>(await o(()=>import("./telegram-58c8c915.js"),["assets/telegram-58c8c915.js","assets/index-7d485662.js","assets/index-c440448c.css"])).telegramSvg,threeDots:async()=>(await o(()=>import("./three-dots-09da2256.js"),["assets/three-dots-09da2256.js","assets/index-7d485662.js","assets/index-c440448c.css"])).threeDotsSvg,twitch:async()=>(await o(()=>import("./twitch-59c804c7.js"),["assets/twitch-59c804c7.js","assets/index-7d485662.js","assets/index-c440448c.css"])).twitchSvg,twitter:async()=>(await o(()=>import("./x-3780a8f5.js"),["assets/x-3780a8f5.js","assets/index-7d485662.js","assets/index-c440448c.css"])).xSvg,twitterIcon:async()=>(await o(()=>import("./twitterIcon-f2210dc6.js"),["assets/twitterIcon-f2210dc6.js","assets/index-7d485662.js","assets/index-c440448c.css"])).twitterIconSvg,verify:async()=>(await o(()=>import("./verify-a5da09d3.js"),["assets/verify-a5da09d3.js","assets/index-7d485662.js","assets/index-c440448c.css"])).verifySvg,verifyFilled:async()=>(await o(()=>import("./verify-filled-329cd645.js"),["assets/verify-filled-329cd645.js","assets/index-7d485662.js","assets/index-c440448c.css"])).verifyFilledSvg,wallet:async()=>(await o(()=>import("./wallet-7dd3006d.js"),["assets/wallet-7dd3006d.js","assets/index-7d485662.js","assets/index-c440448c.css"])).walletSvg,walletConnect:async()=>(await o(()=>import("./walletconnect-61074f77.js"),["assets/walletconnect-61074f77.js","assets/index-7d485662.js","assets/index-c440448c.css"])).walletConnectSvg,walletConnectLightBrown:async()=>(await o(()=>import("./walletconnect-61074f77.js"),["assets/walletconnect-61074f77.js","assets/index-7d485662.js","assets/index-c440448c.css"])).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await o(()=>import("./walletconnect-61074f77.js"),["assets/walletconnect-61074f77.js","assets/index-7d485662.js","assets/index-c440448c.css"])).walletConnectBrownSvg,walletPlaceholder:async()=>(await o(()=>import("./wallet-placeholder-844cafd6.js"),["assets/wallet-placeholder-844cafd6.js","assets/index-7d485662.js","assets/index-c440448c.css"])).walletPlaceholderSvg,warningCircle:async()=>(await o(()=>import("./warning-circle-0e9cb1a5.js"),["assets/warning-circle-0e9cb1a5.js","assets/index-7d485662.js","assets/index-c440448c.css"])).warningCircleSvg,x:async()=>(await o(()=>import("./x-3780a8f5.js"),["assets/x-3780a8f5.js","assets/index-7d485662.js","assets/index-c440448c.css"])).xSvg,info:async()=>(await o(()=>import("./info-ab9bde3d.js"),["assets/info-ab9bde3d.js","assets/index-7d485662.js","assets/index-c440448c.css"])).infoSvg,exclamationTriangle:async()=>(await o(()=>import("./exclamation-triangle-80e15e77.js"),["assets/exclamation-triangle-80e15e77.js","assets/index-7d485662.js","assets/index-c440448c.css"])).exclamationTriangleSvg,reown:async()=>(await o(()=>import("./reown-logo-f55405a2.js"),["assets/reown-logo-f55405a2.js","assets/index-7d485662.js","assets/index-c440448c.css"])).reownSvg};async function ot(t){if(S.has(t))return S.get(t);const i=(b[t]??b.copy)();return S.set(t,i),i}let g=class extends O{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,E`${tt(ot(this.name),E`<div class="fallback"></div>`)}`}};g.styles=[R,j,it];m([l()],g.prototype,"size",void 0);m([l()],g.prototype,"name",void 0);m([l()],g.prototype,"color",void 0);m([l()],g.prototype,"aspectRatio",void 0);g=m([L("wui-icon")],g);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=C(class extends x{constructor(t){var e;if(super(t),t.type!==V.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var a,n;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((a=this.nt)!=null&&a.has(r))&&this.st.add(r);return this.render(e)}const i=t.element.classList;for(const r of this.st)r in e||(i.remove(r),this.st.delete(r));for(const r in e){const s=!!e[r];s===this.st.has(r)||(n=this.nt)!=null&&n.has(r)||(s?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return A}}),at=P`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var y=globalThis&&globalThis.__decorate||function(t,e,i,a){var n=arguments.length,r=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let w=class extends O{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,E`<slot class=${rt(e)}></slot>`}};w.styles=[R,at];y([l()],w.prototype,"variant",void 0);y([l()],w.prototype,"color",void 0);y([l()],w.prototype,"align",void 0);y([l()],w.prototype,"lineClamp",void 0);w=y([L("wui-text")],w);const nt=P`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var p=globalThis&&globalThis.__decorate||function(t,e,i,a){var n=arguments.length,r=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,i,a);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let u=class extends O{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&h.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&h.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&h.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&h.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&h.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&h.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&h.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&h.getSpacingStyles(this.margin,3)};
    `,E`<slot></slot>`}};u.styles=[R,nt];p([l()],u.prototype,"flexDirection",void 0);p([l()],u.prototype,"flexWrap",void 0);p([l()],u.prototype,"flexBasis",void 0);p([l()],u.prototype,"flexGrow",void 0);p([l()],u.prototype,"flexShrink",void 0);p([l()],u.prototype,"alignItems",void 0);p([l()],u.prototype,"justifyContent",void 0);p([l()],u.prototype,"columnGap",void 0);p([l()],u.prototype,"rowGap",void 0);p([l()],u.prototype,"gap",void 0);p([l()],u.prototype,"padding",void 0);p([l()],u.prototype,"margin",void 0);u=p([L("wui-flex")],u);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=t=>t??M;export{h as U,C as a,L as c,rt as e,X as f,l as n,dt as o,ct as r};
