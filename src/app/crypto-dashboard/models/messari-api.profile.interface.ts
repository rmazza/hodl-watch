export interface AssetProfileV2 {
    status?: Status;
    data?:   ProfileData;
}

export interface ProfileData {
    id:                      string;
    symbol?:                  string;
    name?:                    string;
    slug?:                    string;
    _internal_temp_agora_id?: string;
    profile?:                 Profile;
}

export interface Profile {
    general?:      ProfileGeneral;
    contributors?: Ors;
    advisors?:     Ors;
    investors?:    Ors;
    ecosystem?:    Ecosystem;
    economics?:    Economics;
    technology?:   Technology;
    governance?:   Governance;
    metadata?:     Metadata;
}

export interface Ors {
    individuals?:   Individual[];
    organizations?: Organization[];
}

export interface Individual {
    slug?:        string;
    first_name?:  string;
    last_name?:   string;
    title?:       string;
    description?: null | string;
    avatar_url?:  null | string;
}

export interface Organization {
    slug?:        string;
    name?:        string;
    logo?:        string;
    description?: null | string;
}

export interface Economics {
    token?:                  Token;
    launch?:                 Launch;
    consensus_and_emission?: ConsensusAndEmission;
    native_treasury?:        NativeTreasury;
}

export interface ConsensusAndEmission {
    supply?:    Supply;
    consensus?: Consensus;
}

export interface Consensus {
    consensus_details?:              string;
    general_consensus_mechanism?:    string;
    precise_consensus_mechanism?:    string;
    targeted_block_time?:            number;
    block_reward?:                   number;
    mining_algorithm?:               string;
    next_halving_date?:              Date;
    is_victim_of_51_percent_attack?: boolean;
}

export interface Supply {
    supply_curve_details?:  string;
    general_emission_type?: string;
    precise_emission_type?: string;
    is_capped_supply?:      boolean;
    max_supply?:            number;
}

export interface Launch {
    general?:              LaunchGeneral;
    fundraising?:          Fundraising;
    initial_distribution?: InitialDistribution;
}

export interface Fundraising {
    sales_rounds?:                    any[];
    sales_documents?:                 any[];
    sales_treasury_accounts?:         any[];
    treasury_policies?:               null;
    projected_use_of_sales_proceeds?: any[];
}

export interface LaunchGeneral {
    launch_style?:   string;
    launch_details?: string;
}

export interface InitialDistribution {
    initial_supply?:             number;
    initial_supply_repartition?: InitialSupplyRepartition;
    token_distribution_date?:    null;
    genesis_block_date?:         Date;
}

export interface InitialSupplyRepartition {
    allocated_to_investors_percentage?:                    number;
    allocated_to_organization_or_founders_percentage?:     number;
    allocated_to_premined_rewards_or_airdrops_percentage?: number;
}

export interface NativeTreasury {
    accounts?:               any[];
    treasury_usage_details?: null;
}

export interface Token {
    token_name?:          string;
    token_type?:          string;
    token_address?:       null;
    block_explorers?:     BlockExplorer[];
    multitoken?:          any[];
    token_usage?:         string;
    token_usage_details?: string;
}

export interface BlockExplorer {
    name?: string;
    link?: string;
}

export interface Ecosystem {
    assets?:        Asset[];
    organizations?: Organization[];
}

export interface Asset {
    id?:   string;
    name?: string;
}

export interface ProfileGeneral {
    overview?:   GeneralOverview;
    background?: Background;
    roadmap?:    Roadmap[];
    regulation?: Regulation;
}

export interface Background {
    background_details?:    string;
    issuing_organizations?: any[];
}

export interface GeneralOverview {
    is_verified?:     boolean;
    tagline?:         string;
    category?:        string;
    sector?:          string;
    tags?:            string;
    project_details?: string;
    official_links?:  BlockExplorer[];
}

export interface Regulation {
    regulatory_details?: string;
    sfar_score?:         number;
    sfar_summary?:       string;
}

export interface Roadmap {
    title?:   string;
    date?:    Date;
    type?:    null | string;
    details?: string;
}

export interface Governance {
    governance_details?: string;
    onchain_governance?: OnchainGovernance;
    grants?:             any[];
}

export interface OnchainGovernance {
    onchain_governance_type?:    null;
    onchain_governance_details?: null;
    is_treasury_decentralized?:  boolean;
}

export interface Metadata {
    updated_at?: Date;
}

export interface Technology {
    overview?: TechnologyOverview;
    security?: Security;
}

export interface TechnologyOverview {
    technology_details?:  string;
    client_repositories?: ClientRepository[];
}

export interface ClientRepository {
    name?:         string;
    link?:         string;
    license_type?: string;
}

export interface Security {
    audits?:                             any[];
    known_exploits_and_vulnerabilities?: Roadmap[];
}

export interface Status {
    elapsed?:   number;
    timestamp?: Date;
}
