# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `CHANGELOG.md` following Keep a Changelog 1.1.0 format with version tracking back to `v1.0.0` and automated release changelog workflow integration (#1290).
- Per-donation CO₂ offset in donation API responses via `co2OffsetKg` field, computed as `amount_xlm × co2_per_xlm / 1000` across all donation endpoints (#365).
- On-chain USDC to XLM price conversion through a configured oracle adapter (#345).
- Untracked test coverage reports, added full coverage ignore rules in `.gitignore`, and configured CI to upload coverage reports as GitHub Actions workflow artifacts (#1046).
- Dead-letter handling for stats refresh background queue (`statsRefreshQueue.js`), including Sentry failure logging, `dead_letter` database table persistence, pg-boss archiving, and Prometheus `stats_refresh_failures_total` failure metric tracking (#1089).

### Changed

- Standardized release notes generation via `@semantic-release/changelog` in `.github/workflows/release.yml` to parse Conventional Commits into Keep a Changelog sections (#1290).
- Updated `moduleResolution` to `bundler` with `ES2020` target in backend `tsconfig.json`.

### Fixed

- Removed duplicate `defaults` key in backend CI workflow (`backend.yml`).
- Fixed invalid donation UUID format in `projects.campaigns.integration.test.js` and mocked Stellar Horizon `getTransaction` in `donations.integration.test.js`.
- Added `week` time period filter to leaderboard query, explicit 200 status on donation deduplication, and accurate milestone percentage calculation with webhook trigger on donation recording.
- Added synchronous profile update fallback in `profileQueue` when queue worker is not started and added webhook secret rotation columns to `schema.sql`.
- Awaited profile updates and milestone delivery in `donations.js` to eliminate race conditions, added polling in integration tests, and fixed PostgreSQL health check and CI integration skip configuration in `backend.yml`.

### Security

- Added webhook secret rotation column support in `schema.sql` and preserved Gitleaks secret scanning and DAST verification across CI workflows.

## [1.0.0] - 2025-01-01

### Added

- Wallet Connect integration via Freighter browser extension.
- Verified climate project discovery catalog with real-time impact metrics.
- Direct on-chain XLM donations to project wallets on Stellar.
- Soroban smart contract for donation recording and CO₂ offset tracking.
- Donor leaderboard ranked by total XLM contributed.
- Project updates feed enabling organizations to post progress updates to donors.
- Full CI/CD pipelines (lint, type-check, unit/integration test, build, E2E, and DAST) and `.github/workflows/release.yml` semantic release automation.
- Docker Compose development environment with hot reload.
- Backend REST API built with Express and PostgreSQL.
- Cross-platform mobile app (React Native / Expo) and browser extension.
- Helm chart for Kubernetes deployment.

### Changed

- Standardized monorepo workspace layout across `backend`, `frontend`, `mobile`, `extension`, and `contracts` packages for initial `v1.0.0` baseline release.

### Fixed

- Resolved initial Stellar Horizon testnet transaction confirmation handling and database migration ordering for `v1.0.0`.

### Security

- Integrated Gitleaks secret scanning in CI and enforced environment-variable-only secret configuration for Stellar and PostgreSQL credentials.

[Unreleased]: https://github.com/Emmy123222/Stellar-GreenPay/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Emmy123222/Stellar-GreenPay/releases/tag/v1.0.0
