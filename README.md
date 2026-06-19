# Poll App

A survey platform where users can browse active polls, vote on them, and create their own. Built as a school project for Developer Akademie.

**Live demo:** [luis-fernando-cun-ramirez.developerakademie.net/pollApp](https://luis-fernando-cun-ramirez.developerakademie.net/pollApp/)

---

## Features

- **Home screen** — overview of all surveys with tabs for active and past ones
- **Ending soon** — urgent surveys displayed at the top, sorted by closest deadline
- **Survey detail** — full question view with single and multiple-choice answers
- **Live results** — vote counts and percentages update in real time after submitting
- **Create survey** — dynamic form to build a new survey with custom questions and answer options
- **Validation** — required fields are clearly marked; the publish button stays disabled until the form is valid

## Tech stack

- Angular 19
- TypeScript
- SCSS
- Angular Signals

## Screenshots

| Home | Survey detail | Create survey |
|------|---------------|---------------|
| ![Home](public/imgs/hero1.svg) | | |

## What I learned

- Building reactive UIs with Angular Signals and `computed()`
- Managing dynamic forms without reactive forms module
- Component composition with standalone components
- Deploying an Angular app to a shared FTP server with a custom `base-href`
