// utils/rpg-engine.ts

export const FIRST_LEVEL_XP = 250;
export const XP_MULTIPLIER = 1.5;

export const RPG_RANKS = [
  "Fledgling", "Novice", "Apprentice", "Wanderer", "Wayfarer", // 1-25
  "Squire", "Man-at-Arms", "Knight", "Vanguard", "Templar",    // 26-50
  "Spellblade", "Mystic", "Sorcerer", "Warlock", "Archmage",   // 51-75
  "Pathfinder", "Ranger", "Assassin", "Shadowblade", "Reaper", // 76-100
  "Inquisitor", "Paladin", "Crusader", "Champion", "Warlord",  // 101-125
  "Mythic", "Exalted", "Ascended", "Demi-God", "Eternal Isus"  // 126-150+
];

/**
 * Рассчитывает уровень на основе общего количества XP (геометрическая прогрессия)
 */
export const getLevelFromExp = (exp: number): number => {
  if (exp < FIRST_LEVEL_XP) return 1;
  return Math.floor(Math.log((exp * (XP_MULTIPLIER - 1) / FIRST_LEVEL_XP) + 1) / Math.log(XP_MULTIPLIER)) + 1;
};

/**
 * Рассчитывает, сколько ВСЕГО опыта нужно для достижения конкретного уровня
 */
export const getTotalExpForLevel = (lvl: number): number => {
  if (lvl <= 1) return 0;
  return Math.floor(FIRST_LEVEL_XP * (Math.pow(XP_MULTIPLIER, lvl - 1) - 1) / (XP_MULTIPLIER - 1));
};

/**
 * Возвращает строковое название ранга (меняется каждые 5 уровней)
 */
export const getRankByLevel = (lvl: number): string => {
  const index = Math.floor((lvl - 1) / 5);
  return RPG_RANKS[Math.min(index, RPG_RANKS.length - 1)];
};

/**
 * Возвращает данные для прогресс-бара
 */
export const getLevelProgress = (totalExp: number) => {
  const currentLevel = getLevelFromExp(totalExp);
  const xpStart = getTotalExpForLevel(currentLevel);
  const xpNext = getTotalExpForLevel(currentLevel + 1);
  
  const xpInCurrentLevel = totalExp - xpStart;
  const xpRequiredForNext = xpNext - xpStart;
  const percentage = Math.min((xpInCurrentLevel / xpRequiredForNext) * 100, 100);

  return {
    currentLevel,
    rank: getRankByLevel(currentLevel),
    xpInCurrentLevel: Math.floor(xpInCurrentLevel),
    xpRequiredForNext: Math.floor(xpRequiredForNext),
    percentage
  };
};