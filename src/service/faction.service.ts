import { Faction } from '../../types/faction.types';
import { FactionModel } from '../models/faction.model';
import { factionAggregation } from '../utils/faction.aggregation';

const cathayUnitVariants = [
    'wh3_main_cth_cha_dragon_blooded_shugengan_lord_yang_1',
    'wh3_main_cth_cha_dragon_blooded_shugengan_lord_yang_2',
    'wh3_main_cth_cha_dragon_blooded_shugengan_lord_yin_1',
    'wh3_main_cth_cha_dragon_blooded_shugengan_lord_yin_2',
    'wh3_main_cth_cha_lord_magistrate_1',
    'wh3_main_cth_cha_lord_magistrate_2',
    'wh3_main_cth_cha_alchemist_1',
    'wh3_main_cth_cha_astromancer_1',
    'wh3_main_cth_cha_astromancer_2',
];

const khornUnitVariants = [
    'wh3_main_kho_cha_herald_of_khorne_1',
    'wh3_main_kho_cha_herald_of_khorne_2',
    'wh3_main_kho_cha_bloodreaper_1',
    'wh3_main_kho_cha_bloodreaper_2',
    'wh3_main_kho_cha_cultist_1',
    'wh3_survival_kho_cha_daemon_prince_of_khorne',
];

const kislevUnitVariants = [
    'wh3_main_ksl_cha_boris_1',
    'wh3_main_ksl_cha_boris_2',
    'wh3_main_ksl_cha_boyar_1',
    'wh3_main_ksl_cha_boyar_2',
    'wh3_main_ksl_cha_ice_witch_ice_1',
    'wh3_main_ksl_cha_ice_witch_ice_2',
    'wh3_main_ksl_cha_ice_witch_tempest_1',
    'wh3_main_ksl_cha_ice_witch_tempest_2',
    'wh3_main_ksl_cha_katarin_1',
    'wh3_main_ksl_cha_katarin_2',
    'wh3_main_ksl_cha_kostaltyn_1',
    'wh3_main_ksl_cha_kostaltyn_2',
    'wh3_main_ksl_cha_frost_maiden_ice_1',
    'wh3_main_ksl_cha_frost_maiden_ice_2',
    'wh3_main_ksl_cha_frost_maiden_tempest_1',
    'wh3_main_ksl_cha_frost_maiden_tempest_2',
    'wh3_main_ksl_cha_patriarch_1',
    'wh3_main_ksl_cha_patriarch_2',
];

const nurgleUnitVariants = [
    'wh3_main_nur_cha_herald_of_nurgle_death_1',
    'wh3_main_nur_cha_herald_of_nurgle_death_2',
    'wh3_main_nur_cha_herald_of_nurgle_nurgle_1',
    'wh3_main_nur_cha_herald_of_nurgle_nurgle_2',
    'wh3_main_nur_cha_cultist_1',
    'wh3_main_nur_cha_plagueridden_death_1',
    'wh3_main_nur_cha_plagueridden_death_2',
    'wh3_main_nur_cha_plagueridden_nurgle_1',
    'wh3_main_nur_cha_plagueridden_nurgle_2',
    'wh3_survival_nur_cha_daemon_prince_of_nurgle',
];

const ogresUnitVariants = ['wh3_main_ogr_cha_hunter_1'];

const slaaneshUnitVariants = [
    'wh3_main_sla_cha_herald_of_slaanesh_shadow_1',
    'wh3_main_sla_cha_herald_of_slaanesh_shadow_2',
    'wh3_main_sla_cha_herald_of_slaanesh_shadow_3',
    'wh3_main_sla_cha_herald_of_slaanesh_slaanesh_1',
    'wh3_main_sla_cha_herald_of_slaanesh_slaanesh_2',
    'wh3_main_sla_cha_herald_of_slaanesh_slaanesh_3',
    'wh3_main_sla_cha_alluress_shadow_1',
    'wh3_main_sla_cha_alluress_shadow_2',
    'wh3_main_sla_cha_alluress_shadow_3',
    'wh3_main_sla_cha_alluress_slaanesh_1',
    'wh3_main_sla_cha_alluress_slaanesh_2',
    'wh3_main_sla_cha_alluress_slaanesh_3',
    'wh3_main_sla_cha_cultist_1',
    'wh3_survival_sla_cha_daemon_prince_of_slaanesh',
];

const tzeentchUnitVariants = [
    'wh3_main_tze_cha_herald_of_tzeentch_metal_1',
    'wh3_main_tze_cha_herald_of_tzeentch_metal_2',
    'wh3_main_tze_cha_herald_of_tzeentch_tzeentch_1',
    'wh3_main_tze_cha_herald_of_tzeentch_tzeentch_2',
    'wh3_main_tze_cha_cultist_1',
    'wh3_main_tze_cha_iridescent_horror_metal_1',
    'wh3_main_tze_cha_iridescent_horror_metal_2',
    'wh3_main_tze_cha_iridescent_horror_tzeentch_1',
    'wh3_main_tze_cha_iridescent_horror_tzeentch_2',
    'wh3_survival_tze_cha_daemon_prince_of_tzeentch',
];

