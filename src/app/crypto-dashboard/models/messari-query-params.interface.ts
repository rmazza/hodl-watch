export interface AssetsV2Params {
    page?: number,
    sort?: string,
    limit?: number,
    fields?: string,
    withMetrics?: boolean,
    withProfiles?: boolean
}

export interface AssetProfileV2Params {
    fields?: string,
    asMarkdown?: boolean
}