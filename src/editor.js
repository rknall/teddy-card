import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';
import { 
  findTeddyCloudDevices, 
  getSuggestedEntities, 
  createConfigFromEntity,
  validateTonieboxEntities,
  extractBoxIdFromEntity
} from './utils.js';

export class TeddyCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _availableDevices: { type: Array },
      _selectedEntity: { type: String }
    };
  }

  setConfig(config) {
    // Set defaults for simplified entity-based configuration
    this.config = { 
      toniebox_id: '',
      toniebox_name: '',
      language: 'en',
      entity_source: '',
      ...config 
    };
    
    this._selectedEntity = this.config.entity_source || '';
    this._updateAvailableDevices();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateAvailableDevices();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    
    if (changedProperties.has('hass')) {
      this._updateAvailableDevices();
    }
  }

  _updateAvailableDevices() {
    if (this.hass) {
      // Entity-based devices (from entity discovery)
      const devices = findTeddyCloudDevices(this.hass);
      this._availableDevices = Array.from(devices.values());
    }
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

  get _entity_source() {
    return this.config.entity_source || '';
  }


  _onEntitySelect(ev) {
    const entityId = ev.target.value;
    this._selectedEntity = entityId;
    
    if (entityId && this.hass) {
      try {
        const autoConfig = createConfigFromEntity(this.hass, entityId);
        if (autoConfig) {
          // Ensure we have a valid base config to spread from
          const baseConfig = this.config || { language: 'en' };
          const newConfig = {
            ...baseConfig,
            ...autoConfig,
            language: this._language
          };
          this._updateConfig(newConfig);
        }
      } catch (error) {
        console.error('Could not create config from entity:', error);
      }
    }
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

    this._updateConfig(newConfig);
  }

  _updateConfig(newConfig) {
    if (!newConfig || typeof newConfig !== 'object') {
      console.error('Cannot update with invalid config:', newConfig);
      return;
    }
    
    // Ensure the config has required properties
    const validatedConfig = {
      language: 'en',
      ...newConfig
    };
    
    const messageEvent = new Event('config-changed', {
      detail: { config: validatedConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }


  _renderEntityConfig() {
    const suggestedEntities = getSuggestedEntities(this.hass);
    
    return html`
      <div class="entity-config">
        <div class="form-group">
          <ha-select
            label="${localize('config.entity_source', this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${localize('config.entity_source_description', this._language)}"
          >
            <mwc-list-item value="">-- Select Entity --</mwc-list-item>
            ${suggestedEntities.map(entity => html`
              <mwc-list-item value="${entity.value}">
                ${entity.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedEntity ? html`
          <div class="auto-detected-info">
            <h4>${localize('config.entity_validation', this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        ` : ''}
      </div>
    `;
  }



  _renderEntityValidation() {
    if (!this._toniebox_id) {
      return html`<div class="no-validation">Enter Toniebox ID to validate entities</div>`;
    }

    const validation = validateTonieboxEntities(this.hass, this._toniebox_id);
    
    return html`
      <div class="entity-validation">
        ${validation.valid ? html`
          <ha-alert alert-type="success">
            ${localize('config.entities_all_found', this._language)}
          </ha-alert>
        ` : html`
          <ha-alert alert-type="warning">
            ${localize('config.entities_missing', this._language, {
              count: validation.missing.length,
              total: validation.totalExpected
            })}
          </ha-alert>
        `}
        
        <div class="entity-status">
          <div class="found-entities">
            <h5>✅ Available (${validation.foundCount})</h5>
            <ul>
              ${validation.available.map(entity => html`
                <li><code>${entity.entityId}</code></li>
              `)}
            </ul>
          </div>
          
          ${validation.missing.length > 0 ? html`
            <div class="missing-entities">
              <h5>❌ Missing (${validation.missing.length})</h5>
              <ul>
                ${validation.missing.map(entity => html`
                  <li><code>${entity.entityId}</code></li>
                `)}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }


  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        ${this._renderEntityConfig()}

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

        <div class="validation-summary">
          ${!this._selectedEntity ? html`
            <ha-alert alert-type="info">
              Please select a TeddyCloud entity to configure the card.
            </ha-alert>
          ` : html`
            <ha-alert alert-type="success">
              Configuration is valid! 🎉
            </ha-alert>
          `}
        </div>
      </div>
    `;
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
    `;
  }
}

customElements.define('teddy-card-editor', TeddyCardEditor);