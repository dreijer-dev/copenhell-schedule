export const stages = [
  {
    uuid: 'copenhell-con-uuid',
    logo: 'https://via.placeholder.com/150x75/FF6B6B/FFFFFF?text=COPENHELL+CON',
  },
  {
    uuid: 'boneyard-uuid',
    logo: 'https://via.placeholder.com/150x75/4ECDC4/FFFFFF?text=BONEYARD',
  },
  {
    uuid: 'pandaemonium-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=PANDÆMONIUM',
  },
  {
    uuid: 'biergarten-uuid',
    logo: 'https://via.placeholder.com/150x75/F39C12/FFFFFF?text=BIERGARTEN',
  },
  {
    uuid: 'gehenna-uuid',
    logo: 'https://via.placeholder.com/150x75/E74C3C/FFFFFF?text=GEHENNA',
  },
  {
    uuid: 'hades-uuid',
    logo: 'https://via.placeholder.com/150x75/9B59B6/FFFFFF?text=HADES',
  },
  {
    uuid: 'udgaard-uuid',
    logo: 'https://via.placeholder.com/150x75/1ABC9C/FFFFFF?text=UDGAARD',
  },
  {
    uuid: 'helviti-uuid',
    logo: 'https://via.placeholder.com/150x75/34495E/FFFFFF?text=HELVÍTI',
  },
  {
    uuid: 'mobil-scene-uuid',
    logo: 'https://via.placeholder.com/150x75/16A085/FFFFFF?text=MOBIL+SCENE',
  },
]

// Keep the stage names mapping for the events.ts helper function
export const stageNames = {
  'COPENHELL CON': 'copenhell-con-uuid',
  BONEYARD: 'boneyard-uuid',
  PANDÆMONIUM: 'pandaemonium-uuid',
  BIERGARTEN: 'biergarten-uuid',
  GEHENNA: 'gehenna-uuid',
  HADES: 'hades-uuid',
  UDGAARD: 'udgaard-uuid',
  HELVÍTI: 'helviti-uuid',
  'MOBIL SCENE': 'mobil-scene-uuid',
}

type Stage = {
  uuid: string
  logo: string
}

export type { Stage }
