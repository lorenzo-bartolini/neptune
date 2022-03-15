export interface Product{
  season: string[];
  id: string;
  category: string[];
  product_name: string;
  label: string;
  hierarchy: string[];
}

export interface Session {
  id: string,
  start: string,
  end: string,
  isauth: boolean,
  label: string;
}

export interface Product{
  id: string,
  hierarchy: string[],
  product_name: string,
  category: string[],
  season: string[],
  label: string
}
