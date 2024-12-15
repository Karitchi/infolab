module.exports = {
  testEnvironment: "node",
  testTimeout: 30000, // Augmente à 30 secondes
  roots: ["<rootDir>/app/lib/__test__"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleFileExtensions: ["js", "json", "node", "jsx"],
  transformIgnorePatterns: ["/node_modules/(?!@testcontainers|pg)"], // Ajouter pg ici
  transform: {
    "^.+\\.[jt]sx?$": [
      "esbuild-jest-transform",
      {
        target: "es2015", // Option pour cibler une version ECMAScript spécifique
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
};
