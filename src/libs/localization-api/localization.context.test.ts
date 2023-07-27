import { expect } from '@open-wc/testing';
import { firstValueFrom } from 'rxjs';
import { UmbLocalizationContext } from './localization.context.js';
import { UmbTranslationRegistry } from './registry/translation.registry.js';
import { UmbExtensionRegistry } from '@umbraco-cms/backoffice/extension-api';

const english = {
	type: 'translations',
	alias: 'test.en',
	name: 'Test English',
	meta: {
		culture: 'en',
		translations: {
			general: {
				close: 'Close',
				logout: 'Log out',
			},
		},
	},
};

describe('Localization', () => {
	let registry: UmbTranslationRegistry;
	let extensionRegistry: UmbExtensionRegistry<any>;

	beforeEach(() => {
		extensionRegistry = new UmbExtensionRegistry();
		registry = new UmbTranslationRegistry(extensionRegistry);
		extensionRegistry.register(english);
		registry.register(english.meta.culture);
	});

	describe('UmbTranslationRegistry', () => {
		it('should register and get translation', (done) => {
			registry.translations.subscribe((translations) => {
				expect(translations.get('general_close')).to.equal('Close');
				done();
			});
		});
	});

	describe('UmbLocalizationContext', () => {
		let context: UmbLocalizationContext;

		beforeEach(async () => {
			context = new UmbLocalizationContext(extensionRegistry);
			context.setLanguage(english.meta.culture);
		});

		describe('localize', () => {
			it('should return a value', async () => {
				const value = await firstValueFrom(context.localize('general_close'));
				expect(value).to.equal('Close');
			});

			it('should return fallback if key is not found', async () => {
				const value = await firstValueFrom(context.localize('general_not_found', 'Not found'));
				expect(value).to.equal('Not found');
			});

			it('should return an empty string if fallback is not provided', async () => {
				const value = await firstValueFrom(context.localize('general_not_found'));
				expect(value).to.equal('');
			});

			it('should return a new value if the translation changes', async () => {
				const value = await firstValueFrom(context.localize('general_close'));
				expect(value).to.equal('Close');

				extensionRegistry.register({
					type: 'translations',
					alias: 'test.en.override',
					name: 'Test English',
					meta: {
						culture: 'en',
						translations: {
							general: {
								close: 'Close 2',
							},
						},
					},
				});

				const value2 = await firstValueFrom(context.localize('general_close'));
				expect(value2).to.equal('Close 2');
			});
		});

		describe('localizeMany', () => {
			it('should return values', async () => {
				const values = await firstValueFrom(context.localizeMany(['general_close', 'general_logout']));
				expect(values[0]).to.equal('Close');
				expect(values[1]).to.equal('Log out');
			});
		});
	});
});
