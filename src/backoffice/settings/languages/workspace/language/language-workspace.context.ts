import { UmbLanguageRepository } from '../../repository/language.repository';
import { UmbWorkspaceContext } from '../../../../shared/components/workspace/workspace-context/workspace-context';
import type { LanguageModel } from '@umbraco-cms/backend-api';
import { DeepState, ObjectState } from '@umbraco-cms/observable-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export class UmbLanguageWorkspaceContext extends UmbWorkspaceContext {
	#host: UmbControllerHostInterface;
	#languageRepository: UmbLanguageRepository;

	#isNew = new DeepState<boolean>(false);
	isNew = this.#isNew.asObservable();

	#data = new ObjectState<LanguageModel | undefined>(undefined);
	data = this.#data.asObservable();

	constructor(host: UmbControllerHostInterface) {
		super(host);
		this.#host = host;
		this.#languageRepository = new UmbLanguageRepository(this.#host);
	}

	async load(isoCode: string) {
		const { data } = await this.#languageRepository.requestByIsoCode(isoCode);
		if (data) {
			this.#isNew.next(false);
			this.#data.update(data);
		}
	}

	async createScaffold() {
		const { data } = await this.#languageRepository.createScaffold();
		if (!data) return;
		this.#isNew.next(true);
		this.#data.update(data);
	}

	getData() {
		return this.#data.getValue();
	}

	getEntityType() {
		return 'language';
	}

	getIsNew() {
		return this.#isNew.getValue();
	}

	setIsNew(isNew: boolean) {
		this.#isNew.next(isNew);
	}

	setName(name: string) {
		this.#data.update({ name });
	}

	setCulture(isoCode: string) {
		this.#data.update({ isoCode });
	}

	setMandatory(isMandatory: boolean) {
		this.#data.update({ isMandatory });
	}

	setDefault(isDefault: boolean) {
		this.#data.update({ isDefault });
	}

	setFallbackCulture(isoCode: string) {
		this.#data.update({ fallbackIsoCode: isoCode });
	}

	destroy(): void {
		this.#data.complete();
	}
}
