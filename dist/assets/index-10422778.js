import{l as d,t as p,a5 as u,m,x as g}from"./index-7d485662.js";import{n,c as f}from"./if-defined-265b4cad.js";const b=d`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var c=globalThis&&globalThis.__decorate||function(o,t,s,r){var l=arguments.length,e=l<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,s):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(o,t,s,r);else for(var h=o.length-1;h>=0;h--)(a=o[h])&&(e=(l<3?a(e):l>3?a(t,s,e):a(t,s))||e);return l>3&&e&&Object.defineProperty(t,s,e),e};let i=class extends m{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,g`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};i.styles=[p,u,b];c([n()],i.prototype,"src",void 0);c([n()],i.prototype,"alt",void 0);c([n()],i.prototype,"size",void 0);i=c([f("wui-image")],i);