const beastmensUnitVariants = [
    'wh2_dlc17_bst_cha_khazrak_one_eye_2',
    'wh2_dlc17_bst_cha_khazrak_one_eye_1',
    'wh2_twa04_bst_cha_great_bray_shaman_beasts_1',
    'wh2_twa04_bst_cha_great_bray_shaman_beasts_2',
    'wh2_twa04_bst_cha_great_bray_shaman_death_1',
    'wh2_twa04_bst_cha_great_bray_shaman_death_2',
    'wh2_twa04_bst_cha_great_bray_shaman_shadows_1',
    'wh2_twa04_bst_cha_great_bray_shaman_shadows_2',
    'wh2_twa04_bst_cha_great_bray_shaman_wild_1',
    'wh2_twa04_bst_cha_great_bray_shaman_wild_2',
    'wh2_dlc17_bst_cha_beastlord_2',
    'wh2_dlc17_bst_cha_beastlord_1',
    'wh_dlc03_bst_cha_khazrak_one_eye_1',
    'wh_dlc03_bst_cha_beastlord_1',
    'wh2_dlc17_bst_cha_bray_shaman_beasts_2',
    'wh2_dlc17_bst_cha_bray_shaman_death_2',
    'wh2_dlc17_bst_cha_bray_shaman_shadows_2',
    'wh2_dlc17_bst_cha_bray_shaman_wild_2',
    'wh2_dlc17_bst_cha_wargor_1',
    'wh2_dlc17_bst_cha_wargor_2',
    'wh_dlc03_bst_cha_bray_shaman_beasts_1',
    'wh_dlc03_bst_cha_bray_shaman_death_1',
    'wh_dlc03_bst_cha_bray_shaman_shadows_1',
    'wh_dlc03_bst_cha_bray_shaman_wild_1',
];

const bretonniaUnitVariants = [
    'wh2_dlc14_brt_cha_repanse_de_lyonesse_1',
    'wh_dlc07_brt_cha_alberic_bordeleaux_1',
    'wh_dlc07_brt_cha_alberic_bordeleaux_2',
    'wh_dlc07_brt_cha_alberic_bordeleaux_3',
    'wh_dlc07_brt_cha_fay_enchantress_1',
    'wh_dlc07_brt_cha_prophetess_1',
    'wh_dlc07_brt_cha_prophetess_2',
    'wh_dlc07_brt_cha_prophetess_3',
    'wh_dlc07_brt_cha_prophetess_beasts_1',
    'wh_dlc07_brt_cha_prophetess_beasts_2',
    'wh_dlc07_brt_cha_prophetess_beasts_3',
    'wh_dlc07_brt_cha_prophetess_heavens_1',
    'wh_dlc07_brt_cha_prophetess_heavens_2',
    'wh_dlc07_brt_cha_prophetess_heavens_3',
    'wh_main_brt_cha_king_louen_leoncoeur_1',
    'wh_main_brt_cha_king_louen_leoncoeur_2',
    'wh_main_brt_cha_king_louen_leoncoeur_3',
    'wh_main_brt_cha_king_louen_leoncoeur_4',
    'wh_main_brt_cha_lord_2',
    'wh_main_brt_cha_lord_3',
    'wh_main_brt_cha_lord_4',
    'wh2_dlc14_brt_cha_henri_le_massif_3',
    'wh2_dlc14_brt_cha_henri_le_massif_4',
    'wh_dlc07_brt_cha_damsel_beasts_1',
    'wh_dlc07_brt_cha_damsel_beasts_3',
    'wh_dlc07_brt_cha_damsel_life_1',
    'wh_dlc07_brt_cha_damsel_life_3',
    'wh_main_brt_cha_damsel_1',
    'wh_main_brt_cha_damsel_3',
    'wh_main_brt_cha_paladin_3',
    'wh_main_brt_cha_paladin_4',
];

