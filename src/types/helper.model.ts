export interface FilterState {
    starFilter: number[];
    brandFilter: string[];
    priceFilter: [number, number];
    [key: string]: any;
}