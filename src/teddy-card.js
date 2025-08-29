import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';
import { validateTonieboxEntities, extractBoxIdFromEntity, getExpectedEntities, extractDeviceName } from './utils.js';
import './editor.js';

const CARD_VERSION = '0.3.2';

console.info(
  `%c TEDDY-CARD %c v${CARD_VERSION} `,
  'color: white; font-weight: bold; background: #03a9f4',
  'color: white; font-weight: bold; background: #606060'
);

export class TeddyCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }
  
  constructor() {
    super();
    // Ensure config is always defined with defaults
    this.config = {
      language: 'en',
      entity_source: '',
      toniebox_id: '',
      toniebox_name: ''
    };
  }
  
  updated(changedProperties) {
    super.updated(changedProperties);
    
    // Update auto-detected name when hass changes
    if (changedProperties.has('hass')) {
      this._updateAutoDetectedName();
    }
  }

  static getConfigElement() {
    return document.createElement('teddy-card-editor');
  }

  static getStubConfig() {
    return {
      entity_source: '',
      language: 'en'
    };
  }

  setConfig(config) {
    // Handle backward compatibility and entity-based configuration
    const normalizedConfig = { ...config };
    
    // Extract IDs from entity_source if provided
    if (normalizedConfig.entity_source) {
      const boxId = extractBoxIdFromEntity(normalizedConfig.entity_source);
      if (boxId) {
        normalizedConfig.toniebox_id = boxId;
        // Name will be set when hass is available
      }
    }
    
    // Basic validation - require either entity_source or manual toniebox_id
    if (!normalizedConfig.entity_source && !normalizedConfig.toniebox_id) {
      console.log('Card needs configuration - please select an entity or enter Toniebox ID');
    }
    
    this.config = {
      language: 'en',
      ...normalizedConfig
    };
    
    // Update name from entity if available
    this._updateAutoDetectedName();
  }
  
  _updateAutoDetectedName() {
    if (this.hass && this.config?.entity_source) {
      const entity = this.hass.states[this.config.entity_source];
      if (entity && !this.config.toniebox_name) {
        const name = extractDeviceName(entity, this.config.toniebox_id);
        if (name !== this.config.toniebox_name) {
          this.config = { ...this.config, toniebox_name: name };
          this.requestUpdate();
        }
      }
    }
  }
  

  getCardSize() {
    return 7;
  }

  _getExpectedEntities() {
    if (!this.config?.toniebox_id) {
      return {};
    }
    return getExpectedEntities(this.config.toniebox_id);
  }

  _renderEntityRow(entityId, name, icon = null) {
    const entity = this.hass.states[entityId];
    if (!entity) {
      return html`
        <div class="entity-row unavailable">
          <ha-icon icon="mdi:alert-circle" class="state-icon"></ha-icon>
          <div class="entity-info">
            <span class="entity-name">${name}</span>
            <span class="entity-state unavailable">${localize('errors.entity_not_found', this.config?.language || 'en')}</span>
          </div>
        </div>
      `;
    }

    return html`
      <div class="entity-row" @click=${() => this._showMoreInfo(entityId)}>
        ${icon ? html`<ha-icon icon="${icon}" class="state-icon"></ha-icon>` : ''}
        <div class="entity-info">
          <span class="entity-name">${name}</span>
          <span class="entity-state">${entity.state} ${entity.attributes.unit_of_measurement || ''}</span>
        </div>
      </div>
    `;
  }

  _renderContentPicture(contentPictureEntity, lang) {
    if (!contentPictureEntity) {
      return html`<div class="picture-placeholder">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">No content loaded</span>
      </div>`;
    }

    // Check if we have a valid image URL
    const imageUrl = contentPictureEntity.attributes?.entity_picture;
    if (!imageUrl) {
      return html`<div class="picture-placeholder">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">No image available</span>
      </div>`;
    }

    // Return image with error handling
    return html`
      <img 
        src="${imageUrl}" 
        alt="${localize('title', lang)}"
        @error=${this._onImageError}
        @load=${this._onImageLoad}
      />
      <div class="picture-placeholder" style="display: none;">
        <ha-icon icon="mdi:teddy-bear"></ha-icon>
        <span class="placeholder-text">Image failed to load</span>
      </div>
    `;
  }

  _onImageError(ev) {
    console.warn('Content picture failed to load:', ev.target.src);
    // Hide the failed image and show placeholder
    ev.target.style.display = 'none';
    const placeholder = ev.target.nextElementSibling;
    if (placeholder && placeholder.classList.contains('picture-placeholder')) {
      placeholder.style.display = 'flex';
    }
  }

  _onImageLoad(ev) {
    // Ensure placeholder is hidden when image loads successfully
    const placeholder = ev.target.nextElementSibling;
    if (placeholder && placeholder.classList.contains('picture-placeholder')) {
      placeholder.style.display = 'none';
    }
  }

  _showMoreInfo(entityId) {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    event.detail = { entityId };
    this.dispatchEvent(event);
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const lang = this.config?.language || 'en';
    
    // Get all expected entities
    const entities = this._getExpectedEntities();
    
    if (!entities || Object.keys(entities).length === 0) {
      return html`
        <ha-card>
          <div class="card-content error">
            <ha-icon icon="mdi:alert-circle" class="error-icon"></ha-icon>
            <div class="error-message">
              <h3>Configuration Error</h3>
              <p>Missing Toniebox ID. Please configure the card.</p>
            </div>
          </div>
        </ha-card>
      `;
    }

    // Get entities
    const contentPictureEntity = this.hass.states[entities.contentPicture];
    const contentTitleEntity = this.hass.states[entities.contentTitle];

    return html`
      <ha-card header="${this.config.toniebox_name}">
        <div class="card-content">
          <!-- Picture Section -->
          <div class="picture-section">
            ${this._renderContentPicture(contentPictureEntity, lang)}
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(entities.contentTitle, localize('title', lang), 'mdi:music')}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(entities.tagValid, localize('tag_uid', lang), 'mdi:tag')}
            ${this._renderEntityRow(entities.charger, localize('charging_station', lang), 'mdi:battery-charging')}
            ${this._renderEntityRow(entities.volumeDb, localize('volume_db', lang), 'mdi:volume-high')}
            ${this._renderEntityRow(entities.volumeLevel, localize('volume_level', lang), 'mdi:volume-medium')}
            ${this._renderEntityRow(entities.volumeDown, localize('small_ear_quieter', lang), 'mdi:ear-hearing-off')}
            ${this._renderEntityRow(entities.volumeUp, localize('big_ear_louder', lang), 'mdi:ear-hearing')}
            ${this._renderEntityRow(entities.contentAudioId, localize('content_audio_id', lang), 'mdi:identifier')}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(entities.cacheContent, localize('cache_cloud_content', lang), 'mdi:cloud-download')}
            ${this._renderEntityRow(entities.enableCloud, localize('enable_cloud_operation', lang), 'mdi:cloud')}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
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
    `;
  }
}

customElements.define('teddy-card', TeddyCard);

// Register with HACS
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'teddy-card',
  name: 'TeddyCloud Toniebox Card',
  description: 'A custom card for displaying TeddyCloud Toniebox information',
  version: CARD_VERSION
});

console.info('%c TEDDY-CARD %c Card registered successfully', 
  'color: white; font-weight: bold; background: #03a9f4',
  'color: white; font-weight: bold; background: #4caf50'
);