export interface Assets {
    status: Status;
    data:   AssetData[];
}

export interface AssetData {
    id:      string;
    symbol:  string;
    name:    string;
    slug:    string;
    profile: DatumProfile;
    metrics: Metrics;
}

export interface Metrics {
    id:                        string;
    symbol:                    string;
    name:                      string;
    slug:                      string;
    market_data:               MarketData;
    marketcap:                 Marketcap;
    supply:                    MetricsSupply;
    blockchain_stats_24_hours: { [key: string]: number | null };
    all_time_high:             AllTimeHigh;
    developer_activity:        DeveloperActivity;
    roi_data:                  RoiData;
    misc_data:                 MiscData;
}

export interface Marketcap {
    marketcap_dominance_percent?:           number;
    current_marketcap_usd?:                 number;
    y_2050_marketcap_usd?:                  number;
    y_plus10_marketcap_usd?:                number;
    liquid_marketcap_usd?:                  number;
    realized_marketcap_usd?:                number;
    volume_turnover_last_24_hours_percent?: number;
}

export interface AllTimeHigh {
    price:        number;
    at:           Date;
    days_since:   number;
    percent_down: number;
}

export interface DeveloperActivity {
    stars:                       number;
    watchers:                    number;
    commits_last_3_months:       number;
    commits_last_1_year:         number;
    lines_added_last_3_months:   number;
    lines_added_last_1_year:     number;
    lines_deleted_last_3_months: number;
    lines_deleted_last_1_year:   number;
}

export interface MarketData {
    price_usd:                                   number;
    price_btc:                                   number;
    volume_last_24_hours:                        number;
    real_volume_last_24_hours:                   number;
    volume_last_24_hours_overstatement_multiple: number;
    percent_change_usd_last_1_hour:              number;
    percent_change_usd_last_24_hours:            number;
    percent_change_btc_last_24_hours:            number;
    ohlcv_last_1_hour:                           OhlcvLastHour;
    ohlcv_last_24_hour:                          OhlcvLastHour;
}

export interface OhlcvLastHour {
    open:   number;
    high:   number;
    low:    number;
    close:  number;
    volume: number;
}

export interface MiscData {
    asset_age_days:     number;
    vladimir_club_cost: number;
    categories:         Array<string[]>;
    sector:             Array<string[]>;
}

export interface RoiData {
    percent_change_last_1_week:   number;
    percent_change_last_1_month:  number;
    percent_change_last_3_months: number;
    percent_change_last_1_year:   number;
}

export interface MetricsSupply {
    y_2050:                  number;
    y_2050_percent_issued:   number;
    supply_yplus_10:         number;
    y_plus10_issued_percent: number;
    liquid:                  number;
    circulating:             number;
    stock_to_flow:           number;
}

export interface DatumProfile {
    profile: ProfileProfile;
}

export interface ProfileProfile {
    general:      ProfileGeneral;
    contributors: Ors;
    advisors:     Ors;
    investors:    Ors;
    ecosystem:    Ecosystem;
    economics:    Economics;
    technology:   Technology;
    governance:   Governance;
}

export interface Ors {
    individuals:   Individual[];
    organizations: Organization[];
}

export interface Individual {
    slug:        string;
    first_name:  string;
    last_name:   string;
    title:       string;
    description: string;
    avatar_url:  string;
}

export interface Organization {
    slug:        string;
    name:        string;
    logo:        string;
    description: string;
}

export interface Economics {
    token:                  Token;
    launch:                 Launch;
    consensus_and_emission: ConsensusAndEmission;
    native_treasury:        NativeTreasury;
}

export interface ConsensusAndEmission {
    supply:    ConsensusAndEmissionSupply;
    consensus: Consensus;
}

export interface Consensus {
    consensus_details:              string;
    general_consensus_mechanism:    string;
    precise_consensus_mechanism:    string;
    targeted_block_time:            number;
    block_reward:                   number;
    mining_algorithm:               string;
    next_halving_date:              Date;
    is_victim_of_51_percent_attack: boolean;
}

export interface ConsensusAndEmissionSupply {
    supply_curve_details:  string;
    general_emission_type: string;
    precise_emission_type: string;
    is_capped_supply:      boolean;
    max_supply:            number;
}

export interface Launch {
    general:              LaunchGeneral;
    fundraising:          Fundraising;
    initial_distribution: InitialDistribution;
}

export interface Fundraising {
    sales_rounds:                    SalesRound[];
    sales_documents:                 ProjectedUseOfSalesProceed[];
    sales_treasury_accounts:         ProjectedUseOfSalesProceed[];
    treasury_policies:               ProjectedUseOfSalesProceed[];
    projected_use_of_sales_proceeds: ProjectedUseOfSalesProceed[];
}

export interface ProjectedUseOfSalesProceed {
}

export interface SalesRound {
    restricted_jurisdictions: any[];
}

export interface LaunchGeneral {
    launch_style:   string;
    launch_details: string;
}

export interface InitialDistribution {
    initial_supply:             number;
    initial_supply_repartition: InitialSupplyRepartition;
    token_distribution_date:    Date;
    genesis_block_date:         Date;
}

export interface InitialSupplyRepartition {
    allocated_to_investors_percentage:                    number;
    allocated_to_organization_or_founders_percentage:     number;
    allocated_to_premined_rewards_or_airdrops_percentage: number;
}

export interface NativeTreasury {
    accounts:               Account[];
    treasury_usage_details: string;
}

export interface Account {
    account_type: string;
    addresses:    ProjectedUseOfSalesProceed[];
}

export interface Token {
    token_name:                      string;
    token_type:                      string;
    block_explorers:                 BlockExplorer[];
    multitoken:                      Asset[];
    token_usage:                     string;
    token_usage_details_and_wallets: string;
}

export interface BlockExplorer {
    name: string;
    link: string;
}

export interface Asset {
    id:   string;
    name: string;
}

export interface Ecosystem {
    assets:        Asset[];
    organizations: Organization[];
}

export interface ProfileGeneral {
    overview:   GeneralOverview;
    background: Background;
    roadmap:    Roadmap[];
    regulation: Regulation;
}

export interface Background {
    background_details:    string;
    issuing_organizations: Organization[];
}

export interface GeneralOverview {
    is_verified:     boolean;
    tagline:         string;
    category:        string;
    sector:          string;
    tags:            string;
    project_details: string;
    official_links:  BlockExplorer[];
}

export interface Regulation {
    regulatory_details: string;
    sfar_score:         number;
    sfar_summary:       string;
}

export interface Roadmap {
    title:   string;
    date:    Date;
    type:    string;
    details: string;
}

export interface Governance {
    governance_details: string;
    onchain_governance: OnchainGovernance;
    grants:             Grant[];
}

export interface Grant {
    funding_organizations: ProjectedUseOfSalesProceed[];
    grant_program_details: string;
}

export interface OnchainGovernance {
    onchain_governance_type:    string;
    onchain_governance_details: string;
    is_treasury_decentralized:  boolean;
}

export interface Technology {
    overview: TechnologyOverview;
    security: Security;
}

export interface TechnologyOverview {
    technology_details:  string;
    client_repositories: ClientRepository[];
}

export interface ClientRepository {
    name:         string;
    link:         string;
    license_type: string;
}

export interface Security {
    audits:                             Roadmap[];
    known_exploits_and_vulnerabilities: Roadmap[];
}

export interface Status {
    timestamp: Date;
    elapsed:   number;
}