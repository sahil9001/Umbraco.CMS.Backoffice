import { type UUIBooleanInputEvent } from '@umbraco-cms/backoffice/external/uui';
import { css, html, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/events';

@customElement('umb-user-permission-setting')
export class UmbUserPermissionSettingElement extends UmbLitElement {
	@property({ type: String, attribute: true })
	label: string = '';

	@property({ type: String, attribute: true })
	description?: string = '';

	@property({ type: Boolean, attribute: true })
	allowed: boolean = false;

	#onChange(event: UUIBooleanInputEvent) {
		event.stopPropagation();
		this.allowed = event.target.checked;
		this.dispatchEvent(new UmbChangeEvent());
	}

	render() {
		return html`<div id="setting">
			<uui-toggle label=${this.label} ?checked=${this.allowed} @change=${this.#onChange}>
				<div id="meta">
					<div id="name">${this.label}</div>
					<small>${this.description}</small>
				</div>
			</uui-toggle>
		</div>`;
	}

	static styles = [
		UmbTextStyles,
		css`
			#setting {
				display: flex;
				align-items: center;
				border-bottom: 1px solid var(--uui-color-divider);
				padding: var(--uui-size-space-3) 0 var(--uui-size-space-4) 0;
			}

			#meta {
				margin-left: var(--uui-size-space-4);
				line-height: 1.2em;
			}

			#name {
				font-weight: bold;
			}
		`,
	];
}

export default UmbUserPermissionSettingElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-user-permission-setting': UmbUserPermissionSettingElement;
	}
}
