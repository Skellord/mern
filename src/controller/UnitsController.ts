import { NextFunction, Request, Response } from 'express';
import attributeService from '../service/attribute.service';
import entityService from '../service/entity.service';
import loreSpellsService from '../service/loreSpells.service';
import meleeWeaponService from '../service/meleeWeapon.service';
import missileWeaponService from '../service/missileWeapon.service';
import specialAbilityService from '../service/specialAbility.service';
import statsService from '../service/stats.service';
import unitService from '../service/unit.service';
import ApiError from '../utils/apiError.util';

interface UnitParams {
    name: string;
}

class UnitsController {
    async getAllUnits(req: Request, res: Response, next: NextFunction) {
        const units = await unitService.getAllUnits();
        if (!units) {
            next(ApiError.notFound());
            return;
        }
        res.json(units);
    }

    async getUnitStats(req: Request<UnitParams>, res: Response, next: NextFunction) {
        const { name } = req.params;
        const unitReq = await unitService.getUnit(name);
        if (!unitReq || unitReq.length === 0) {
            next(ApiError.notFound());
            return;
        }
        const unit = unitReq[0];
        const statsReq = await statsService.getUnitStats(unit.land_unit);
        if (!statsReq) {
            next(ApiError.internal('Stats not found'));
            return;
        }
        const entity = await entityService.getEntity(statsReq[0].man_entity);
        const meleeWeapon = await meleeWeaponService.getMeleeWeapon(statsReq[0].primary_melee_weapon);
        const missileWeapon =
            statsReq[0].primary_missile_weapon &&
            (await missileWeaponService.getMissileWeapon(statsReq[0].primary_missile_weapon));

        const loreSpells = await loreSpellsService.getLoreSpells(unit.unit);
        const specialAbilities = await specialAbilityService.getSpecialAbilities(unit.land_unit);
        const attributes = await attributeService.getAttributes(statsReq[0].attribute_group);
        const unitStatsBase = {
            ...unit,
            stats: { ...statsReq[0] },
            entity: { ...entity[0] },
            melee_damage: { ...meleeWeapon[0] },
            lore_spells: loreSpells[0]?.lore_spells,
            special_abilities: specialAbilities[0]?.special_abilities,
            attributes: attributes[0]?.attributes,
        };
        const unitRes = missileWeapon
            ? {
                  ...unitStatsBase,
                  missile_damage: { ...missileWeapon[0] },
              }
            : {
                  ...unitStatsBase,
              };

        res.json(unitRes);
    }
}

export default new UnitsController();
