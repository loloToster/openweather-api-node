import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["src", "node_modules"],
};

export default config;
