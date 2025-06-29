export type ProviderRow = {
  userId: string;
  userName: string;
  quantity: number;
  description?: string;
  itemName: string;
};

export type ItemRow = {
  name: string;
  needed: number;
  note?: string;
  itemCategorySlug?: string;
  Provider: ProviderRow[];
};

export type FormResult<E = string | null> = {
  success: boolean;
  error: E;
};
