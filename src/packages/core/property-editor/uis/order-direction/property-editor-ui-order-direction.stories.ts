import { Meta, Story } from '@storybook/web-components';
import type { UmbPropertyEditorUIOrderDirectionElement } from './property-editor-ui-order-direction.element.js';
import { html } from '@umbraco-cms/backoffice/external/lit';

import './property-editor-ui-order-direction.element.js';

export default {
	title: 'Property Editor UIs/Order Direction',
	component: 'umb-property-editor-ui-order-direction',
	id: 'umb-property-editor-ui-order-direction',
} as Meta;

export const AAAOverview: Story<UmbPropertyEditorUIOrderDirectionElement> = () =>
	html`<umb-property-editor-ui-order-direction></umb-property-editor-ui-order-direction>`;
AAAOverview.storyName = 'Overview';