const chaosUnitVariants = [
    'wh_dlc01_chs_cha_chaos_lord_10',
    'wh_dlc01_chs_cha_chaos_lord_2',
    'wh_main_chs_cha_chaos_lord_11',
    'wh_main_chs_cha_chaos_lord_12',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_death_10',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_death_12',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_death_13',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_death_9',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_fire_10',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_fire_12',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_fire_13',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_fire_9',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_metal_10',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_metal_12',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_metal_13',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_metal_9',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_shadows_1',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_shadows_2',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_shadows_3',
    'wh_dlc01_chs_cha_chaos_sorcerer_lord_shadows_4',
    'wh_main_chs_cha_archaon_the_everchosen_1',
    'wh_dlc01_chs_cha_chaos_sorcerer_shadows_1',
    'wh_dlc01_chs_cha_chaos_sorcerer_shadows_2',
    'wh_dlc01_chs_cha_chaos_sorcerer_shadows_3',
    'wh_dlc01_chs_cha_chaos_sorcerer_shadows_4',
    'wh_dlc01_chs_cha_exalted_hero_10',
    'wh_main_chs_cha_chaos_sorcerer_death_10',
    'wh_main_chs_cha_chaos_sorcerer_death_11',
    'wh_main_chs_cha_chaos_sorcerer_death_9',
    'wh_main_chs_cha_chaos_sorcerer_fire_10',
    'wh_main_chs_cha_chaos_sorcerer_fire_11',
    'wh_main_chs_cha_chaos_sorcerer_fire_9',
    'wh_main_chs_cha_chaos_sorcerer_metal_10',
    'wh_main_chs_cha_chaos_sorcerer_metal_11',
    'wh_main_chs_cha_chaos_sorcerer_metal_9',
    'wh_main_chs_cha_exalted_hero_12',
    'wh_main_chs_cha_exalted_hero_13',
];

const darkElvesVariants = [
    'wh2_dlc10_def_cha_crone_1',
    'wh2_dlc10_def_cha_crone_4',
    'wh2_dlc10_def_cha_crone_5',
    'wh2_dlc10_def_cha_supreme_sorceress_beasts_1',
    'wh2_dlc10_def_cha_supreme_sorceress_beasts_2',
    'wh2_dlc10_def_cha_supreme_sorceress_beasts_3',
    'wh2_dlc10_def_cha_supreme_sorceress_beasts_4',
    'wh2_dlc10_def_cha_supreme_sorceress_beasts_5',
    'wh2_dlc10_def_cha_supreme_sorceress_dark_1',
    'wh2_dlc10_def_cha_supreme_sorceress_dark_2',
    'wh2_dlc10_def_cha_supreme_sorceress_dark_3',
    'wh2_dlc10_def_cha_supreme_sorceress_dark_4',
    'wh2_dlc10_def_cha_supreme_sorceress_dark_5',
    'wh2_dlc10_def_cha_supreme_sorceress_death_1',
    'wh2_dlc10_def_cha_supreme_sorceress_death_2',
    'wh2_dlc10_def_cha_supreme_sorceress_death_3',
    'wh2_dlc10_def_cha_supreme_sorceress_death_4',
    'wh2_dlc10_def_cha_supreme_sorceress_death_5',
    'wh2_dlc10_def_cha_supreme_sorceress_fire_1',
    'wh2_dlc10_def_cha_supreme_sorceress_fire_2',
    'wh2_dlc10_def_cha_supreme_sorceress_fire_3',
    'wh2_dlc10_def_cha_supreme_sorceress_fire_4',
    'wh2_dlc10_def_cha_supreme_sorceress_fire_5',
    'wh2_dlc10_def_cha_supreme_sorceress_shadow_1',
    'wh2_dlc10_def_cha_supreme_sorceress_shadow_2',
    'wh2_dlc10_def_cha_supreme_sorceress_shadow_3',
    'wh2_dlc10_def_cha_supreme_sorceress_shadow_4',
    'wh2_dlc10_def_cha_supreme_sorceress_shadow_5',
    'wh2_dlc11_def_cha_lokhir_fellheart_1',
    'wh2_dlc14_def_cha_high_beastmaster_1',
    'wh2_dlc14_def_cha_high_beastmaster_2',
    'wh2_dlc14_def_cha_malus_darkblade_1_mp',
    'wh2_main_def_cha_dreadlord_1',
    'wh2_main_def_cha_dreadlord_2',
    'wh2_main_def_cha_dreadlord_3',
    'wh2_main_def_cha_dreadlord_4',
    'wh2_main_def_cha_dreadlord_5',
    'wh2_main_def_cha_dreadlord_female_1',
    'wh2_main_def_cha_dreadlord_female_2',
    'wh2_main_def_cha_dreadlord_female_3',
    'wh2_main_def_cha_dreadlord_female_4',
    'wh2_main_def_cha_dreadlord_female_5',
    'wh2_main_def_cha_malekith_1',
    'wh2_main_def_cha_malekith_2',
    'wh2_main_def_cha_malekith_3',
    'wh2_main_def_cha_morathi_1',
    'wh2_twa03_def_cha_rakarth_1',
    'wh2_twa03_def_cha_rakarth_2',
    'wh2_twa03_def_cha_rakarth_3',
    'wh2_dlc10_def_cha_sorceress_beasts_1',
    'wh2_dlc10_def_cha_sorceress_beasts_2',
    'wh2_dlc10_def_cha_sorceress_beasts_3',
    'wh2_dlc10_def_cha_sorceress_death_1',
    'wh2_dlc10_def_cha_sorceress_death_2',
    'wh2_dlc10_def_cha_sorceress_death_3',
    'wh2_dlc14_def_cha_master_1',
    'wh2_dlc14_def_cha_master_2',
    'wh2_dlc14_def_cha_master_3',
    'wh2_dlc14_def_cha_master_4',
    'wh2_main_def_cha_death_hag_1',
    'wh2_main_def_cha_sorceress_dark_1',
    'wh2_main_def_cha_sorceress_dark_2',
    'wh2_main_def_cha_sorceress_dark_3',
    'wh2_main_def_cha_sorceress_fire_1',
    'wh2_main_def_cha_sorceress_fire_2',
    'wh2_main_def_cha_sorceress_fire_3',
    'wh2_main_def_cha_sorceress_shadow_1',
    'wh2_main_def_cha_sorceress_shadow_2',
    'wh2_main_def_cha_sorceress_shadow_3',
];

