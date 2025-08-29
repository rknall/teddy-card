/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(o,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,p=g?g.emptyScript:"",m=_.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const s=n.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,n=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,m?.({ReactiveElement:b}),(_.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,T=`<${S}>`,M=document,k=()=>M.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,N=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,W=M.createTreeWalker(M,129);function K(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===U?"!--"===l[1]?r=R:void 0!==l[1]?r=I:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=n??U,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?N:'"'===l[3]?z:H):r===z||r===H?r=N:r===R||r===I?r=U:(r=N,n=void 0);const h=r===N&&t[e+1].startsWith("/>")?" ":"";s+=r===U?i+T:c>=0?(o.push(a),i.slice(0,c)+w+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class F{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=Z(t,e);if(this.el=F.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(w)){const e=c[s++],i=o.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:Q}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],k()),W.nextNode(),a.push({type:2,index:++n});o.append(t[e],k())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){if(e===V)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=D(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);W.currentNode=o;let n=W.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(n=W.nextNode(),s++)}return W.currentNode=M,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),D(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new F(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new Y(this.O(k()),this.O(k()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=G(this,t,e,0),s=!D(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,o[i+r],e,r),a===V&&(a=this._$AH[r]),s||=!D(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class et extends Q{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??B)===V)return;const i=this._$AH,o=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(F,Y),(x.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new Y(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}st._$litElement$=!0,st.finalized=!0,nt.litElementHydrateSupport?.({LitElement:st});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:st}),(nt.litElementVersions??=[]).push("4.2.1");const at={en:{title:"Title",tag_uid:"Tag UID",charging_station:"Charging Station",volume_db:"Volume dB",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",selection_mode:"Configuration Mode",entity_source:"Select Toniebox Entity",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface",selection_mode_description:"Choose how to configure your Toniebox",entity_source_description:"Select any entity from your Toniebox to auto-configure",mode_auto:"Auto-detect from entity",mode_manual:"Manual configuration",no_devices_found:"No TeddyCloud devices found",devices_found:"Found {count} TeddyCloud device(s)",entity_validation:"Entity Validation",entities_missing:"{count} of {total} entities missing",entities_all_found:"All entities found",switch_to_auto:"Switch to auto-detection",switch_to_manual:"Switch to manual setup"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found"}},de:{title:"Titel",tag_uid:"Tag UID",charging_station:"Ladestation",volume_db:"Lautstärke dB",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",selection_mode:"Konfigurationsmodus",entity_source:"Toniebox Entity auswählen",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche",selection_mode_description:"Wählen Sie, wie Sie Ihre Toniebox konfigurieren möchten",entity_source_description:"Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration",mode_auto:"Automatische Erkennung von Entity",mode_manual:"Manuelle Konfiguration",no_devices_found:"Keine TeddyCloud Geräte gefunden",devices_found:"{count} TeddyCloud Gerät(e) gefunden",entity_validation:"Entity Validierung",entities_missing:"{count} von {total} Entities fehlen",entities_all_found:"Alle Entities gefunden",switch_to_auto:"Zur automatischen Erkennung wechseln",switch_to_manual:"Zur manuellen Einrichtung wechseln"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden"}}};function lt(t,e="en",i={}){const o=t.split(".");let n=at[e]||at.en;for(const t of o)n=n?.[t];if(!n)return t;let s=n;return Object.entries(i).forEach(([t,e])=>{s=s.replace(new RegExp(`\\{${t}\\}`,"g"),e)}),s}function ct(t){if(!t||"string"!=typeof t)return null;const e=t.match(/teddycloud_box_([^_]+)_/);return e?e[1]:null}function dt(t){return t&&t.includes("teddycloud_box_")}function ht(t,e){if(!t?.attributes)return`Toniebox ${e}`;const i=t.attributes.friendly_name,o=t.attributes.name,n=t.attributes.device_name;return i?i.replace(/^TeddyCloud Box \w+ /,"").replace(/^Toniebox /,"").replace(/^Box /,"")||`Toniebox ${e}`:n||(o||`Toniebox ${e}`)}function ut(t){return{contentPicture:`image.teddycloud_box_${t}_content_picture`,contentTitle:`sensor.teddycloud_box_${t}_content_title`,tagValid:`sensor.teddycloud_box_${t}_tag_valid`,volumeDb:`sensor.teddycloud_box_${t}_volume_db`,volumeLevel:`sensor.teddycloud_box_${t}_volume_level`,contentAudioId:`sensor.teddycloud_box_${t}_content_audio_id`,charger:`binary_sensor.teddycloud_box_${t}_charger`,volumeDown:`event.teddycloud_box_${t}_volume_down`,volumeUp:`event.teddycloud_box_${t}_volume_up`,cacheContent:"switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server",enableCloud:"switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation"}}function _t(t,e){const i=ct(e);if(!i)throw new Error("Invalid entity selected - cannot extract Toniebox ID");return{entity_source:e,toniebox_id:i,toniebox_name:ht(t.states[e],i),selection_mode:"auto"}}customElements.define("teddy-card-editor",class extends st{static get properties(){return{hass:{},config:{},_availableDevices:{type:Array},_selectedEntity:{type:String}}}setConfig(t){this.config={toniebox_id:"",toniebox_name:"",language:"en",selection_mode:"manual",entity_source:"",...t},this.config.entity_source&&!t.selection_mode&&(this.config.selection_mode="auto"),this._selectedEntity=this.config.entity_source||"",this._updateAvailableDevices()}connectedCallback(){super.connectedCallback(),this._updateAvailableDevices()}updated(t){super.updated(t),t.has("hass")&&this._updateAvailableDevices()}_updateAvailableDevices(){if(this.hass){const t=function(t){const e=new Map;return t?.states?(Object.keys(t.states).forEach(t=>{if(dt(t)){const i=ct(t);i&&(e.has(i)||e.set(i,{id:i,entities:[],name:null,sampleEntity:t}),e.get(i).entities.push(t))}}),e.forEach((e,i)=>{const o=t.states[e.sampleEntity];e.name=ht(o,i)}),e):e}(this.hass);this._availableDevices=Array.from(t.values())}}get _toniebox_id(){return this.config.toniebox_id||""}get _toniebox_name(){return this.config.toniebox_name||""}get _language(){return this.config.language||"en"}get _selection_mode(){return this.config.selection_mode||"manual"}get _entity_source(){return this.config.entity_source||""}_isAutoMode(){return"auto"===this._selection_mode}_onModeToggle(t){const e=t.target.checked?"auto":"manual";if("auto"===e&&this._availableDevices.length>0){const t=this._availableDevices[0].sampleEntity;this._selectedEntity=t;try{const e=_t(this.hass,t);this._updateConfig({...e,selection_mode:"auto",language:this._language})}catch(t){console.warn("Could not auto-configure from entity:",t)}}else"manual"===e&&(this._updateConfig({...this.config,selection_mode:"manual",entity_source:""}),this._selectedEntity="")}_onEntitySelect(t){const e=t.target.value;if(this._selectedEntity=e,e&&this._isAutoMode())try{const t=_t(this.hass,e);this._updateConfig({...t,language:this._language})}catch(t){console.error("Could not create config from entity:",t)}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue,o=e.value;if(this[`_${i}`]===o)return;const n={...this.config};i&&(""===o||void 0===o?delete n[i]:n[i]=o),this._updateConfig(n)}_updateConfig(t){const e=new Event("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_renderModeToggle(){const t=this._availableDevices&&this._availableDevices.length>0;return j`
      <div class="mode-toggle">
        <div class="toggle-container">
          <ha-switch
            .checked=${this._isAutoMode()}
            .disabled=${!t}
            @change=${this._onModeToggle}
          ></ha-switch>
          <div class="toggle-label">
            <strong>${lt("config.selection_mode",this._language)}</strong>
            <div class="toggle-description">
              ${this._isAutoMode()?lt("config.mode_auto",this._language):lt("config.mode_manual",this._language)}
            </div>
          </div>
        </div>
        
        ${t?j`
          <div class="devices-info">
            ${lt("config.devices_found",this._language,{count:this._availableDevices.length})}
          </div>
        `:j`
          <ha-alert alert-type="warning">
            ${lt("config.no_devices_found",this._language)}
          </ha-alert>
        `}
      </div>
    `}_renderAutoModeConfig(){const t=(e=this.hass,e?.states?Object.keys(e.states).filter(t=>dt(t)).map(t=>{const i=e.states[t],o=ct(t);return{value:t,label:`${ht(i,o)} (${i.attributes?.friendly_name||t})`,boxId:o}}).sort((t,e)=>t.label.localeCompare(e.label)):[]);var e;return j`
      <div class="auto-config">
        <div class="form-group">
          <ha-select
            label="${lt("config.entity_source",this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${lt("config.entity_source_description",this._language)}"
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
            <h4>${lt("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderManualModeConfig(){return j`
      <div class="manual-config">
        <div class="form-group">
          <ha-textfield
            label="${lt("config.toniebox_id",this._language)}"
            .value=${this._toniebox_id}
            .configValue=${"toniebox_id"}
            @input=${this._valueChanged}
            required
            helper-text="${lt("config.toniebox_id_description",this._language)}"
          ></ha-textfield>
        </div>

        <div class="form-group">
          <ha-textfield
            label="${lt("config.toniebox_name",this._language)}"
            .value=${this._toniebox_name}
            .configValue=${"toniebox_name"}
            @input=${this._valueChanged}
            required
            helper-text="${lt("config.toniebox_name_description",this._language)}"
          ></ha-textfield>
        </div>

        ${this._toniebox_id?j`
          <div class="validation-info">
            <h4>${lt("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderEntityValidation(){if(!this._toniebox_id)return j`<div class="no-validation">Enter Toniebox ID to validate entities</div>`;const t=function(t,e){const i=ut(e),o=[],n=[];return Object.entries(i).forEach(([e,i])=>{t?.states?.[i]?n.push({key:e,entityId:i}):o.push({key:e,entityId:i})}),{valid:0===o.length,missing:o,available:n,totalExpected:Object.keys(i).length,foundCount:n.length}}(this.hass,this._toniebox_id);return j`
      <div class="entity-validation">
        ${t.valid?j`
          <ha-alert alert-type="success">
            ${lt("config.entities_all_found",this._language)}
          </ha-alert>
        `:j`
          <ha-alert alert-type="warning">
            ${lt("config.entities_missing",this._language,{count:t.missing.length,total:t.totalExpected})}
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
        ${this._renderModeToggle()}
        
        ${this._isAutoMode()?this._renderAutoModeConfig():this._renderManualModeConfig()}

        <div class="form-group">
          <ha-select
            label="${lt("config.language",this._language)}"
            .value=${this._language}
            .configValue=${"language"}
            @selected=${this._valueChanged}
            helper-text="${lt("config.language_description",this._language)}"
          >
            <mwc-list-item value="en">English</mwc-list-item>
            <mwc-list-item value="de">Deutsch</mwc-list-item>
          </ha-select>
        </div>

        <div class="validation-summary">
          ${this._toniebox_id||this._isAutoMode()?"":j`
            <ha-alert alert-type="error">
              ${lt("errors.missing_toniebox_id",this._language)}
            </ha-alert>
          `}
          
          ${this._toniebox_name||this._isAutoMode()?"":j`
            <ha-alert alert-type="error">
              ${lt("errors.missing_toniebox_name",this._language)}
            </ha-alert>
          `}

          ${this._toniebox_id&&this._toniebox_name||this._isAutoMode()?j`
            <ha-alert alert-type="success">
              Configuration is valid! 🎉
            </ha-alert>
          `:""}
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

      .auto-config,
      .manual-config {
        background: var(--card-background-color);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        border: 1px solid var(--divider-color);
      }

      .auto-detected-info,
      .validation-info {
        margin-top: 16px;
      }

      .auto-detected-info h4,
      .validation-info h4 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
      }

      .entity-validation {
        background: var(--code-editor-background-color, #f8f9fa);
        border-radius: 8px;
        padding: 12px;
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
    `}});const gt="1.1.0";console.info(`%c TEDDY-CARD %c v${gt} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class pt extends st{static get properties(){return{hass:{},config:{}}}updated(t){super.updated(t),t.has("hass")&&this._updateAutoDetectedName()}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{toniebox_id:"12345678",toniebox_name:"My Toniebox",language:"en",selection_mode:"manual"}}setConfig(t){const e={...t};if(e.entity_source&&!e.selection_mode&&(e.selection_mode="auto"),e.selection_mode||(e.selection_mode="manual"),"auto"===e.selection_mode&&e.entity_source){const t=ct(e.entity_source);t&&(e.toniebox_id=t)}if("manual"===e.selection_mode){if(!e.toniebox_id)throw new Error(lt("errors.missing_toniebox_id",e.language));if(!e.toniebox_name)throw new Error(lt("errors.missing_toniebox_name",e.language))}else if("auto"===e.selection_mode){if(!e.entity_source)throw new Error("Entity source is required for auto mode");if(!e.toniebox_id)throw new Error("Could not extract Toniebox ID from selected entity")}this.config={language:"en",selection_mode:"manual",...e},this._updateAutoDetectedName()}_updateAutoDetectedName(){if(this.hass&&"auto"===this.config?.selection_mode&&this.config?.entity_source){const t=this.hass.states[this.config.entity_source];if(t&&!this.config.toniebox_name){const e=ht(t,this.config.toniebox_id);e!==this.config.toniebox_name&&(this.config={...this.config,toniebox_name:e},this.requestUpdate())}}}getCardSize(){return 7}_getExpectedEntities(){return this.config?.toniebox_id?ut(this.config.toniebox_id):{}}_renderEntityRow(t,e,i=null){const o=this.hass.states[t];return o?j`
      <div class="entity-row" @click=${()=>this._showMoreInfo(t)}>
        ${i?j`<ha-icon icon="${i}" class="state-icon"></ha-icon>`:""}
        <div class="entity-info">
          <span class="entity-name">${e}</span>
          <span class="entity-state">${o.state} ${o.attributes.unit_of_measurement||""}</span>
        </div>
      </div>
    `:j`
        <div class="entity-row unavailable">
          <ha-icon icon="mdi:alert-circle" class="state-icon"></ha-icon>
          <div class="entity-info">
            <span class="entity-name">${e}</span>
            <span class="entity-state unavailable">${lt("errors.entity_not_found",this.config.language)}</span>
          </div>
        </div>
      `}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}render(){if(!this.config||!this.hass)return j``;const t=this.config.language||"en",e=this._getExpectedEntities();if(!e||0===Object.keys(e).length)return j`
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
            ${i&&i.attributes.entity_picture?j`<img src="${i.attributes.entity_picture}" alt="${lt("title",t)}" />`:j`<div class="picture-placeholder">
                  <ha-icon icon="mdi:teddy-bear"></ha-icon>
                </div>`}
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(e.contentTitle,lt("title",t),"mdi:music")}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(e.tagValid,lt("tag_uid",t),"mdi:tag")}
            ${this._renderEntityRow(e.charger,lt("charging_station",t),"mdi:battery-charging")}
            ${this._renderEntityRow(e.volumeDb,lt("volume_db",t),"mdi:volume-high")}
            ${this._renderEntityRow(e.volumeLevel,lt("volume_level",t),"mdi:volume-medium")}
            ${this._renderEntityRow(e.volumeDown,lt("small_ear_quieter",t),"mdi:ear-hearing-off")}
            ${this._renderEntityRow(e.volumeUp,lt("big_ear_louder",t),"mdi:ear-hearing")}
            ${this._renderEntityRow(e.contentAudioId,lt("content_audio_id",t),"mdi:identifier")}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(e.cacheContent,lt("cache_cloud_content",t),"mdi:cloud-download")}
            ${this._renderEntityRow(e.enableCloud,lt("enable_cloud_operation",t),"mdi:cloud")}
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
        justify-content: center;
        align-items: center;
        height: 150px;
        background: var(--divider-color);
        border-radius: 8px;
        color: var(--secondary-text-color);
      }

      .picture-placeholder ha-icon {
        --mdc-icon-size: 48px;
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
    `}}customElements.define("teddy-card",pt),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:gt}),console.info("%c TEDDY-CARD %c Card registered successfully","color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #4caf50");export{pt as TeddyCard};
