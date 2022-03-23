import { UnitCaste, UnitEntity } from '../types/units.types';
import { BASE_URL } from '../api/api';

export const hpResolver = (
    entity: UnitEntity,
    bonusHp: string,
    caste: UnitCaste,
    numMen: string,
    numMounts?: string,
    numEngine?: string
): number => {
    const bonus = parseInt(bonusHp);
    const men = parseInt(numMen);
    const mounts = numMounts ? parseInt(numMounts) : undefined;
    const engines = numEngine ? parseInt(numEngine) : undefined;
    let hpSum = (parseInt(entity.man_entity.hit_points) + bonus) * men;
    if (mounts && entity.mount_entity) {
        const mountsHp = (parseInt(entity.mount_entity.hit_points) + bonus) * mounts;
        hpSum = 8 * men + mountsHp; // 8 - hp 1ой сущности
    }
    if (engines && entity.engine_entity) {
        const crewHp = (parseInt(entity.man_entity.hit_points) + bonus) * men;
        const engineHp = (parseInt(entity.engine_entity.hit_points) + bonus) * engines;
        hpSum = crewHp + engineHp;
    }
    if (engines && entity.engine_entity && mounts) {
        const crewHp = 8 * men + 8 * mounts;
        const engineHp = (parseInt(entity.engine_entity.hit_points) + bonus) * engines;
        hpSum = crewHp + engineHp;
    }

    return hpSum;
};

export const numMenResolver = (numMen: string, numMounts?: string, numEngines?: string): string => {
    let num = numMen;

    if (numMounts && numMounts !== '0') {
        num = numMounts;
    }

    if (numEngines && numEngines !== '0') {
        num = numEngines;
    }

    return num;
};

export const contactPhaseResolver = (contactPhase: string) => {
    const phaseName = `phase_${contactPhase.split('_').slice(4)?.join('_')}`;
    if (contactPhase === 'wh3_main_unit_contact_warpflame') {
        return `${BASE_URL}/ability_icons/${contactPhase}.png`;
    }
    return `${BASE_URL}/effect_bundles/${phaseName}.png`;
};

export const magicalDmgSrc = `${BASE_URL}/effect_bundles/magical_attacks.png`;
