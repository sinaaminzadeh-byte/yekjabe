// audit-only config — NOT wired into `bun run lint` (findings, not gates).
// Composes the project's base flat config + eslint-plugin-security warnings.
import base from "./eslint.config.mjs";
import security from "eslint-plugin-security";

const securityRules = {
  files: ["src/**/*.{ts,tsx}"],
  plugins: { security },
  rules: {
    "security/detect-object-injection": "warn",
    "security/detect-child-process": "warn",
    "security/detect-eval-with-expression": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-unsafe-regex": "warn",
    "security/detect-new-buffer": "warn",
    "security/detect-possible-timing-attacks": "warn",
  },
};

const auditConfig = [...base, securityRules];
export default auditConfig;
