export default {
  preset: 'ts-jest/presets/default-esm', // For ESM support
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  extensionsToTreatAsEsm: [".js"]
};
