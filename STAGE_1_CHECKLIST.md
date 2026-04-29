# Stage 1 Checklist - GitHub Repository Setup

Use this checklist to complete Stage 1 from `docs/ghi-agent-pipeline/01-github-repo-setup.md`.

## 1) Repository Features

- [ ] `Issues` enabled in repository settings.
- [ ] `Projects` enabled (optional, recommended for agent flow visibility).

## 2) Agent Status Labels

Create these labels exactly (or keep stable aliases):

- [ ] `agent:new`
- [ ] `agent:planned`
- [ ] `agent:approved`
- [ ] `agent:implementing`
- [ ] `agent:testing`
- [ ] `agent:rework`
- [ ] `agent:ready-pr`
- [ ] `agent:failed`

Rule:

- [ ] Only one `agent:*` label should be active on an issue at any time.

## 3) Issue Templates

- [ ] `.github/ISSUE_TEMPLATE/feature_request.yml` exists and is usable.
- [ ] `.github/ISSUE_TEMPLATE/bug_fix.yml` exists and is usable.
- [ ] Both templates require:
  - [ ] context/problem
  - [ ] acceptance criteria
  - [ ] out-of-scope or constraints
  - [ ] test plan

## 4) Pull Request Template

- [ ] `.github/pull_request_template.md` exists.
- [ ] Template includes:
  - [ ] issue link (`Closes #...`)
  - [ ] change summary
  - [ ] verification checklist (lint/typecheck/tests)
  - [ ] risks/limitations

## 5) Main Branch Protection

For branch pattern `main`:

- [ ] Require a pull request before merging.
- [ ] Require approvals (1 approval is enough for MVP).
- [ ] Require approval of the most recent reviewable push.
- [ ] Require conversation resolution before merging.
- [ ] Do not allow bypassing the above settings.
- [ ] Keep `Allow force pushes` disabled.
- [ ] Keep `Allow deletions` disabled.

Later (after CI is ready):

- [ ] Require status checks to pass before merging.

## 6) Access and Permissions

- [ ] Agents/bot account can create branches and PRs.
- [ ] Agents/bot account cannot merge directly into `main`.

## 7) Quick Validation Run

- [ ] Create test issue from `Feature (agent)` template.
- [ ] Create test issue from `Bug fix (agent)` template.
- [ ] Open a PR and confirm PR template appears.
- [ ] Verify direct push to `main` is blocked by protection rules.

## Exit Criteria (Stage 1 Complete)

- [ ] All checks above are done.
- [ ] Repository is ready to proceed to Stage 2 (`02-issue-contract.md`).
