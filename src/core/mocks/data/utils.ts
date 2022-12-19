import type { ContentTreeItem, DocumentTreeItem, DocumentTypeTreeItem, EntityTreeItem, FolderTreeItem } from "@umbraco-cms/backend-api";
import type { DocumentDetails, DocumentTypeDetails } from "@umbraco-cms/models";

export const createEntityTreeItem = (item: any): EntityTreeItem => {
	return {
		name: item.name,
		type: item.type,
		icon: item.icon,
		hasChildren: item.hasChildren,
		key: item.key,
		isContainer: item.isContainer,
		parentKey: item.parentKey,
	};
};

export const createFolderTreeItem = (item: any): FolderTreeItem => {
	return {
		...createEntityTreeItem(item),
		isFolder: item.isFolder,
	};
};

// TODO: remove isTrashed type extension when we have found a solution to trashed items
export const createContentTreeItem = (item: any): ContentTreeItem & { isTrashed: boolean } => {
	return {
		...createEntityTreeItem(item),
		noAccess: item.noAccess,
		isTrashed: item.isTrashed,
	};
};

// TODO: remove isTrashed type extension when we have found a solution to trashed items
export const createDocumentTreeItem = (item: DocumentDetails): DocumentTreeItem & { isTrashed: boolean }  => {
	return {
		...createContentTreeItem(item),
		noAccess: item.noAccess,
		isProtected: item.isProtected,
		isPublished: item.isPublished,
		isEdited: item.isEdited,
		isTrashed: item.isTrashed,
	};
}

export const createDocumentTypeTreeItem = (item: DocumentTypeDetails): DocumentTypeTreeItem => {
	return {
		...createFolderTreeItem(item),
		isElement: item.isElement
	};
};