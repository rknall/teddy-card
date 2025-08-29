/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(n,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,g=_?_.emptyScript:"",f=p.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const s=o.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const n=this.constructor,o=this[t];if(i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,T=`<${S}>`,k=document,D=()=>k.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,M=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,G=k.createTreeWalker(k,129);function W(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===R?"!--"===c[1]?r=U:void 0!==c[1]?r=N:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=M):void 0!==c[3]&&(r=M):r===M?">"===c[0]?(r=o??R,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?M:'"'===c[3]?z:H):r===z||r===H?r=M:r===U||r===N?r=R:(r=M,o=void 0);const h=r===M&&t[e+1].startsWith("/>")?" ":"";s+=r===R?i+T:l>=0?(n.push(a),i.slice(0,l)+w+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[W(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Z.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=G.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(w)){const e=l[s++],i=n.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:Q}),n.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),n.removeAttribute(t));if(L.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],D()),G.nextNode(),a.push({type:2,index:++o});n.append(t[e],D())}}}else if(8===n.nodeType)if(n.data===S)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,n){if(e===V)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=P(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=F(t,o._$AS(t,e.values),o,n)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??k).importNode(e,!0);G.currentNode=n;let o=G.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(o=G.nextNode(),s++)}return G.currentNode=k,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),P(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new J(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new Y(this.O(D()),this.O(D()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=F(this,t,e,0),s=!P(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const n=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=F(this,n[i+r],e,r),a===V&&(a=this._$AH[r]),s||=!P(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!n&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class et extends Q{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??B)===V)return;const i=this._$AH,n=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new Y(e.insertBefore(D(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}st._$litElement$=!0,st.finalized=!0,ot.litElementHydrateSupport?.({LitElement:st});const rt=ot.litElementPolyfillSupport;rt?.({LitElement:st}),(ot.litElementVersions??=[]).push("4.2.1");const at={en:{title:"Title",tag_uid:"Tag UID",charging_station:"Charging Station",volume_db:"Volume dB",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",selection_mode:"Configuration Mode",entity_source:"Select Toniebox Entity",device_source:"Select Toniebox Device",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface",selection_mode_description:"Choose how to configure your Toniebox",entity_source_description:"Select any entity from your Toniebox to auto-configure",device_source_description:"Select your Toniebox device directly from Home Assistant registry",mode_auto:"Auto-detect from entity",mode_manual:"Manual configuration",mode_device:"Device-based selection",no_devices_found:"No TeddyCloud devices found",no_ha_devices_found:"No TeddyCloud devices found in Home Assistant registry",devices_found:"Found {count} TeddyCloud device(s)",ha_devices_found:"Found {count} Toniebox device(s) in registry",entity_validation:"Entity Validation",device_validation:"Device Validation",entities_missing:"{count} of {total} entities missing",entities_all_found:"All entities found",device_valid:"Device configuration valid",device_invalid:"Device configuration invalid",switch_to_auto:"Switch to auto-detection",switch_to_manual:"Switch to manual setup",switch_to_device:"Switch to device selection"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found"}},de:{title:"Titel",tag_uid:"Tag UID",charging_station:"Ladestation",volume_db:"Lautstärke dB",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",selection_mode:"Konfigurationsmodus",entity_source:"Toniebox Entity auswählen",device_source:"Toniebox Gerät auswählen",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche",selection_mode_description:"Wählen Sie, wie Sie Ihre Toniebox konfigurieren möchten",entity_source_description:"Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration",device_source_description:"Wählen Sie Ihr Toniebox-Gerät direkt aus der Home Assistant Registrierung",mode_auto:"Automatische Erkennung von Entity",mode_manual:"Manuelle Konfiguration",mode_device:"Gerätebasierte Auswahl",no_devices_found:"Keine TeddyCloud Geräte gefunden",no_ha_devices_found:"Keine TeddyCloud Geräte in Home Assistant Registrierung gefunden",devices_found:"{count} TeddyCloud Gerät(e) gefunden",ha_devices_found:"{count} Toniebox-Gerät(e) in Registrierung gefunden",entity_validation:"Entity Validierung",device_validation:"Geräte Validierung",entities_missing:"{count} von {total} Entities fehlen",entities_all_found:"Alle Entities gefunden",device_valid:"Geräte-Konfiguration gültig",device_invalid:"Geräte-Konfiguration ungültig",switch_to_auto:"Zur automatischen Erkennung wechseln",switch_to_manual:"Zur manuellen Einrichtung wechseln",switch_to_device:"Zur Geräteauswahl wechseln"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden"}}};function ct(t,e="en",i={}){const n=t.split(".");let o=at[e]||at.en;for(const t of n)o=o?.[t];if(!o)return t;let s=o;return Object.entries(i).forEach(([t,e])=>{s=s.replace(new RegExp(`\\{${t}\\}`,"g"),e)}),s}function lt(t){if(!t||"string"!=typeof t)return null;const e=t.match(/teddycloud_box_([^_]+)_/);return e?e[1]:null}function dt(t){return t&&t.includes("teddycloud_box_")}function ht(t,e){if(!t?.attributes)return`Toniebox ${e}`;const i=t.attributes.friendly_name,n=t.attributes.name,o=t.attributes.device_name;return i?i.replace(/^TeddyCloud Box \w+ /,"").replace(/^Toniebox /,"").replace(/^Box /,"")||`Toniebox ${e}`:o||(n||`Toniebox ${e}`)}function ut(t){return{contentPicture:`image.teddycloud_box_${t}_content_picture`,contentTitle:`sensor.teddycloud_box_${t}_content_title`,tagValid:`sensor.teddycloud_box_${t}_tag_valid`,volumeDb:`sensor.teddycloud_box_${t}_volume_db`,volumeLevel:`sensor.teddycloud_box_${t}_volume_level`,contentAudioId:`sensor.teddycloud_box_${t}_content_audio_id`,charger:`binary_sensor.teddycloud_box_${t}_charger`,volumeDown:`event.teddycloud_box_${t}_volume_down`,volumeUp:`event.teddycloud_box_${t}_volume_up`,cacheContent:"switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server",enableCloud:"switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation"}}customElements.define("teddy-card-editor",class extends st{static get properties(){return{hass:{},config:{},_availableDevices:{type:Array},_selectedEntity:{type:String}}}setConfig(t){this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",...t},this._selectedEntity=this.config.entity_source||"",this._updateAvailableDevices()}connectedCallback(){super.connectedCallback(),this._updateAvailableDevices()}updated(t){super.updated(t),t.has("hass")&&this._updateAvailableDevices()}_updateAvailableDevices(){if(this.hass){const t=function(t){const e=new Map;return t?.states?(Object.keys(t.states).forEach(t=>{if(dt(t)){const i=lt(t);i&&(e.has(i)||e.set(i,{id:i,entities:[],name:null,sampleEntity:t}),e.get(i).entities.push(t))}}),e.forEach((e,i)=>{const n=t.states[e.sampleEntity];e.name=ht(n,i)}),e):e}(this.hass);this._availableDevices=Array.from(t.values())}}get _toniebox_id(){return this.config.toniebox_id||""}get _toniebox_name(){return this.config.toniebox_name||""}get _language(){return this.config.language||"en"}get _entity_source(){return this.config.entity_source||""}_onEntitySelect(t){const e=t.target.value;if(this._selectedEntity=e,e&&this.hass)try{const t=function(t,e){const i=lt(e);if(!i)throw new Error("Invalid entity selected - cannot extract Toniebox ID");return{entity_source:e,toniebox_id:i,toniebox_name:ht(t.states[e],i)}}(this.hass,e);if(t){const e={...this.config||{language:"en"},...t,language:this._language};this._updateConfig(e)}}catch(t){console.error("Could not create config from entity:",t)}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue,n=e.value;if(this[`_${i}`]===n)return;const o={...this.config};i&&(""===n||void 0===n?delete o[i]:o[i]=n),this._updateConfig(o)}_updateConfig(t){if(!t||"object"!=typeof t)return void console.error("Cannot update with invalid config:",t);const e={language:"en",...t},i=new Event("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(i)}_renderEntityConfig(){const t=(e=this.hass,e?.states?Object.keys(e.states).filter(t=>dt(t)).map(t=>{const i=e.states[t],n=lt(t);return{value:t,label:`${ht(i,n)} (${i.attributes?.friendly_name||t})`,boxId:n}}).sort((t,e)=>t.label.localeCompare(e.label)):[]);var e;return j`
      <div class="entity-config">
        <div class="form-group">
          <ha-select
            label="${ct("config.entity_source",this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${ct("config.entity_source_description",this._language)}"
          >
            <mwc-list-item value="">-- Select Entity --</mwc-list-item>
            ${t.map(t=>j`
              <mwc-list-item value="${t.value}">
                ${t.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedEntity?j`
          <div class="auto-detected-info">
            <h4>${ct("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderEntityValidation(){if(!this._toniebox_id)return j`<div class="no-validation">Enter Toniebox ID to validate entities</div>`;const t=function(t,e){const i=ut(e),n=[],o=[];return Object.entries(i).forEach(([e,i])=>{t?.states?.[i]?o.push({key:e,entityId:i}):n.push({key:e,entityId:i})}),{valid:0===n.length,missing:n,available:o,totalExpected:Object.keys(i).length,foundCount:o.length}}(this.hass,this._toniebox_id);return j`
      <div class="entity-validation">
        ${t.valid?j`
          <ha-alert alert-type="success">
            ${ct("config.entities_all_found",this._language)}
          </ha-alert>
        `:j`
          <ha-alert alert-type="warning">
            ${ct("config.entities_missing",this._language,{count:t.missing.length,total:t.totalExpected})}
          </ha-alert>
        `}
        
        <div class="entity-status">
          <div class="found-entities">
            <h5>✅ Available (${t.foundCount})</h5>
            <ul>
              ${t.available.map(t=>j`
                <li><code>${t.entityId}</code></li>
              `)}
            </ul>
          </div>
          
          ${t.missing.length>0?j`
            <div class="missing-entities">
              <h5>❌ Missing (${t.missing.length})</h5>
              <ul>
                ${t.missing.map(t=>j`
                  <li><code>${t.entityId}</code></li>
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
            label="${ct("config.language",this._language)}"
            .value=${this._language}
            .configValue=${"language"}
            @selected=${this._valueChanged}
            helper-text="${ct("config.language_description",this._language)}"
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
    `}});const pt="0.3.2";console.info(`%c TEDDY-CARD %c v${pt} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class _t extends st{static get properties(){return{hass:{},config:{}}}updated(t){super.updated(t),t.has("hass")&&this._updateAutoDetectedName()}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{entity_source:"",language:"en"}}setConfig(t){const e={...t};if(e.entity_source){const t=lt(e.entity_source);t&&(e.toniebox_id=t)}e.entity_source||e.toniebox_id||console.log("Card needs configuration - please select an entity or enter Toniebox ID"),this.config={language:"en",...e},this._updateAutoDetectedName()}_updateAutoDetectedName(){if(this.hass&&this.config?.entity_source){const t=this.hass.states[this.config.entity_source];if(t&&!this.config.toniebox_name){const e=ht(t,this.config.toniebox_id);e!==this.config.toniebox_name&&(this.config={...this.config,toniebox_name:e},this.requestUpdate())}}}getCardSize(){return 7}_getExpectedEntities(){return this.config?.toniebox_id?ut(this.config.toniebox_id):{}}_renderEntityRow(t,e,i=null){const n=this.hass.states[t];return n?j`
      <div class="entity-row" @click=${()=>this._showMoreInfo(t)}>
        ${i?j`<ha-icon icon="${i}" class="state-icon"></ha-icon>`:""}
        <div class="entity-info">
          <span class="entity-name">${e}</span>
          <span class="entity-state">${n.state} ${n.attributes.unit_of_measurement||""}</span>
        </div>
      </div>
    `:j`
        <div class="entity-row unavailable">
          <ha-icon icon="mdi:alert-circle" class="state-icon"></ha-icon>
          <div class="entity-info">
            <span class="entity-name">${e}</span>
            <span class="entity-state unavailable">${ct("errors.entity_not_found",this.config.language)}</span>
          </div>
        </div>
      `}_renderContentPicture(t,e){if(!t)return j`<div class="picture-placeholder">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">No content loaded</span>
      </div>`;const i=t.attributes?.entity_picture;return i?j`
      <img 
        src="${i}" 
        alt="${ct("title",e)}"
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
      </div>`}_onImageError(t){console.warn("Content picture failed to load:",t.target.src),t.target.style.display="none";const e=t.target.nextElementSibling;e&&e.classList.contains("picture-placeholder")&&(e.style.display="flex")}_onImageLoad(t){const e=t.target.nextElementSibling;e&&e.classList.contains("picture-placeholder")&&(e.style.display="none")}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}render(){if(!this.config||!this.hass)return j``;const t=this.config.language||"en",e=this._getExpectedEntities();if(!e||0===Object.keys(e).length)return j`
        <ha-card>
          <div class="card-content error">
            <ha-icon icon="mdi:alert-circle" class="error-icon"></ha-icon>
            <div class="error-message">
              <h3>Configuration Error</h3>
              <p>Missing Toniebox ID. Please configure the card.</p>
            </div>
          </div>
        </ha-card>
      `;const i=this.hass.states[e.contentPicture];return this.hass.states[e.contentTitle],j`
      <ha-card header="${this.config.toniebox_name}">
        <div class="card-content">
          <!-- Picture Section -->
          <div class="picture-section">
            ${this._renderContentPicture(i,t)}
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(e.contentTitle,ct("title",t),"mdi:music")}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(e.tagValid,ct("tag_uid",t),"mdi:tag")}
            ${this._renderEntityRow(e.charger,ct("charging_station",t),"mdi:battery-charging")}
            ${this._renderEntityRow(e.volumeDb,ct("volume_db",t),"mdi:volume-high")}
            ${this._renderEntityRow(e.volumeLevel,ct("volume_level",t),"mdi:volume-medium")}
            ${this._renderEntityRow(e.volumeDown,ct("small_ear_quieter",t),"mdi:ear-hearing-off")}
            ${this._renderEntityRow(e.volumeUp,ct("big_ear_louder",t),"mdi:ear-hearing")}
            ${this._renderEntityRow(e.contentAudioId,ct("content_audio_id",t),"mdi:identifier")}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(e.cacheContent,ct("cache_cloud_content",t),"mdi:cloud-download")}
            ${this._renderEntityRow(e.enableCloud,ct("enable_cloud_operation",t),"mdi:cloud")}
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
    `}}customElements.define("teddy-card",_t),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:pt}),console.info("%c TEDDY-CARD %c Card registered successfully","color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #4caf50");export{_t as TeddyCard};