const dwarfsUnitVariants = ['wh2_dlc17_dwf_cha_thorek_ironbrow_1', 'wh_dlc06_dwf_cha_runelord_1'];

const empireUnitsVariants = [
    'wh_dlc03_emp_cha_boris_todbringer_1',
    'wh_dlc03_emp_cha_boris_todbringer_2',
    'wh_dlc03_emp_cha_boris_todbringer_3',
    'wh_dlc04_emp_cha_arch_lector_1',
    'wh_dlc04_emp_cha_arch_lector_2',
    'wh_dlc04_emp_cha_volkmar_the_grim_1',
    'wh_dlc04_emp_cha_volkmar_the_grim_2',
    'wh_dlc04_emp_cha_volkmar_the_grim_3',
    'wh_main_emp_cha_balthasar_gelt_1',
    'wh_main_emp_cha_balthasar_gelt_2',
    'wh_main_emp_cha_balthasar_gelt_3',
    'wh_main_emp_cha_general_1',
    'wh_main_emp_cha_general_2',
    'wh_main_emp_cha_general_3',
    'wh_main_emp_cha_general_4',
    'wh_main_emp_cha_karl_franz_1',
    'wh_main_emp_cha_karl_franz_2',
    'wh_main_emp_cha_karl_franz_3',
    'wh_main_emp_cha_karl_franz_4',
    'wh2_pro07_emp_cha_wizard_death_1',
    'wh2_pro07_emp_cha_wizard_death_2',
    'wh2_pro07_emp_cha_wizard_death_3',
    'wh_dlc03_emp_cha_wizard_beasts_1',
    'wh_dlc03_emp_cha_wizard_beasts_2',
    'wh_dlc03_emp_cha_wizard_beasts_3',
    'wh_dlc03_emp_cha_wizard_beasts_4',
    'wh_dlc05_emp_cha_wizard_life_1',
    'wh_dlc05_emp_cha_wizard_life_2',
    'wh_dlc05_emp_cha_wizard_life_3',
    'wh_dlc05_emp_cha_wizard_shadows_1',
    'wh_dlc05_emp_cha_wizard_shadows_2',
    'wh_dlc05_emp_cha_wizard_shadows_3',
    'wh_main_emp_cha_captain_1',
    'wh_main_emp_cha_captain_2',
    'wh_main_emp_cha_captain_3',
    'wh_main_emp_cha_warrior_priest_1',
    'wh_main_emp_cha_warrior_priest_2',
    'wh_main_emp_cha_wizard_fire_1',
    'wh_main_emp_cha_wizard_fire_2',
    'wh_main_emp_cha_wizard_fire_3',
    'wh_main_emp_cha_wizard_heavens_1',
    'wh_main_emp_cha_wizard_heavens_2',
    'wh_main_emp_cha_wizard_heavens_4',
    'wh_main_emp_cha_wizard_light_1',
    'wh_main_emp_cha_wizard_light_2',
    'wh_main_emp_cha_wizard_light_4',
];

const greenskinsUnitVariants = [
    'wh_dlc06_grn_cha_night_goblin_warboss_1',
    'wh2_twa01_grn_cha_goblin_great_shaman_3',
    'wh_dlc06_grn_cha_wurrzag_1',
    'wh_main_grn_cha_azhag_the_slaughterer_1',
    'wh_main_grn_cha_goblin_great_shaman_1',
    'wh_main_grn_cha_goblin_great_shaman_2',
    'wh_main_grn_cha_orc_warboss_1',
    'wh_main_grn_cha_orc_warboss_2',
    'wh_main_grn_cha_orc_warboss_3',
    'wh2_pro09_grn_cha_black_orc_big_boss_1',
    'wh_main_grn_cha_goblin_big_boss_1',
    'wh_main_grn_cha_goblin_big_boss_2',
    'wh_main_grn_cha_goblin_big_boss_4',
    'wh_main_grn_cha_orc_shaman_1',
];

