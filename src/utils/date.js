function pad2(n){ return String(n).padStart(2, '0'); }

export function toHM(dateISO){
  const d = new Date(dateISO);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function durationLabel(fromISO, toISO){
  const diffMs = new Date(toISO) - new Date(fromISO);
  const totalMin = Math.max(0, Math.floor(diffMs / 60000));
  const days = Math.floor(totalMin / (60*24));
  const hours = Math.floor((totalMin - days*24*60) / 60);
  const minutes = totalMin - days*24*60 - hours*60;

  if (days > 0) return `${days}D ${pad2(hours)}H ${pad2(minutes)}M`;
  if (hours > 0) return `${pad2(hours)}H ${pad2(minutes)}M`;
  return `${minutes}M`;
}
