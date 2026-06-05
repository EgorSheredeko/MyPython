export const formatCurrency = (totalCopper: number) => {
  // 1 Золото = 10,000 Медяков
  const gold = Math.floor(totalCopper / 10000);
  
  // Остаток после золота делим на 100, чтобы получить Серебро
  const silver = Math.floor((totalCopper % 10000) / 100);
  
  // Все остальное — Медяки
  const copper = totalCopper % 100;

  return { gold, silver, copper };
};