const highElvesUnitVariants = [
    'wh2_dlc10_hef_cha_alarielle_the_radiant_1',
    'wh2_dlc10_hef_cha_alarielle_the_radiant_2',
    'wh2_dlc10_hef_cha_alarielle_the_radiant_3',
    'wh2_dlc15_hef_cha_archmage_beasts_1',
    'wh2_dlc15_hef_cha_archmage_beasts_2',
    'wh2_dlc15_hef_cha_archmage_beasts_3',
    'wh2_dlc15_hef_cha_archmage_beasts_4',
    'wh2_dlc15_hef_cha_archmage_death_1',
    'wh2_dlc15_hef_cha_archmage_death_2',
    'wh2_dlc15_hef_cha_archmage_death_3',
    'wh2_dlc15_hef_cha_archmage_death_4',
    'wh2_dlc15_hef_cha_archmage_fire_1',
    'wh2_dlc15_hef_cha_archmage_fire_2',
    'wh2_dlc15_hef_cha_archmage_fire_3',
    'wh2_dlc15_hef_cha_archmage_fire_4',
    'wh2_dlc15_hef_cha_archmage_heavens_1',
    'wh2_dlc15_hef_cha_archmage_heavens_2',
    'wh2_dlc15_hef_cha_archmage_heavens_3',
    'wh2_dlc15_hef_cha_archmage_heavens_4',
    'wh2_dlc15_hef_cha_archmage_high_1',
    'wh2_dlc15_hef_cha_archmage_high_2',
    'wh2_dlc15_hef_cha_archmage_high_3',
    'wh2_dlc15_hef_cha_archmage_high_4',
    'wh2_dlc15_hef_cha_archmage_life_1',
    'wh2_dlc15_hef_cha_archmage_life_2',
    'wh2_dlc15_hef_cha_archmage_life_3',
    'wh2_dlc15_hef_cha_archmage_life_4',
    'wh2_dlc15_hef_cha_archmage_light_1',
    'wh2_dlc15_hef_cha_archmage_light_2',
    'wh2_dlc15_hef_cha_archmage_light_3',
    'wh2_dlc15_hef_cha_archmage_light_4',
    'wh2_dlc15_hef_cha_archmage_metal_1',
    'wh2_dlc15_hef_cha_archmage_metal_2',
    'wh2_dlc15_hef_cha_archmage_metal_3',
    'wh2_dlc15_hef_cha_archmage_metal_4',
    'wh2_dlc15_hef_cha_archmage_shadows_1',
    'wh2_dlc15_hef_cha_archmage_shadows_2',
    'wh2_dlc15_hef_cha_archmage_shadows_3',
    'wh2_dlc15_hef_cha_archmage_shadows_4',
    'wh2_dlc15_hef_cha_eltharion_the_grim_1',
    'wh2_dlc15_hef_cha_eltharion_the_grim_2',
    'wh2_dlc15_hef_cha_imrik_1',
    'wh2_dlc15_hef_cha_imrik_2',
    'wh2_dlc15_hef_cha_prince_6',
    'wh2_dlc15_hef_cha_princess_6',
    'wh2_dlc15_hef_cha_teclis_2',
    'wh2_main_hef_cha_prince_2',
    'wh2_main_hef_cha_prince_3',
    'wh2_main_hef_cha_prince_4',
    'wh2_main_hef_cha_prince_5',
    'wh2_main_hef_cha_princess_1',
    'wh2_main_hef_cha_princess_3',
    'wh2_main_hef_cha_princess_4',
    'wh2_main_hef_cha_princess_5',
    'wh2_main_hef_cha_teclis_1',
    'wh2_main_hef_cha_tyrion_1',
    'wh2_dlc10_hef_cha_handmaiden_1',
    'wh2_dlc10_hef_cha_handmaiden_2',
    'wh2_dlc10_hef_cha_mage_heavens_1',
    'wh2_dlc10_hef_cha_mage_heavens_2',
    'wh2_dlc10_hef_cha_mage_shadows_1',
    'wh2_dlc10_hef_cha_mage_shadows_2',
    'wh2_dlc15_hef_cha_mage_beasts_1',
    'wh2_dlc15_hef_cha_mage_beasts_2',
    'wh2_dlc15_hef_cha_mage_death_1',
    'wh2_dlc15_hef_cha_mage_death_2',
    'wh2_dlc15_hef_cha_mage_fire_1',
    'wh2_dlc15_hef_cha_mage_fire_2',
    'wh2_dlc15_hef_cha_mage_metal_1',
    'wh2_dlc15_hef_cha_mage_metal_2',
    'wh2_main_hef_cha_mage_high_1',
    'wh2_main_hef_cha_mage_high_4',
    'wh2_main_hef_cha_mage_life_4',
    'wh2_main_hef_cha_mage_life_1',
    'wh2_main_hef_cha_mage_light_1',
    'wh2_main_hef_cha_mage_light_4',
    'wh2_main_hef_cha_noble_2',
    'wh2_main_hef_cha_noble_3',
    'wh2_main_hef_cha_noble_4',
    'wh2_main_hef_cha_alastair_3',
    'wh2_main_hef_cha_alastair_4',
    'wh2_main_hef_cha_alastair_5',
    'wh2_dlc15_hef_cha_alastair_1',
];

