export const valueResolver = (currValue: number, maxValue: number): number => {
    return Math.ceil((currValue * 100) / maxValue);
};

export const maxVariables = {
    armour: 160,
    damModPhysical: 75,
    morale: 100,
    speed: 180,
    meleeAttack: 80,
    defence: 79,
    chargeBonus: 100,
    damage: 900,
    missileDamage: 1000,
};
