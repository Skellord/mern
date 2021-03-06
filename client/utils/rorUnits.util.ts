const rorUnits = [
    'wh_dlc06_dwf_inf_warriors_dragonfire_pass_0',
    'wh_dlc06_dwf_inf_ekrund_miners_0',
    'wh_dlc06_dwf_inf_old_grumblers_0',
    'wh_dlc06_dwf_inf_dragonback_slayers_0',
    'wh_dlc06_dwf_inf_peak_gate_guard_0',
    'wh_dlc06_dwf_inf_norgrimlings_ironbreakers_0',
    'wh_dlc06_dwf_inf_ulthars_raiders_0',
    'wh_dlc06_dwf_inf_norgrimlings_irondrakes_0',
    'wh_dlc06_dwf_art_gob_lobber_0',
    'wh_dlc06_dwf_veh_skyhammer_0',
    'wh_dlc04_emp_cav_zintlers_reiksguard_0',
    'wh_dlc04_emp_cav_royal_altdorf_gryphites_0',
    'wh_dlc04_emp_inf_sigmars_sons_0',
    'wh_dlc04_emp_inf_tattersouls_0',
    'wh_dlc04_emp_inf_silver_bullets_0',
    'wh_dlc04_emp_inf_stirlands_revenge_0',
    'wh_dlc04_emp_art_sunmaker_0',
    'wh_dlc04_emp_art_hammer_of_the_witches_0',
    'wh_dlc04_emp_veh_templehof_luminark_0',
    'wh_dlc06_grn_cav_teef_robbers_0',
    'wh_dlc06_grn_cav_durkits_squigs_0',
    'wh_dlc06_grn_cav_moon_howlers_0',
    'wh_dlc06_grn_cav_broken_tusks_mob_0',
    'wh_dlc06_grn_inf_da_eight_peaks_loonies_0',
    'wh_dlc06_grn_inf_da_eight_peaks_loonies_0',
    'wh_dlc06_grn_inf_da_warlords_boyz_0',
    'wh_dlc06_grn_inf_krimson_killerz_0',
    'wh_dlc06_grn_cav_deff_creepers_0',
    'wh_dlc06_grn_cav_mogrubbs_marauders_0',
    'wh_dlc06_grn_inf_da_rusty_arrers_0',
    'wh_dlc06_grn_mon_venom_queen_0',
    'wh_dlc06_grn_art_hammer_of_gork_0',
    'wh_dlc04_vmp_veh_claw_of_nagash_0',
    'wh_dlc04_vmp_cav_chillgheists_0',
    'wh_dlc04_vmp_cav_vereks_reavers_0',
    'wh_dlc04_vmp_inf_tithe_0',
    'wh_dlc04_vmp_inf_konigstein_stalkers_0',
    'wh_dlc04_vmp_inf_feasters_in_the_dusk_0',
    'wh_dlc04_vmp_inf_sternsmen_0',
    'wh_dlc04_vmp_mon_devils_swartzhafen_0',
    'wh_dlc04_vmp_mon_direpack_0',
];

export const isRorUnit = (name: string): boolean => {
    return rorUnits.some(v => name.includes(v)) || name.split('_').includes('ror');
};