const lizardmensUnitVariants = [
    'wh2_dlc12_lzd_cha_skink_chief_red_crested_1',
    'wh2_dlc12_lzd_cha_skink_chief_red_crested_2',
    'wh2_dlc12_lzd_cha_skink_chief_red_crested_3',
    'wh2_dlc12_lzd_cha_tehenhauin_1',
    'wh2_dlc12_lzd_cha_tehenhauin_2',
    'wh2_dlc12_lzd_cha_tehenhauin_3',
    'wh2_main_lzd_cha_kroq_gar_1',
    'wh2_main_lzd_cha_kroq_gar_2',
    'wh2_main_lzd_cha_kroq_gar_3',
    'wh2_main_lzd_cha_lord_mazdamundi_1',
    'wh2_main_lzd_cha_saurus_old_blood_1',
    'wh2_main_lzd_cha_saurus_old_blood_2',
    'wh2_dlc12_lzd_cha_skink_priest_beasts_4',
    'wh2_dlc12_lzd_cha_skink_priest_heavens_4',
    'wh2_main_lzd_cha_saurus_scar_veteran_1',
    'wh2_main_lzd_cha_saurus_scar_veteran_2',
    'wh2_main_lzd_cha_skink_chief_1',
    'wh2_main_lzd_cha_skink_chief_2',
    'wh2_main_lzd_cha_skink_chief_3',
    'wh2_main_lzd_cha_skink_priest_beasts_1',
    'wh2_main_lzd_cha_skink_priest_beasts_2',
    'wh2_main_lzd_cha_skink_priest_beasts_3',
    'wh2_main_lzd_cha_skink_priest_heavens_1',
    'wh2_main_lzd_cha_skink_priest_heavens_2',
    'wh2_main_lzd_cha_skink_priest_heavens_3',
];

const norscaUnitVariants = [
    'wh_dlc08_nor_cha_wulfrik_1',
    'wh_dlc08_nor_cha_wulfrik_2',
    'wh_dlc08_nor_cha_wulfrik_3',
    'wh_main_nor_cha_marauder_chieftan_1',
    'wh_main_nor_cha_marauder_chieftan_2',
    'wh_main_nor_cha_marauder_chieftan_3',
    'wh_dlc08_nor_cha_shaman_sorcerer_death_1',
    'wh_dlc08_nor_cha_shaman_sorcerer_death_2',
    'wh_dlc08_nor_cha_shaman_sorcerer_fire_1',
    'wh_dlc08_nor_cha_shaman_sorcerer_fire_2',
    'wh_dlc08_nor_cha_shaman_sorcerer_metal_1',
    'wh_dlc08_nor_cha_shaman_sorcerer_metal_2',
];

const skavensUnitVariants = [
    'wh2_dlc12_skv_cha_ikit_claw_1',
    'wh2_dlc12_skv_cha_ikit_claw_2',
    'wh2_dlc12_skv_cha_warlock_master_1',
    'wh2_dlc12_skv_cha_warlock_master_2',
    'wh2_dlc16_skv_cha_throt_the_unclean_2',
    'wh2_dlc16_skv_cha_warlord_2',
    'wh2_main_skv_cha_grey_seer_plague_1',
    'wh2_main_skv_cha_grey_seer_ruin_1',
    'wh2_main_skv_cha_warlord_1',
    'wh2_dlc16_skv_cha_chieftain_1',
    'wh2_dlc16_skv_cha_packmaster_2',
    'wh2_main_skv_cha_plague_priest_2',
];

