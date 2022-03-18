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
    | 'war_beast'
    | 'chariot';

export interface Unit {
    _id: string;
    unit: string;
    campaign_exclusive?: string;
    caste: UnitCaste;
    create_time: string;
    is_naval: string;
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
    melee_cp: string;
    missile_cp: string;
    mount?: string;
    can_siege: string;
    food_cost: string;
    is_monstrous: string;
    multiplayer_qb_cap: string;
    faction: string;
    unit_portrait?: string;
    lord_portrait?: string;
    icon: string;
    barrier_health: string;
}

export interface UnitStats {
    _id: string;
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
    man_entity: string;
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
    primary_melee_weapon: string;
    primary_missile_weapon?: string;
}

export interface Entity {
    _id: string;
    key: string;
    walk_speed: string;
    run_speed: string;
    fly_speed?: string;
    mass: string;
    locomotion_constant: string;
}

export interface Mount {
    _id: string;
    key: string;
    entity: string;
}

interface Damage {
    key: string;
    ap_damage: string;
    bonus_v_infantry: string;
    bonus_v_large: string;
    damage: string;
    is_magical: string;
    building_damage_multiplier: string;
}

export interface MeleeDamage extends Damage {
    ignition_amount: string;
    melee_attack_interval: string;
    splash_attack_max_attacks: string;
    splash_attack_power_multiplier: string;
    splash_attack_target_size: string;
    weapon_length: string;
    contact_phase?: string;
}

export interface MissileDamage extends Damage {
    base_reload_time: string;
    calibration_area: string;
    calibration_distance: string;
    can_damage_buildings: string;
    can_damage_vehicles: string;
    can_target_airborne: string;
    effective_range: string;
    projectile_number: string;
    shots_per_volley: string;
    contact_stat_effect?: string;
}

interface Spec {
    key: string;
    state: string;
    local_name: string;
}

export interface Attr {
    attribute: string;
    local_name: string;
}

export interface SpecialAbility {
    ability: string;
    local_name: string;
}

export interface LoreSpell {
    unit_special_abilities: string;
    local_name: string;
}

export interface UnitWithStats extends Unit {
    entity: Entity;
    mountEntity: Entity | undefined;
    melee_damage: MeleeDamage;
    missile_damage: MissileDamage | undefined;
    stats: UnitStats;
    specs: Spec[];
    attributes: Attr[];
    special_abilities?: SpecialAbility[];
    lore_spells?: LoreSpell[];
    local_name: string;
}
