export interface SearchParams {
    type?: string | null;
    owner?: string | null;
    itemName?: string | null;
    location?: string | null;
    starred?: boolean | null;
    deleted?: boolean | null;
    textSearchString?: string | null;
  }