const tombKingsUnitVariants = [
    'wh2_dlc09_tmb_cha_arkhan_1',
    'wh2_dlc09_tmb_cha_arkhan_2',
    'wh2_dlc09_tmb_cha_khalida_1',
    'wh2_dlc09_tmb_cha_khalida_2',
    'wh2_dlc09_tmb_cha_khatep_1',
    'wh2_dlc09_tmb_cha_khatep_2',
    'wh2_dlc09_tmb_cha_khatep_3',
    'wh2_dlc09_tmb_cha_settra_1',
    'wh2_dlc09_tmb_cha_settra_2',
    'wh2_dlc09_tmb_cha_settra_3',
    'wh2_dlc09_tmb_cha_tomb_king_1',
    'wh2_dlc09_tmb_cha_tomb_king_2',
    'wh2_dlc09_tmb_cha_tomb_king_3',
    'wh2_dlc09_tmb_cha_liche_priest_death_1',
    'wh2_dlc09_tmb_cha_liche_priest_light_1',
    'wh2_dlc09_tmb_cha_liche_priest_shadow_1',
    'wh2_dlc09_tmb_cha_liche_priest_nehekhara_1',
    'wh2_dlc09_tmb_cha_necrotect_1',
    'wh2_dlc09_tmb_cha_tomb_prince_1',
    'wh2_dlc09_tmb_cha_tomb_prince_2',
];

const vampireCoastUnitVariants = [
    'wh2_dlc11_cst_cha_aranessa_1',
    'wh2_dlc11_cst_cha_cylostra_direfin_1',
    'wh2_dlc11_cst_cha_luthor_harkon_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_death_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_deeps_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_female_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_female_death_1',
    'wh2_dlc11_cst_cha_vampire_fleet_admiral_female_deeps_1',
    'wh2_dlc11_cst_inf_count_noctilus_1',
    'wh2_dlc11_cst_cha_gunnery_wight_1',
    'wh2_dlc11_cst_cha_vampire_fleet_captain_1',
    'wh2_dlc11_cst_cha_vampire_fleet_captain_death_1',
    'wh2_dlc11_cst_cha_vampire_fleet_captain_deeps_1',
    'wh2_dlc11_cst_cha_damned_paladin_1',
];

const vampireCountsUnitVariants = [
    'wh2_dlc11_vmp_cha_bloodline_blood_dragon_lord_1',
    'wh2_dlc11_vmp_cha_bloodline_blood_dragon_lord_2',
    'wh2_dlc11_vmp_cha_bloodline_blood_dragon_lord_3',
    'wh2_dlc11_vmp_cha_bloodline_lahmian_lord_1',
    'wh2_dlc11_vmp_cha_bloodline_lahmian_lord_2',
    'wh2_dlc11_vmp_cha_bloodline_lahmian_lord_3',
    'wh2_dlc11_vmp_cha_bloodline_necrarch_lord_1',
    'wh2_dlc11_vmp_cha_bloodline_necrarch_lord_2',
    'wh2_dlc11_vmp_cha_bloodline_necrarch_lord_3',
    'wh2_dlc11_vmp_cha_bloodline_strigoi_lord_1',
    'wh2_dlc11_vmp_cha_bloodline_von_carstein_lord_1',
    'wh2_dlc11_vmp_cha_bloodline_von_carstein_lord_2',
    'wh2_dlc11_vmp_cha_bloodline_von_carstein_lord_3',
    'wh2_dlc11_vmp_cha_heinrich_kemmler_1',
    'wh_dlc04_vmp_cha_helman_ghorst_1',
    'wh_dlc04_vmp_cha_master_necromancer_1',
    'wh_dlc04_vmp_cha_master_necromancer_2',
    'wh_dlc04_vmp_cha_master_necromancer_3',
    'wh_dlc04_vmp_cha_strigoi_ghoul_king_1',
    'wh_dlc05_vmp_cha_red_duke_1',
    'wh_dlc05_vmp_cha_red_duke_2',
    'wh_dlc05_vmp_cha_red_duke_3',
    'wh_main_vmp_cha_mannfred_von_carstein_2',
    'wh_main_vmp_cha_mannfred_von_carstein_3',
    'wh_main_vmp_cha_mannfred_von_carstein_4',
    'wh_main_vmp_cha_master_necromancer_4',
    'wh_main_vmp_cha_master_necromancer_5',
    'wh_main_vmp_cha_vampire_lord_2',
    'wh_main_vmp_cha_vampire_lord_3',
    'wh_main_vmp_cha_vampire_lord_5',
    'wh_pro02_vmp_cha_isabella_von_carstein_2',
    'wh_pro02_vmp_cha_isabella_von_carstein_4',
    'wh_dlc04_vmp_cha_necromancer_1',
    'wh_dlc04_vmp_cha_necromancer_2',
    'wh_dlc04_vmp_cha_necromancer_3',
    'wh_dlc05_vmp_cha_vampire_shadows_1',
    'wh_dlc05_vmp_cha_vampire_shadows_2',
    'wh_main_vmp_cha_necromancer_5',
    'wh_main_vmp_cha_vampire_1',
    'wh_main_vmp_cha_vampire_2',
    'wh_main_vmp_cha_wight_king_1',
    'wh_main_vmp_cha_wight_king_2',
];

