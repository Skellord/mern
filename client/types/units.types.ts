export type UnitCaste =
    | 'lord'
    | 'hero'
    | ''
    | 'melee_cavalry'
    | 'melee_infantry'
    | 'monster'
    | 'monstrous_infantry'
    | 'monstrous_cavalry'
    | 'warmachine'
    | 'missile_infantry'
    | 'missile_cavalry'
    | 'war_beast';

interface UnitStats {
    key: string;
    accuracy: string;
    armour: string;
    campaign_action_points: string;
    category: string;
    charge_bonus: string;
    class: string;
    dismounted_charge_bonus: string;
    dismounted_melee_attack: string;
    historical_description_text: string;
    melee_attack: string;
    melee_defence: string;
    morale: string;
    bonus_hit_points: string;
    mount: string;
    shield: string;
    short_description_text: string;
    attribute_group: string;
    reload: string;
    capture_power: string;
    secondary_ammo: string;
    primary_ammo: string;
    damage_mod_flame: string;
    damage_mod_magic: string;
    num_engines: string;
    damage_mod_physical: string;
    damage_mod_missile: string;
    damage_mod_all: string;
    can_skirmish: string;
    mounted_draughts: string;
    sync_locomotion: string;
    can_brace: string;
}

export interface Unit {
    _id: string;
    unit: string;
    caste: string;
    land_unit: string;
    num_men: string;
    multiplayer_cap: string;
    multiplayer_cost: string;
    recruitment_cost: string;
    upkeep_cost: string;
    weight: string;
    unique_index: string;
    tier: string;
    is_high_threat: string;
    mount: string;
    can_siege: string;
    food_cost: string;
    is_monstrous: string;
    multiplayer_qb_cap: string;
    faction: string;
    stats: UnitStats;
}
