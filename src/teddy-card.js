import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';
import './editor.js';

const CARD_VERSION = '1.0.0';

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

  static getConfigElement() {
    return document.createElement('teddy-card-editor');
  }

  static getStubConfig() {
    return {
      toniebox_id: '12345678',
      toniebox_name: 'My Toniebox',
      language: 'en'
    };
  }

  setConfig(config) {
    if (!config.toniebox_id) {
      throw new Error(localize('errors.missing_toniebox_id', config.language));
    }
    if (!config.toniebox_name) {
      throw new Error(localize('errors.missing_toniebox_name', config.language));
    }
    
    this.config = {
      language: 'en',
      ...config
    };
  }

  getCardSize() {
    return 7;
  }

  _getEntityId(entityType, suffix = '') {
    const id = this.config.toniebox_id;
    const suffixPart = suffix ? `_${suffix}` : '';
    return `${entityType}.teddycloud_box_${id}${suffixPart}`;
  }

  _getServerEntityId(suffix) {
    return `switch.teddycloud_server_${suffix}`;
  }

  _renderEntityRow(entityId, name, icon = null) {
    const entity = this.hass.states[entityId];
    if (!entity) {
      return html`
        <div class="entity-row unavailable">
          <ha-icon icon="mdi:alert-circle" class="state-icon"></ha-icon>
          <div class="entity-info">
            <span class="entity-name">${name}</span>
            <span class="entity-state unavailable">${localize('errors.entity_not_found', this.config.language)}</span>
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

    const lang = this.config.language || 'en';
    
    // Entity IDs
    const contentPictureId = this._getEntityId('image', 'content_picture');
    const contentTitleId = this._getEntityId('sensor', 'content_title');
    const tagValidId = this._getEntityId('sensor', 'tag_valid');
    const chargerId = this._getEntityId('binary_sensor', 'charger');
    const volumeDbId = this._getEntityId('sensor', 'volume_db');
    const volumeLevelId = this._getEntityId('sensor', 'volume_level');
    const volumeDownId = this._getEntityId('event', 'volume_down');
    const volumeUpId = this._getEntityId('event', 'volume_up');
    const contentAudioId = this._getEntityId('sensor', 'content_audio_id');
    const cacheContentId = this._getServerEntityId('cloud_cachecontent_cache_cloud_content_on_local_server');
    const enableCloudId = this._getServerEntityId('cloud_enabled_generally_enable_cloud_operation');

    // Get entities
    const contentPictureEntity = this.hass.states[contentPictureId];
    const contentTitleEntity = this.hass.states[contentTitleId];

    return html`
      <ha-card header="${this.config.toniebox_name}">
        <div class="card-content">
          <!-- Picture Section -->
          <div class="picture-section">
            ${contentPictureEntity && contentPictureEntity.attributes.entity_picture
              ? html`<img src="${contentPictureEntity.attributes.entity_picture}" alt="${localize('title', lang)}" />`
              : html`<div class="picture-placeholder">
                  <ha-icon icon="mdi:teddy-bear"></ha-icon>
                </div>`
            }
          </div>

          <!-- Content Title -->
          <div class="title-section">
            ${this._renderEntityRow(contentTitleId, localize('title', lang), 'mdi:music')}
          </div>

          <!-- Main Entities -->
          <div class="entities-section">
            <h3>${this.config.toniebox_name}</h3>
            ${this._renderEntityRow(tagValidId, localize('tag_uid', lang), 'mdi:tag')}
            ${this._renderEntityRow(chargerId, localize('charging_station', lang), 'mdi:battery-charging')}
            ${this._renderEntityRow(volumeDbId, localize('volume_db', lang), 'mdi:volume-high')}
            ${this._renderEntityRow(volumeLevelId, localize('volume_level', lang), 'mdi:volume-medium')}
            ${this._renderEntityRow(volumeDownId, localize('small_ear_quieter', lang), 'mdi:ear-hearing-off')}
            ${this._renderEntityRow(volumeUpId, localize('big_ear_louder', lang), 'mdi:ear-hearing')}
            ${this._renderEntityRow(contentAudioId, localize('content_audio_id', lang), 'mdi:identifier')}
          </div>

          <!-- Server Settings -->
          <div class="entities-section">
            <h3>TeddyCloud Server</h3>
            ${this._renderEntityRow(cacheContentId, localize('cache_cloud_content', lang), 'mdi:cloud-download')}
            ${this._renderEntityRow(enableCloudId, localize('enable_cloud_operation', lang), 'mdi:cloud')}
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
    `;
  }
}

customElements.define('teddy-card', TeddyCard);