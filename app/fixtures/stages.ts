export const stages = [
  {
    uuid: 'boneyard-uuid',
    logo: 'https://via.placeholder.com/150x75/4ECDC4/FFFFFF?text=BONEYARD',
    name: 'BONEYARD',
  },
  {
    uuid: 'pandaemonium-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=PANDÆMONIUM',
    name: 'PANDÆMONIUM',
  },
  {
    uuid: 'biergarten-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=BIERGARTEN',
    name: 'BIERGARTEN',
  },
  {
    uuid: 'gehenna-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=GEHENNA',
    name: 'GEHENNA',
  },
  {
    uuid: 'hades-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=HADES',
    name: 'HADES',
  },
  {
    uuid: 'udgaard-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=UDGAARD',
    name: 'UDGAARD',
  },
  {
    uuid: 'helviti-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=HELVÍTI',
    name: 'HELVÍTI',
  },
  {
    uuid: 'mobil-scene-uuid',
    logo: 'https://via.placeholder.com/150x75/45B7D1/FFFFFF?text=MOBIL+SCENE',
    name: 'MOBIL SCENE',
  },
  {
    uuid: 'copenhell-con-uuid',
    logo: 'https://via.placeholder.com/150x75/FF6B6B/FFFFFF?text=COPENHELL+CON',
    name: 'COPENHELL CON',
  },
]

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
