export const name = 'Umbraco.Core.DictionaryManagement';
export const extensions = [
	{
		name: 'Dictionary Management Bundle',
		alias: 'Umb.Dictionary.TranslationManagement',
		type: 'bundle',
		loader: () => import('./manifests.js'),
	},
];
