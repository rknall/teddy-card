import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';

export class TeddyCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  setConfig(config) {
    this.config = { 
      toniebox_id: '',
      toniebox_name: '',
      language: 'en',
      ...config 
    };
  }

  get _toniebox_id() {
    return this.config.toniebox_id || '';
  }

  get _toniebox_name() {
    return this.config.toniebox_name || '';
  }

  get _language() {
    return this.config.language || 'en';
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="form-group">
          <ha-textfield
            label="${localize('config.toniebox_id', this._language)}"
            .value=${this._toniebox_id}
            .configValue=${'toniebox_id'}
            @input=${this._valueChanged}
            required
            helper-text="${localize('config.toniebox_id_description', this._language)}"
          ></ha-textfield>
        </div>

        <div class="form-group">
          <ha-textfield
            label="${localize('config.toniebox_name', this._language)}"
            .value=${this._toniebox_name}
            .configValue=${'toniebox_name'}
            @input=${this._valueChanged}
            required
            helper-text="${localize('config.toniebox_name_description', this._language)}"
          ></ha-textfield>
        </div>

        <div class="form-group">
          <ha-select
            label="${localize('config.language', this._language)}"
            .value=${this._language}
            .configValue=${'language'}
            @selected=${this._valueChanged}
            helper-text="${localize('config.language_description', this._language)}"
          >
            <mwc-list-item value="en">English</mwc-list-item>
            <mwc-list-item value="de">Deutsch</mwc-list-item>
          </ha-select>
        </div>

        ${this._toniebox_id ? html`
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
        ` : ''}

        <div class="validation-info">
          ${!this._toniebox_id ? html`
            <ha-alert alert-type="error">
              ${localize('errors.missing_toniebox_id', this._language)}
            </ha-alert>
          ` : ''}
          
          ${!this._toniebox_name ? html`
            <ha-alert alert-type="error">
              ${localize('errors.missing_toniebox_name', this._language)}
            </ha-alert>
          ` : ''}

          ${this._toniebox_id && this._toniebox_name ? html`
            <ha-alert alert-type="success">
              Configuration is valid!
            </ha-alert>
          ` : ''}
        </div>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue;
    const value = target.value;

    if (this[`_${configValue}`] === value) {
      return;
    }

    const newConfig = { ...this.config };
    if (configValue) {
      if (value === '' || value === undefined) {
        delete newConfig[configValue];
      } else {
        newConfig[configValue] = value;
      }
    }

    const messageEvent = new Event('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  static get styles() {
    return css`
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
    `;
  }
}

customElements.define('teddy-card-editor', TeddyCardEditor);