const woodElvesUnitVariants = [
    'wh2_dlc16_wef_cha_female_glade_lord_4',
    'wh2_dlc16_wef_cha_glade_lord_4',
    'wh2_dlc16_wef_cha_sisters_of_twilight_1',
    'wh2_dlc16_wef_cha_spellweaver_beasts_1',
    'wh2_dlc16_wef_cha_spellweaver_beasts_2',
    'wh2_dlc16_wef_cha_spellweaver_beasts_3',
    'wh2_dlc16_wef_cha_spellweaver_dark_1',
    'wh2_dlc16_wef_cha_spellweaver_dark_2',
    'wh2_dlc16_wef_cha_spellweaver_dark_3',
    'wh2_dlc16_wef_cha_spellweaver_high_1',
    'wh2_dlc16_wef_cha_spellweaver_high_2',
    'wh2_dlc16_wef_cha_spellweaver_high_3',
    'wh2_dlc16_wef_cha_spellweaver_life_1',
    'wh2_dlc16_wef_cha_spellweaver_life_2',
    'wh2_dlc16_wef_cha_spellweaver_life_3',
    'wh2_dlc16_wef_cha_spellweaver_shadows_1',
    'wh2_dlc16_wef_cha_spellweaver_shadows_2',
    'wh2_dlc16_wef_cha_spellweaver_shadows_3',
    'wh_dlc05_wef_cha_female_glade_lord_1',
    'wh_dlc05_wef_cha_female_glade_lord_2',
    'wh_dlc05_wef_cha_female_glade_lord_3',
    'wh_dlc05_wef_cha_glade_lord_1',
    'wh_dlc05_wef_cha_glade_lord_2',
    'wh_dlc05_wef_cha_glade_lord_3',
    'wh2_twa02_wef_cha_glade_captain_1',
    'wh2_twa02_wef_cha_glade_captain_2',
    'wh2_twa02_wef_cha_glade_captain_3',
    'wh_dlc05_wef_cha_spellsinger_beasts_1',
    'wh_dlc05_wef_cha_spellsinger_beasts_2',
    'wh_dlc05_wef_cha_spellsinger_beasts_3',
    'wh_dlc05_wef_cha_spellsinger_life_1',
    'wh_dlc05_wef_cha_spellsinger_life_2',
    'wh_dlc05_wef_cha_spellsinger_life_3',
    'wh_dlc05_wef_cha_spellsinger_shadows_1',
    'wh_dlc05_wef_cha_spellsinger_shadows_2',
    'wh_dlc05_wef_cha_spellsinger_shadows_3',
];

class FactionService {
    async getAllFactions(): Promise<Faction[]> {
        return await FactionModel.find({});
    }

    async getCathay() {
        return await factionAggregation('cathay', cathayUnitVariants);
    }

    async getKhorn() {
        return await factionAggregation('khorn', khornUnitVariants);
    }

    async getKislev() {
        return await factionAggregation('kislev', kislevUnitVariants);
    }

    async getNurgle() {
        return await factionAggregation('nurgle', nurgleUnitVariants);
    }

    async getOgres() {
        return await factionAggregation('ogres', ogresUnitVariants);
    }

    async getSlaanesh() {
        return await factionAggregation('slaanesh', slaaneshUnitVariants);
    }

    async getTzeentch() {
        return await factionAggregation('tzeentch', tzeentchUnitVariants);
    }

    async getBeastmens() {
        return await factionAggregation('beastmens', beastmensUnitVariants);
    }

    async getBretonnia() {
        return await factionAggregation('bretonnia', bretonniaUnitVariants);
    }

    async getChaos() {
        return await factionAggregation('chaos', chaosUnitVariants);
    }

    async getDarkElves() {
        return await factionAggregation('dark-elves', darkElvesVariants);
    }

    async getDwarfs() {
        return await factionAggregation('dwarfs', dwarfsUnitVariants);
    }

    async getEmpire() {
        return await factionAggregation('empire', empireUnitsVariants);
    }

    async getGreenskins() {
        return await factionAggregation('greenskins', greenskinsUnitVariants);
    }

    async getHighElves() {
        return await factionAggregation('high-elves', highElvesUnitVariants);
    }

    async getLizardmens() {
        return await factionAggregation('lizardmens', lizardmensUnitVariants);
    }

    async getNorsca() {
        return await factionAggregation('norsca', norscaUnitVariants);
    }

    async getSkavens() {
        return await factionAggregation('skavens', skavensUnitVariants);
    }

    async getTombKings() {
        return await factionAggregation('tomb-kings', tombKingsUnitVariants);
    }

    async getVampireCoast() {
        return await factionAggregation('vampire-coast', vampireCoastUnitVariants);
    }

    async getVampireCounts() {
        return await factionAggregation('vampire-counts', vampireCountsUnitVariants);
    }

    async getWoodElves() {
        return await factionAggregation('wood-elves', woodElvesUnitVariants);
    }
}

export default new FactionService();
