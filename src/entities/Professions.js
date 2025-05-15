
export const PROFESSIONS = {
  FARMER: {
    name: 'Farmer',
    color: '#4CAF50',
    workPlaces: ['FARMER_HOUSE'],
    workRadius: 3,
    skills: {
      farming: 1,
      gathering: 1
    }
  },
  FISHERMAN: {
    name: 'Fisherman',
    color: '#2196F3',
    workPlaces: ['FISHERMAN_HOUSE'],
    workRadius: 2,
    skills: {
      fishing: 1,
      swimming: 1
    }
  },
  LUMBERJACK: {
    name: 'Lumberjack',
    color: '#795548',
    workPlaces: ['LUMBERJACK_HOUSE'],
    workRadius: 4,
    skills: {
      woodcutting: 1,
      strength: 1
    }
  },
  MINER: {
    name: 'Miner',
    color: '#607D8B',
    workPlaces: ['MINER_HOUSE'],
    workRadius: 3,
    skills: {
      mining: 1,
      strength: 1
    }
  }
};

export function getProfessionByBuilding(buildingType) {
  for (const [profession, data] of Object.entries(PROFESSIONS)) {
    if (data.workPlaces.includes(buildingType)) {
      return profession;
    }
  }
  return null;
}
