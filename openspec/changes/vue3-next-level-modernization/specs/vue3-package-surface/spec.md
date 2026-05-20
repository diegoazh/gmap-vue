# vue3-package-surface Specification

## Purpose

Define the public package surface for `@gmap-vue/v3` so consumers can import safely across Node and browser/CDN flows.

## Requirements

### Requirement: Export Contract and Metadata

The package metadata and exports map MUST define a stable, documented public surface for plugin root, components, composables, and keys. The system SHALL prevent undocumented deep imports from being treated as supported API.

#### Scenario: Supported entrypoints resolve

- GIVEN a consumer imports only documented entrypoints
- WHEN module resolution runs in ESM or CJS environments
- THEN each documented entrypoint MUST resolve to a build artifact
- AND TypeScript declarations MUST resolve for the same entrypoints

#### Scenario: Undocumented deep import is rejected

- GIVEN a consumer imports an undocumented internal path
- WHEN module resolution runs
- THEN the import MUST be treated as unsupported by contract

### Requirement: Build and CDN Alignment

Build outputs, package metadata, and CDN guidance MUST reference the same public artifacts and versioned paths.

#### Scenario: Metadata matches build outputs

- GIVEN a release-candidate build
- WHEN package metadata is validated against generated artifacts
- THEN all referenced runtime and type files MUST exist

#### Scenario: CDN example parity

- GIVEN documentation includes CDN usage
- WHEN the documented URL pattern is validated
- THEN the path SHALL map to published bundle artifacts for that version
