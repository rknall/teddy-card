import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';
import { 
  findTeddyCloudDevices, 
  getSuggestedEntities, 
  createConfigFromEntity,
  validateTonieboxEntities,
  extractBoxIdFromEntity,
  getSuggestedDevices,
  createConfigFromDevice,
  validateDeviceConfiguration,
  findTeddyCloudHADevices
} from './utils.js';

export class TeddyCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _availableDevices: { type: Array },
      _availableHADevices: { type: Array },
      _selectedEntity: { type: String },
      _selectedDevice: { type: String }
    };
  }

  setConfig(config) {
    // Set defaults and ensure backward compatibility
    this.config = { 
      toniebox_id: '',
      toniebox_name: '',
      language: 'en',
      selection_mode: 'manual', // Default to manual for backward compatibility
      entity_source: '',
      device_source: '',
      ...config 
    };
    
    // Auto-detect if we have entity_source but no selection_mode
    if (this.config.entity_source && !config.selection_mode) {
      this.config.selection_mode = 'auto';
    }
    
    // Auto-detect if we have device_source but no selection_mode  
    if (this.config.device_source && !config.selection_mode) {
      this.config.selection_mode = 'device';
    }
    
    this._selectedEntity = this.config.entity_source || '';
    this._selectedDevice = this.config.device_source || '';
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
      
      // HA device registry devices (for device mode)
      this._availableHADevices = findTeddyCloudHADevices(this.hass);
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

  get _selection_mode() {
    return this.config.selection_mode || 'manual';
  }

  get _entity_source() {
    return this.config.entity_source || '';
  }

  get _device_source() {
    return this.config.device_source || '';
  }

  _isAutoMode() {
    return this._selection_mode === 'auto';
  }

  _isDeviceMode() {
    return this._selection_mode === 'device';
  }

  _isManualMode() {
    return this._selection_mode === 'manual';
  }

  _onModeChange(ev) {
    const newMode = ev.target.value;
    
    if (newMode === 'auto' && this._availableDevices.length > 0) {
      // Auto-select first available device if switching to auto mode
      const firstDevice = this._availableDevices[0];
      const firstEntity = firstDevice.sampleEntity;
      this._selectedEntity = firstEntity;
      
      try {
        const autoConfig = createConfigFromEntity(this.hass, firstEntity);
        this._updateConfig({
          ...autoConfig,
          selection_mode: 'auto',
          language: this._language
        });
      } catch (error) {
        console.warn('Could not auto-configure from entity:', error);
      }
    } else if (newMode === 'device' && this._availableHADevices.length > 0) {
      // Auto-select first available HA device if switching to device mode
      const firstDevice = this._availableHADevices[0];
      this._selectedDevice = firstDevice.device_id;
      
      try {
        const deviceConfig = createConfigFromDevice(this.hass, firstDevice.device_id);
        this._updateConfig({
          ...deviceConfig,
          language: this._language
        });
      } catch (error) {
        console.warn('Could not auto-configure from device:', error);
      }
    } else if (newMode === 'manual') {
      this._updateConfig({
        ...this.config,
        selection_mode: 'manual',
        entity_source: '',
        device_source: ''
      });
      this._selectedEntity = '';
      this._selectedDevice = '';
    }
  }

  _onEntitySelect(ev) {
    const entityId = ev.target.value;
    this._selectedEntity = entityId;
    
    if (entityId && this._isAutoMode()) {
      try {
        const autoConfig = createConfigFromEntity(this.hass, entityId);
        this._updateConfig({
          ...autoConfig,
          language: this._language
        });
      } catch (error) {
        console.error('Could not create config from entity:', error);
      }
    }
  }

  _onDeviceSelect(ev) {
    const deviceId = ev.target.value;
    this._selectedDevice = deviceId;
    
    if (deviceId && this._isDeviceMode()) {
      try {
        const deviceConfig = createConfigFromDevice(this.hass, deviceId);
        this._updateConfig({
          ...deviceConfig,
          language: this._language
        });
      } catch (error) {
        console.error('Could not create config from device:', error);
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
    const messageEvent = new Event('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  _renderModeToggle() {
    const hasEntityDevices = this._availableDevices && this._availableDevices.length > 0;
    const hasHADevices = this._availableHADevices && this._availableHADevices.length > 0;
    
    return html`
      <div class="mode-toggle">
        <div class="form-group">
          <ha-select
            label="${localize('config.selection_mode', this._language)}"
            .value=${this._selection_mode}
            @selected=${this._onModeChange}
            helper-text="${localize('config.selection_mode_description', this._language)}"
          >
            <mwc-list-item value="manual">${localize('config.mode_manual', this._language)}</mwc-list-item>
            <mwc-list-item value="auto" .disabled=${!hasEntityDevices}>
              ${localize('config.mode_auto', this._language)}
            </mwc-list-item>
            <mwc-list-item value="device" .disabled=${!hasHADevices}>
              ${localize('config.mode_device', this._language)}
            </mwc-list-item>
          </ha-select>
        </div>
        
        <div class="device-status">
          ${!hasEntityDevices && !hasHADevices ? html`
            <ha-alert alert-type="warning">
              ${localize('config.no_devices_found', this._language)} & ${localize('config.no_ha_devices_found', this._language)}
            </ha-alert>
          ` : html`
            <div class="devices-info">
              ${hasEntityDevices ? html`
                <div>📊 ${localize('config.devices_found', this._language, { 
                  count: this._availableDevices.length 
                })}</div>
              ` : ''}
              ${hasHADevices ? html`
                <div>🔧 ${localize('config.ha_devices_found', this._language, { 
                  count: this._availableHADevices.length 
                })}</div>
              ` : ''}
            </div>
          `}
        </div>
      </div>
    `;
  }

  _renderAutoModeConfig() {
    const suggestedEntities = getSuggestedEntities(this.hass);
    
    return html`
      <div class="auto-config">
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

  _renderDeviceModeConfig() {
    const suggestedDevices = getSuggestedDevices(this.hass);
    
    return html`
      <div class="device-config">
        <div class="form-group">
          <ha-select
            label="${localize('config.device_source', this._language)}"
            .value=${this._selectedDevice}
            @selected=${this._onDeviceSelect}
            helper-text="${localize('config.device_source_description', this._language)}"
          >
            <mwc-list-item value="">-- Select Device --</mwc-list-item>
            ${suggestedDevices.map(device => html`
              <mwc-list-item value="${device.value}">
                ${device.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedDevice ? html`
          <div class="device-info">
            <h4>${localize('config.device_validation', this._language)}</h4>
            ${this._renderDeviceValidation()}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderManualModeConfig() {
    return html`
      <div class="manual-config">
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

        ${this._toniebox_id ? html`
          <div class="validation-info">
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

  _renderDeviceValidation() {
    if (!this._selectedDevice) {
      return html`<div class="no-validation">Select device to validate configuration</div>`;
    }

    const validation = validateDeviceConfiguration(this.hass, this._selectedDevice);
    
    return html`
      <div class="device-validation">
        ${validation.valid ? html`
          <ha-alert alert-type="success">
            ${localize('config.device_valid', this._language)}
          </ha-alert>
        ` : html`
          <ha-alert alert-type="warning">
            ${localize('config.device_invalid', this._language)} - ${localize('config.entities_missing', this._language, {
              count: validation.missing.length,
              total: validation.totalExpected
            })}
          </ha-alert>
        `}
        
        <div class="device-info-details">
          <h5>🔧 Device: ${validation.device?.name}</h5>
          <div class="device-properties">
            <div><strong>ID:</strong> ${validation.device?.id}</div>
            <div><strong>Model:</strong> ${validation.device?.model}</div>
            <div><strong>Manufacturer:</strong> ${validation.device?.manufacturer}</div>
          </div>
        </div>
        
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
        ${this._renderModeToggle()}
        
        ${this._isAutoMode() 
          ? this._renderAutoModeConfig() 
          : this._isDeviceMode()
            ? this._renderDeviceModeConfig()
            : this._renderManualModeConfig()
        }

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
          ${(!this._toniebox_id && this._isManualMode()) ? html`
            <ha-alert alert-type="error">
              ${localize('errors.missing_toniebox_id', this._language)}
            </ha-alert>
          ` : ''}
          
          ${(!this._toniebox_name && this._isManualMode()) ? html`
            <ha-alert alert-type="error">
              ${localize('errors.missing_toniebox_name', this._language)}
            </ha-alert>
          ` : ''}

          ${(this._toniebox_id && this._toniebox_name) || !this._isManualMode() ? html`
            <ha-alert alert-type="success">
              Configuration is valid! 🎉
            </ha-alert>
          ` : ''}
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

      .auto-config,
      .manual-config,
      .device-config {
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