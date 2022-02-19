const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);
const factions = [
    {
        name: 'skaven',
        reg: 'skv',
    },
    {
        name: 'tombKings',
        reg: 'tmb',
    },
    {
        name: 'darkElves',
        reg: 'def',
    },
    {
        name: 'highElves',
        reg: 'hef',
    },
    {
        name: 'vampireCoast',
        reg: 'cst',
    },
    {
        name: 'vampireCounts',
        reg: 'vmp',
    },
    {
        name: 'lizardmens',
        reg: 'lzd',
    },
    {
        name: 'empire',
        reg: 'emp',
    },
    {
        name: 'greenSkins',
        reg: 'grn',
    },
    {
        name: 'woodElves',
        reg: 'wef',
    },
    {
        name: 'beastmens',
        reg: 'bst',
    },
    {
        name: 'bretonnia',
        reg: 'brt',
    },
    {
        name: 'ogres',
        reg: 'ogr',
    },
    {
        name: 'chaos',
        reg: 'chs',
    },
    {
        name: 'norsca',
        reg: 'nor',
    },
    {
        name: 'dwarfs',
        reg: 'dwf',
    },
];

const startRegex = '^(?:[^_\n]+_){2}([';
const endRegex = ']+)(?:_[^_\n]+)*$';

async function addFactions(collection) {
    const result = Promise.all(
        factions.map(async item => {
            const expression = `${startRegex}${item.reg}${endRegex}`;
            const regex = new RegExp(expression, 'g');
            return await collection.updateMany({ unit: { $regex: regex } }, { $set: { faction: item.name } });
        })
    );
    return result;
}

async function completeData() {
    try {
        await client.connect();
        console.log(`Connected successfully to server ${uri}`);
        const db = client.db(process.env.DB_NAME);
        const mainCollection = db.collection(process.env.MAIN_COLLECTION);
        const statsCollection = db.collection(process.env.STATS_COLLECTION);
        const meleeWeaponsCollection = db.collection(process.env.MELEE_WEAPONS_COLLECTION);
        const missileWeaponsCollection = db.collection(process.env.MISSILE_WEAPONS_COLLECTION);
        const projectilesCollection = db.collection(process.env.PROJECTILE_COLLECTION);
        const entityCollection = db.collection(process.env.ENTITY_COLLECTION);
        const mountsCollection = db.collection(process.env.MOUNTS_COLLECTION);

        await mainCollection.updateMany(
            {},
            {
                $unset: {
                    prestige: '',
                    world_leader_only: '',
                    can_trade: '',
                    special_edition_mask: '',
                    audio_voiceover_culture: '',
                    in_encyclopedia: '',
                    num_ships: '',
                    min_men_per_ship: '',
                    max_men_per_ship: '',
                    ui_unit_group_naval: '',
                    porthole_camera: '',
                    use_hitpoints_in_campaign: '',
                    unit_scaling: '',
                    audio_voiceover_culture_override: '',
                    restrict_xp_gain_in_campaign: '',
                    audio_voiceover_actor_group: '',
                    has_spoken_vo: '',
                    vo_is_dragon: '',
                    vo_is_dinosaur: '',
                    porthole_composite_scene: '',
                    ui_unit_group_land: '',
                },
            }
        );

        await addFactions(mainCollection);

        await statsCollection.updateMany(
            {},
            {
                $unset: {
                    man_animation: '',
                    num_animals: '',
                    num_mounts: '',
                    spacing: '',
                    supports_first_person: '',
                    training_level: '',
                    officers: '',
                    is_male: '',
                    visibility_spotting_range_min: '',
                    visibility_spotting_range_max: '',
                    ability_global_recharge: '',
                    spot_dist_tre: '',
                    spot_dist_scrub: '',
                    loose_spacing: '',
                    selection_vo: '',
                    selected_vo_secondary: '',
                    selected_vo_tertiary: '',
                    hiding_scalar: '',
                    ground_stat_effect_group: '',
                    ai_usage_group: '',
                    spot_dist_tree: '',
                    engine: '',
                },
            }
        );

        await meleeWeaponsCollection.updateMany(
            {},
            {
                $unset: {
                    first_strike: '',
                    audio_type: '',
                    collision_attack_max_targets: '',
                    collision_attack_max_targets_cooldown: '',
                },
            }
        );

        await missileWeaponsCollection.updateMany(
            {},
            {
                $unset: {
                    audio_type: '',
                },
            }
        );

        await projectilesCollection.updateMany(
            {},
            {
                $unset: {
                    category: '',
                    shot_type: '',
                    spin_type: '',
                    trajectory_sight: '',
                    muzzle_velocity: '',
                    can_bounce: '',
                    spread: '',
                    high_air_resistance: '',
                    collision_radius: '',
                    projectile_display: '',
                    projectile_audio: '',
                    shockwave_radius: '',
                    gravity: '',
                    burst_size: '',
                    burst_shot_delay: '',
                    mass: '',
                    fixed_elevation: '',
                    projectile_penetration: '',
                    is_beam_launch_burst: '',
                    expiry_range: '',
                    expire_on_impact: '',
                    can_roll: '',
                    trail_always_on: '',
                    vegetation_ignore_time: '',
                    prefer_central_targets: '',
                },
            }
        );

        await entityCollection.updateMany(
            {},
            {
                $unset: {
                    type: '',
                    aura_vfx: '',
                    acceleration: '',
                    deceleration: '',
                    charge_speed: '',
                    charge_distance_commence_run: '',
                    charge_distance_adopt_charge_pose: '',
                    charge_distance_pick_target: '',
                    radius: '',
                    shape: '',
                    radii_ratio: '',
                    height: '',
                    fire_arc_close: '',
                    turn_speed: '',
                    hit_points: '',
                    allow_turn_to_move_anim: '',
                    allow_static_turn_anim: '',
                    min_turning_speed: '',
                    flying_charge_speed: '',
                    size: '',
                    strafe_speed: '',
                    gradient_strategy: '',
                    audio_entity_type: '',
                    combat_reaction_radius: '',
                    entity_effects: '',
                    hit_reactions_ignore_chance: '',
                    knock_interrupts_ignore_chance: '',
                    soft_collision_offset_z: '',
                    can_climb_ladder_and_stair_pipes: '',
                    projectile_intersection_radius_ratio: '',
                    projectile_penetration_speed_change: '',
                    projectile_penetration_resistance: '4',
                    min_tracking_ratio: '',
                    max_tracking_ratio: '',
                    vfx_filter_id: '',
                    can_cast_projectile: '',
                    has_blood: '',
                    can_dismember: '',
                    combat_camera_shake: '',
                    dismember_head_alive_hp_ratio: '',
                    dismember_arms_alive_hp_ratio: '',
                    jump_attack_chance: '',
                    dealt_collision_knocked_flying_threshold_multiplier: '',
                    dealt_collision_knocked_down_threshold_multiplier: '',
                    dealt_collision_knocked_back_threshold_multiplier: '',
                    anim_lod_distance_multiplier: '',
                },
            }
        );

        await mountsCollection.updateMany(
            {},
            {
                $unset: {
                    audio_armour_type: '',
                    animation: '',
                    variant: '',
                    voiceover: '',
                },
            }
        );
    } catch (e) {
        console.log(e);
    }
}

completeData()
    .then(() => console.log('Collections prepared'))
    .catch(e => console.log(e))
    .finally(() => client.close());
