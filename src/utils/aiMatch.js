import { PROFESSIONALS } from '../data/constants';

export function aiMatch(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  
  return PROFESSIONALS.filter(p =>
    p.skills.some(s => s.toLowerCase().includes(q)) ||
    p.title.toLowerCase().includes(q) ||
    p.org.toLowerCase().includes(q) ||
    p.bio.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.location.toLowerCase().includes(q)
  ).sort((a, b) => {
    const aSkillMatch = a.skills.some(s => s.toLowerCase() === q) ? 1 : 0;
    const bSkillMatch = b.skills.some(s => s.toLowerCase() === q) ? 1 : 0;
    if (aSkillMatch !== bSkillMatch) return bSkillMatch - aSkillMatch;
    if (a.available !== b.available) return a.available ? -1 : 1;
    return b.rating - a.rating;
  });
}
