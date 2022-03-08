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
}

export default new FactionService();
