/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(o,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,g=_?_.emptyScript:"",f=p.reactiveElementPolyfillSupport,m=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!a(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const s=o?.call(this);n?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=t.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=o;const s=n.fromAttribute(t,e.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,n=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??y)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,T=`<${S}>`,k=document,D=()=>k.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,N=/>/g,M=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,G=k.createTreeWalker(k,129);function W(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,o=[];let n,s=2===t?"<svg>":3===t?"<math>":"",r=U;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===U?"!--"===c[1]?r=R:void 0!==c[1]?r=N:void 0!==c[2]?(L.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=M):void 0!==c[3]&&(r=M):r===M?">"===c[0]?(r=n??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?M:'"'===c[3]?z:H):r===z||r===H?r=M:r===R||r===N?r=U:(r=M,n=void 0);const h=r===M&&e[t+1].startsWith("/>")?" ":"";s+=r===U?i+T:l>=0?(o.push(a),i.slice(0,l)+w+i.slice(l)+C+h):i+C+(-2===l?t:h)}return[W(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Z{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,s=0;const r=e.length-1,a=this.parts,[c,l]=K(e,t);if(this.el=Z.createElement(c,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=G.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(w)){const t=l[s++],i=o.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?ee:"@"===r[1]?te:Q}),o.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(e));if(L.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],D()),G.nextNode(),a.push({type:2,index:++n});o.append(e[t],D())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function F(e,t,i=e,o){if(t===V)return t;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=P(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(t=F(e,n._$AS(e,t.values),n,o)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??k).importNode(t,!0);G.currentNode=o;let n=G.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new Y(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new ie(n,this,e)),this._$AV.push(t),a=i[++r]}s!==a?.index&&(n=G.nextNode(),s++)}return G.currentNode=k,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=F(this,e,t),P(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new J(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new Y(this.O(D()),this.O(D()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(e,t=this,i,o){const n=this.strings;let s=!1;if(void 0===n)e=F(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==V,s&&(this._$AH=e);else{const o=e;let r,a;for(e=n[0],r=0;r<n.length-1;r++)a=F(this,o[i+r],t,r),a===V&&(a=this._$AH[r]),s||=!P(a)||a!==this._$AH[r],a===B?e=B:e!==B&&(e+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class ee extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class te extends Q{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=F(this,e,t,0)??B)===V)return;const i=this._$AH,o=e===B&&i!==B||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){F(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class se extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let n=o._$litPart$;if(void 0===n){const e=i?.renderBefore??null;o._$litPart$=n=new Y(t.insertBefore(D(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}se._$litElement$=!0,se.finalized=!0,ne.litElementHydrateSupport?.({LitElement:se});const re=ne.litElementPolyfillSupport;re?.({LitElement:se}),(ne.litElementVersions??=[]).push("4.2.1");const ae={en:{title:"Title",tag_uid:"Tag UID",charging_station:"Charging Station",volume_db:"Volume dB",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",selection_mode:"Configuration Mode",entity_source:"Select Toniebox Entity",device_source:"Select Toniebox Device",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface",selection_mode_description:"Choose how to configure your Toniebox",entity_source_description:"Select any entity from your Toniebox to auto-configure",device_source_description:"Select your Toniebox device directly from Home Assistant registry",mode_auto:"Auto-detect from entity",mode_manual:"Manual configuration",mode_device:"Device-based selection",no_devices_found:"No TeddyCloud devices found",no_ha_devices_found:"No TeddyCloud devices found in Home Assistant registry",devices_found:"Found {count} TeddyCloud device(s)",ha_devices_found:"Found {count} Toniebox device(s) in registry",entity_validation:"Entity Validation",device_validation:"Device Validation",entities_missing:"{count} of {total} entities missing",entities_all_found:"All entities found",device_valid:"Device configuration valid",device_invalid:"Device configuration invalid",switch_to_auto:"Switch to auto-detection",switch_to_manual:"Switch to manual setup",switch_to_device:"Switch to device selection"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found"}},de:{title:"Titel",tag_uid:"Tag UID",charging_station:"Ladestation",volume_db:"Lautstärke dB",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",selection_mode:"Konfigurationsmodus",entity_source:"Toniebox Entity auswählen",device_source:"Toniebox Gerät auswählen",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche",selection_mode_description:"Wählen Sie, wie Sie Ihre Toniebox konfigurieren möchten",entity_source_description:"Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration",device_source_description:"Wählen Sie Ihr Toniebox-Gerät direkt aus der Home Assistant Registrierung",mode_auto:"Automatische Erkennung von Entity",mode_manual:"Manuelle Konfiguration",mode_device:"Gerätebasierte Auswahl",no_devices_found:"Keine TeddyCloud Geräte gefunden",no_ha_devices_found:"Keine TeddyCloud Geräte in Home Assistant Registrierung gefunden",devices_found:"{count} TeddyCloud Gerät(e) gefunden",ha_devices_found:"{count} Toniebox-Gerät(e) in Registrierung gefunden",entity_validation:"Entity Validierung",device_validation:"Geräte Validierung",entities_missing:"{count} von {total} Entities fehlen",entities_all_found:"Alle Entities gefunden",device_valid:"Geräte-Konfiguration gültig",device_invalid:"Geräte-Konfiguration ungültig",switch_to_auto:"Zur automatischen Erkennung wechseln",switch_to_manual:"Zur manuellen Einrichtung wechseln",switch_to_device:"Zur Geräteauswahl wechseln"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden"}}};function ce(e,t="en",i={}){const o=e.split(".");let n=ae[t]||ae.en;for(const e of o)n=n?.[e];if(!n)return e;let s=n;return Object.entries(i).forEach(([e,t])=>{s=s.replace(new RegExp(`\\{${e}\\}`,"g"),t)}),s}function le(e){if(!e||"string"!=typeof e)return null;const t=e.match(/teddycloud_box_([^_]+)_/);return t?t[1]:null}function de(e){return e&&e.includes("teddycloud_box_")}function he(e,t){if(!e?.attributes)return`Toniebox ${t}`;const i=e.attributes.friendly_name,o=e.attributes.name,n=e.attributes.device_name;return i?i.replace(/^TeddyCloud Box \w+ /,"").replace(/^Toniebox /,"").replace(/^Box /,"")||`Toniebox ${t}`:n||(o||`Toniebox ${t}`)}function ue(e){return{contentPicture:`image.teddycloud_box_${e}_content_picture`,contentTitle:`sensor.teddycloud_box_${e}_content_title`,tagValid:`sensor.teddycloud_box_${e}_tag_valid`,volumeDb:`sensor.teddycloud_box_${e}_volume_db`,volumeLevel:`sensor.teddycloud_box_${e}_volume_level`,contentAudioId:`sensor.teddycloud_box_${e}_content_audio_id`,charger:`binary_sensor.teddycloud_box_${e}_charger`,volumeDown:`event.teddycloud_box_${e}_volume_down`,volumeUp:`event.teddycloud_box_${e}_volume_up`,cacheContent:"switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server",enableCloud:"switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation"}}customElements.define("teddy-card-editor",class extends se{static get properties(){return{hass:{},config:{},_availableDevices:{type:Array},_selectedEntity:{type:String}}}constructor(){super(),this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:""},this._availableDevices=[],this._selectedEntity=""}setConfig(e){this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",...e},this._selectedEntity=this.config.entity_source||"",this._updateAvailableDevices()}connectedCallback(){super.connectedCallback(),this._updateAvailableDevices()}updated(e){super.updated(e),e.has("hass")&&this._updateAvailableDevices()}_updateAvailableDevices(){if(this.hass){const e=function(e){const t=new Map;return e?.states?(Object.keys(e.states).forEach(e=>{if(de(e)){const i=le(e);i&&(t.has(i)||t.set(i,{id:i,entities:[],name:null,sampleEntity:e}),t.get(i).entities.push(e))}}),t.forEach((t,i)=>{const o=e.states[t.sampleEntity];t.name=he(o,i)}),t):t}(this.hass);this._availableDevices=Array.from(e.values())}}get _toniebox_id(){return this.config?.toniebox_id||""}get _toniebox_name(){return this.config?.toniebox_name||""}get _language(){return this.config?.language||"en"}get _entity_source(){return this.config?.entity_source||""}_onEntitySelect(e){const t=e.target.value;if(this._selectedEntity=t,t&&this.hass)try{const e=function(e,t){const i=le(t);if(!i)throw new Error("Invalid entity selected - cannot extract Toniebox ID");return{entity_source:t,toniebox_id:i,toniebox_name:he(e.states[t],i)}}(this.hass,t);if(console.debug("Auto config from entity:",e),e&&"object"==typeof e){const t={...this.config||{language:"en"},...e,language:this._language};console.debug("Final config to update:",t),this._updateConfig(t)}else console.warn("Invalid autoConfig received:",e)}catch(e){console.error("Could not create config from entity:",e)}else if(!t){const e={...this.config,entity_source:"",toniebox_id:"",toniebox_name:""};this._updateConfig(e)}}_valueChanged(e){if(!this.config||!this.hass)return;const t=e.target,i=t.configValue,o=t.value;if(this[`_${i}`]===o)return;const n={...this.config};i&&(""===o||void 0===o?delete n[i]:n[i]=o),this._updateConfig(n)}_updateConfig(e){if(!e||"object"!=typeof e)return void console.error("Cannot update with invalid config:",e);const t={language:"en"};Object.keys(e).forEach(i=>{void 0!==e[i]&&(t[i]=e[i])}),console.debug("Updating config:",t);const i=new Event("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_renderEntityConfig(){const e=(t=this.hass,t?.states?Object.keys(t.states).filter(e=>de(e)).map(e=>{const i=t.states[e],o=le(e);return{value:e,label:`${he(i,o)} (${i.attributes?.friendly_name||e})`,boxId:o}}).sort((e,t)=>e.label.localeCompare(t.label)):[]);var t;return j`
      <div class="entity-config">
        <div class="form-group">
          <ha-select
            label="${ce("config.entity_source",this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${ce("config.entity_source_description",this._language)}"
          >
            <mwc-list-item value="">-- Select Entity --</mwc-list-item>
            ${e.map(e=>j`
              <mwc-list-item value="${e.value}">
                ${e.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedEntity?j`
          <div class="auto-detected-info">
            <h4>${ce("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderEntityValidation(){if(!this._toniebox_id)return j`<div class="no-validation">Enter Toniebox ID to validate entities</div>`;const e=function(e,t){const i=ue(t),o=[],n=[];return Object.entries(i).forEach(([t,i])=>{e?.states?.[i]?n.push({key:t,entityId:i}):o.push({key:t,entityId:i})}),{valid:0===o.length,missing:o,available:n,totalExpected:Object.keys(i).length,foundCount:n.length}}(this.hass,this._toniebox_id);return j`
      <div class="entity-validation">
        ${e.valid?j`
          <ha-alert alert-type="success">
            ${ce("config.entities_all_found",this._language)}
          </ha-alert>
        `:j`
          <ha-alert alert-type="warning">
            ${ce("config.entities_missing",this._language,{count:e.missing.length,total:e.totalExpected})}
          </ha-alert>
        `}
        
        <div class="entity-status">
          <div class="found-entities">
            <h5>✅ Available (${e.foundCount})</h5>
            <ul>
              ${e.available.map(e=>j`
                <li><code>${e.entityId}</code></li>
              `)}
            </ul>
          </div>
          
          ${e.missing.length>0?j`
            <div class="missing-entities">
              <h5>❌ Missing (${e.missing.length})</h5>
              <ul>
                ${e.missing.map(e=>j`
                  <li><code>${e.entityId}</code></li>
                `)}
              </ul>
            </div>
          `:""}
        </div>
      </div>
    `}render(){return this.hass?j`
      <div class="card-config">
        ${this._renderEntityConfig()}

        <div class="form-group">
          <ha-select
            label="${ce("config.language",this._language)}"
            .value=${this._language}
            .configValue=${"language"}
            @selected=${this._valueChanged}
            helper-text="${ce("config.language_description",this._language)}"
          >
            <mwc-list-item value="en">English</mwc-list-item>
            <mwc-list-item value="de">Deutsch</mwc-list-item>
          </ha-select>
        </div>

        <div class="validation-summary">
          ${this._selectedEntity?j`
            <ha-alert alert-type="success">
              Configuration is valid! 🎉
            </ha-alert>
          `:j`
            <ha-alert alert-type="info">
              Please select a TeddyCloud entity to configure the card.
            </ha-alert>
          `}
        </div>
      </div>
    `:j``}static get styles(){return s`
      .card-config {
        padding: 20px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group ha-textfield,
      .form-group ha-select {
        width: 100%;
      }

      .mode-toggle {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .toggle-container {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .toggle-label {
        flex: 1;
      }

      .toggle-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .devices-info {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .entity-config {
        background: var(--card-background-color);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        border: 1px solid var(--divider-color);
      }

      .auto-detected-info,
      .validation-info,
      .device-info {
        margin-top: 16px;
      }

      .auto-detected-info h4,
      .validation-info h4,
      .device-info h4 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
      }

      .entity-validation,
      .device-validation {
        background: var(--code-editor-background-color, #f8f9fa);
        border-radius: 8px;
        padding: 12px;
      }

      .device-info-details {
        margin-bottom: 16px;
        padding: 8px;
        background: var(--card-background-color);
        border-radius: 4px;
        border-left: 4px solid var(--primary-color);
      }

      .device-properties {
        margin-top: 8px;
        font-size: 14px;
      }

      .device-properties div {
        margin-bottom: 4px;
      }

      .entity-status {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 12px;
      }

      .found-entities h5,
      .missing-entities h5 {
        margin: 0 0 8px 0;
        font-size: 14px;
      }

      .found-entities h5 {
        color: var(--success-color, #4caf50);
      }

      .missing-entities h5 {
        color: var(--error-color, #f44336);
      }

      .entity-status ul {
        margin: 0;
        padding-left: 16px;
        font-size: 12px;
      }

      .entity-status li {
        margin-bottom: 4px;
      }

      .entity-status code {
        background: var(--card-background-color);
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        color: var(--primary-text-color);
      }

      .validation-summary {
        margin-top: 20px;
      }

      .no-validation {
        font-style: italic;
        color: var(--secondary-text-color);
      }

      ha-alert {
        margin-bottom: 12px;
      }

      @media (max-width: 600px) {
        .entity-status {
          grid-template-columns: 1fr;
        }
      }
    `}});const pe="0.3.3";console.info(`%c TEDDY-CARD %c v${pe} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class _e extends se{static get properties(){return{hass:{},config:{}}}constructor(){super(),this.config={language:"en",entity_source:"",toniebox_id:"",toniebox_name:""}}updated(e){super.updated(e),e.has("hass")&&this._updateAutoDetectedName()}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{entity_source:"",language:"en"}}setConfig(e){const t={...e};if(t.entity_source){const e=le(t.entity_source);e&&(t.toniebox_id=e)}t.entity_source||t.toniebox_id||console.log("Card needs configuration - please select an entity or enter Toniebox ID"),this.config={language:"en",...t},this._updateAutoDetectedName()}_updateAutoDetectedName(){if(this.hass&&this.config?.entity_source){const e=this.hass.states[this.config.entity_source];if(e&&!this.config.toniebox_name){const t=he(e,this.config.toniebox_id);t!==this.config.toniebox_name&&(this.config={...this.config,toniebox_name:t},this.requestUpdate())}}}getCardSize(){return 7}_getExpectedEntities(){return this.config?.toniebox_id?ue(this.config.toniebox_id):{}}_renderEntityRow(e,t,i=null){const o=this.hass.states[e];return o?j`
      <div class="entity-row" @click=${()=>this._showMoreInfo(e)}>
        ${i?j`<ha-icon icon="${i}" class="state-icon"></ha-icon>`:""}
        <div class="entity-info">
          <span class="entity-name">${t}</span>
          <span class="entity-state">${o.state} ${o.attributes.unit_of_measurement||""}</span>
        </div>
      </div>
    `:j`
        <div class="entity-row unavailable">
          <ha-icon icon="mdi:alert-circle" class="state-icon"></ha-icon>
          <div class="entity-info">
            <span class="entity-name">${t}</span>
            <span class="entity-state unavailable">${ce("errors.entity_not_found",this.config?.language||"en")}</span>
          </div>
        </div>
      `}_renderContentPicture(e,t){if(!e)return j`<div class="picture-placeholder">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">No content loaded</span>
      </div>`;const i=e.attributes?.entity_picture;return i?j`
      <img 
        src="${i}" 
        alt="${ce("title",t)}"
        @error=${this._onImageError}
        @load=${this._onImageLoad}
      />
      <div class="picture-placeholder" style="display: none;">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">Image failed to load</span>
      </div>
    `:j`<div class="picture-placeholder">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">No image available</span>
      </div>`}_onImageError(e){console.warn("Content picture failed to load:",e.target.src),e.target.style.display="none";const t=e.target.nextElementSibling;t&&t.classList.contains("picture-placeholder")&&(t.style.display="flex")}_onImageLoad(e){const t=e.target.nextElementSibling;t&&t.classList.contains("picture-placeholder")&&(t.style.display="none")}_showMoreInfo(e){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:e},this.dispatchEvent(t)}render(){if(!this.config||!this.hass)return j``;const e=this.config?.language||"en",t=this._getExpectedEntities();if(!t||0===Object.keys(t).length)return j`
        <ha-card>
          <div class="card-content error">
            <ha-icon icon="mdi:alert-circle" class="error-icon"></ha-icon>
            <div class="error-message">
              <h3>Configuration Error</h3>
              <p>Missing Toniebox ID. Please configure the card.</p>
            </div>
          </div>
        </ha-card>
      `;const i=this.hass.states[t.contentPicture];return this.hass.states[t.contentTitle],j`
      <ha-card header="${this.config.toniebox_name}">
        <div class="card-content">
          <!-- Picture Section -->
          <div class="picture-section">
            ${this._renderContentPicture(i,e)}
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(t.contentTitle,ce("title",e),"mdi:music")}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(t.tagValid,ce("tag_uid",e),"mdi:tag")}
            ${this._renderEntityRow(t.charger,ce("charging_station",e),"mdi:battery-charging")}
            ${this._renderEntityRow(t.volumeDb,ce("volume_db",e),"mdi:volume-high")}
            ${this._renderEntityRow(t.volumeLevel,ce("volume_level",e),"mdi:volume-medium")}
            ${this._renderEntityRow(t.volumeDown,ce("small_ear_quieter",e),"mdi:ear-hearing-off")}
            ${this._renderEntityRow(t.volumeUp,ce("big_ear_louder",e),"mdi:ear-hearing")}
            ${this._renderEntityRow(t.contentAudioId,ce("content_audio_id",e),"mdi:identifier")}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(t.cacheContent,ce("cache_cloud_content",e),"mdi:cloud-download")}
            ${this._renderEntityRow(t.enableCloud,ce("enable_cloud_operation",e),"mdi:cloud")}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return s`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
      }

      .card-content.error {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        text-align: left;
      }

      .error-icon {
        --mdc-icon-size: 32px;
        color: var(--error-color, #f44336);
      }

      .error-message h3 {
        margin: 0 0 8px 0;
        color: var(--error-color, #f44336);
      }

      .error-message p {
        margin: 0;
        color: var(--secondary-text-color);
      }

      .picture-section {
        text-align: center;
        margin-bottom: 16px;
      }

      .picture-section img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .picture-placeholder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 150px;
        background: var(--divider-color);
        border-radius: 8px;
        color: var(--secondary-text-color);
        gap: 8px;
      }

      .picture-placeholder ha-icon {
        --mdc-icon-size: 48px;
      }

      .placeholder-text {
        font-size: 14px;
        color: var(--secondary-text-color);
        text-align: center;
      }

      .title-section {
        margin-bottom: 16px;
        padding: 8px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .entities-section {
        margin-bottom: 16px;
      }

      .entities-section h3 {
        margin: 0 0 8px 0;
        padding: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }

      .entity-row {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        border: 1px solid var(--divider-color);
        margin-bottom: 4px;
      }

      .entity-row:hover {
        background-color: var(--state-icon-active-color);
      }

      .entity-row.unavailable {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .state-icon {
        margin-right: 12px;
        color: var(--state-icon-color);
        --mdc-icon-size: 20px;
      }

      .entity-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 0;
      }

      .entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .entity-state {
        color: var(--secondary-text-color);
        font-size: 14px;
        text-align: right;
        flex-shrink: 0;
        margin-left: 8px;
      }

      .entity-state.unavailable {
        color: var(--error-color);
        font-style: italic;
      }

      @media (max-width: 600px) {
        .entity-info {
          flex-direction: column;
          align-items: flex-start;
        }

        .entity-state {
          margin-left: 0;
          margin-top: 4px;
          text-align: left;
        }
      }
    `}}customElements.define("teddy-card",_e),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:pe}),console.info("%c TEDDY-CARD %c Card registered successfully","color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #4caf50");export{_e as TeddyCard};
