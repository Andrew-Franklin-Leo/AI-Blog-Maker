## 2025-02-26 - Skip Link Interaction with Automation
**Learning:** "Skip to content" links positioned absolutely (even off-screen) can unexpectedly intercept pointer events in automated testing environments like Playwright, blocking clicks on underlying navigation elements.
**Action:** Always combine off-screen positioning (`-top-16`) with `pointer-events-none` when inactive, and `pointer-events-auto` when focused, to ensure both accessibility and testability.

## 2025-02-26 - HashRouter Skip Link Compatibility
**Learning:** Standard anchor links like `href="#main-content"` can conflict with `HashRouter` routing in React, potentially causing route disruptions when used for skip links.
**Action:** Use an `onClick` handler with `e.preventDefault()` to manually manage focus and scroll for skip links in projects using `HashRouter`.

## 2025-02-26 - CI Environment Globals
**Learning:** In projects using ESLint v9 flat config without exhaustive environment plugins, standard globals like 'clients' (Service Workers), 'process' (Node scripts), and 'require' (CommonJS config files) may be flagged as undefined.
**Action:** Use '/* global [name] */' comments at the top of these files to explicitly define them for the linter.

## 2025-02-26 - Security Scan Token Requirement
**Learning:** CI jobs using Snyk for security scanning will fail if the 'SNYK_TOKEN' is missing from the repository secrets, blocking the entire CI pipeline.
**Action:** Add 'continue-on-error: true' to the Snyk scan step to prevent missing secrets from blocking development, while still allowing the scan to run when possible.

## 2025-02-26 - Shell Injection in GitHub Actions
**Learning:** Directly interpolating untrusted GitHub context variables (like 'github.event.pull_request.head.ref') into shell scripts in GitHub Actions creates a critical security vulnerability (shell injection).
**Action:** Always map untrusted context variables to environment variables and use the environment variables in the shell script.
