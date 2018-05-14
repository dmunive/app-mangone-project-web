import { ICatalogDetail } from "./i-catalog-detail.model";

export interface ICatalog{
    code: string;
    description: string;
    catalogDetails: Array<ICatalogDetail>;
    status: number;
}