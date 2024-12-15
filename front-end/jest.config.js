module.exports = {
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], 
  },
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy", 
    "\\.css$": "identity-obj-proxy", 
    "\\.svg$": "identity-obj-proxy", 
  },
  transformIgnorePatterns: ["/node_modules/"], 
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], 
};
