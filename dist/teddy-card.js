/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(o,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:_}=Object,u=globalThis,p=u.trustedTypes,g=p?p.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,s=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??v)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=x.trustedTypes,w=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,T=`<${C}>`,P=document,U=()=>P.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,O="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,M=/>/g,D=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,z=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,W=P.createTreeWalker(P,129);function K(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=k;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===k?"!--"===l[1]?r=N:void 0!==l[1]?r=M:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=s??k,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?z:H):r===z||r===H?r=D:r===N||r===M?r=k:(r=D,s=void 0);const h=r===D&&t[e+1].startsWith("/>")?" ":"";n+=r===k?i+T:d>=0?(o.push(a),i.slice(0,d)+E+i.slice(d)+S+h):i+S+(-2===d?e:h)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,d]=J(t,e);if(this.el=Y.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=d[n++],i=o.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:Q}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],U()),W.nextNode(),a.push({type:2,index:++s});o.append(t[e],U())}}}else if(8===o.nodeType)if(o.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,o){if(e===B)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=R(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,o)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);W.currentNode=o;let s=W.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new G(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new it(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=W.nextNode(),n++)}return W.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new F(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new G(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=Z(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Z(this,o[i+r],e,r),a===B&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class et extends Q{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===B)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(Y,G),(x.litHtmlVersions??=[]).push("3.3.1");const st=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new G(e.insertBefore(U(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,st.litElementHydrateSupport?.({LitElement:nt});const rt=st.litElementPolyfillSupport;rt?.({LitElement:nt}),(st.litElementVersions??=[]).push("4.2.1");const at={en:{title:"Title",tag_uid:"Tag UID",charging_station:"Charging Station",volume_db:"Volume dB",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found"}},de:{title:"Titel",tag_uid:"Tag UID",charging_station:"Ladestation",volume_db:"Lautstärke dB",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden"}}};function lt(t,e="en"){const i=t.split(".");let o=at[e]||at.en;for(const t of i)o=o?.[t];return o||t}customElements.define("teddy-card-editor",class extends nt{static get properties(){return{hass:{},config:{}}}setConfig(t){this.config={toniebox_id:"",toniebox_name:"",language:"en",...t}}get _toniebox_id(){return this.config.toniebox_id||""}get _toniebox_name(){return this.config.toniebox_name||""}get _language(){return this.config.language||"en"}render(){return this.hass?j`
      <div class="card-config">
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

        ${this._toniebox_id?j`
          <div class="entity-preview">
            <h3>Entity Preview</h3>
            <p>The following entities will be used:</p>
            <ul>
              <li><code>image.teddycloud_box_${this._toniebox_id}_content_picture</code></li>
              <li><code>sensor.teddycloud_box_${this._toniebox_id}_content_title</code></li>
              <li><code>sensor.teddycloud_box_${this._toniebox_id}_tag_valid</code></li>
              <li><code>binary_sensor.teddycloud_box_${this._toniebox_id}_charger</code></li>
              <li><code>sensor.teddycloud_box_${this._toniebox_id}_volume_db</code></li>
              <li><code>sensor.teddycloud_box_${this._toniebox_id}_volume_level</code></li>
              <li><code>event.teddycloud_box_${this._toniebox_id}_volume_down</code></li>
              <li><code>event.teddycloud_box_${this._toniebox_id}_volume_up</code></li>
              <li><code>sensor.teddycloud_box_${this._toniebox_id}_content_audio_id</code></li>
              <li><code>switch.teddycloud_server_cloud_cachecontent_cache_cloud_content_on_local_server</code></li>
              <li><code>switch.teddycloud_server_cloud_enabled_generally_enable_cloud_operation</code></li>
            </ul>
          </div>
        `:""}

        <div class="validation-info">
          ${this._toniebox_id?"":j`
            <ha-alert alert-type="error">
              ${lt("errors.missing_toniebox_id",this._language)}
            </ha-alert>
          `}
          
          ${this._toniebox_name?"":j`
            <ha-alert alert-type="error">
              ${lt("errors.missing_toniebox_name",this._language)}
            </ha-alert>
          `}

          ${this._toniebox_id&&this._toniebox_name?j`
            <ha-alert alert-type="success">
              Configuration is valid!
            </ha-alert>
          `:""}
        </div>
      </div>
    `:j``}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue,o=e.value;if(this[`_${i}`]===o)return;const s={...this.config};i&&(""===o||void 0===o?delete s[i]:s[i]=o);const n=new Event("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(n)}static get styles(){return n`
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

      .entity-preview {
        background: var(--code-editor-background-color, #f8f9fa);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 16px;
        margin: 20px 0;
      }

      .entity-preview h3 {
        margin-top: 0;
        color: var(--primary-text-color);
      }

      .entity-preview ul {
        margin: 0;
        padding-left: 20px;
      }

      .entity-preview li {
        margin: 4px 0;
        color: var(--secondary-text-color);
      }

      .entity-preview code {
        background: var(--card-background-color);
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        color: var(--primary-text-color);
      }

      .validation-info {
        margin-top: 20px;
      }

      ha-alert {
        margin-bottom: 10px;
      }
    `}});const dt="1.0.0";console.info(`%c TEDDY-CARD %c v${dt} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class ct extends nt{static get properties(){return{hass:{},config:{}}}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{toniebox_id:"12345678",toniebox_name:"My Toniebox",language:"en"}}setConfig(t){if(!t.toniebox_id)throw new Error(lt("errors.missing_toniebox_id",t.language));if(!t.toniebox_name)throw new Error(lt("errors.missing_toniebox_name",t.language));this.config={language:"en",...t}}getCardSize(){return 7}_getEntityId(t,e=""){return`${t}.teddycloud_box_${this.config.toniebox_id}${e?`_${e}`:""}`}_getServerEntityId(t){return`switch.teddycloud_server_${t}`}_renderEntityRow(t,e,i=null){const o=this.hass.states[t];return o?j`
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
      `}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}render(){if(!this.config||!this.hass)return j``;const t=this.config.language||"en",e=this._getEntityId("image","content_picture"),i=this._getEntityId("sensor","content_title"),o=this._getEntityId("sensor","tag_valid"),s=this._getEntityId("binary_sensor","charger"),n=this._getEntityId("sensor","volume_db"),r=this._getEntityId("sensor","volume_level"),a=this._getEntityId("event","volume_down"),l=this._getEntityId("event","volume_up"),d=this._getEntityId("sensor","content_audio_id"),c=this._getServerEntityId("cloud_cachecontent_cache_cloud_content_on_local_server"),h=this._getServerEntityId("cloud_enabled_generally_enable_cloud_operation"),_=this.hass.states[e];return this.hass.states[i],j`
      <ha-card header="${this.config.toniebox_name}">
        <div class="card-content">
          <!-- Picture Section -->
          <div class="picture-section">
            ${_&&_.attributes.entity_picture?j`<img src="${_.attributes.entity_picture}" alt="${lt("title",t)}" />`:j`<div class="picture-placeholder">
                  <ha-icon icon="mdi:teddy-bear"></ha-icon>
                </div>`}
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(i,lt("title",t),"mdi:music")}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(o,lt("tag_uid",t),"mdi:tag")}
            ${this._renderEntityRow(s,lt("charging_station",t),"mdi:battery-charging")}
            ${this._renderEntityRow(n,lt("volume_db",t),"mdi:volume-high")}
            ${this._renderEntityRow(r,lt("volume_level",t),"mdi:volume-medium")}
            ${this._renderEntityRow(a,lt("small_ear_quieter",t),"mdi:ear-hearing-off")}
            ${this._renderEntityRow(l,lt("big_ear_louder",t),"mdi:ear-hearing")}
            ${this._renderEntityRow(d,lt("content_audio_id",t),"mdi:identifier")}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(c,lt("cache_cloud_content",t),"mdi:cloud-download")}
            ${this._renderEntityRow(h,lt("enable_cloud_operation",t),"mdi:cloud")}
          </div>
        </div>
      </ha-card>
    `}static get styles(){return n`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-content {
        padding: 0;
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
    `}}customElements.define("teddy-card",ct),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:dt}),console.info("%c TEDDY-CARD %c Card registered successfully","color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #4caf50");export{ct as TeddyCard};
