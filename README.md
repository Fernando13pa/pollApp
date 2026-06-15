# Poll App

Poll App is an Angular survey interface for creating, browsing, and voting on polls. The project is currently focused on the frontend experience: responsive layouts, SVG-based visuals, survey cards, creation screens, and detail/result views.

## Preview

The home screen is based on the provided `Home.svg` design reference and uses the assets in `public/imgs` and `public/asset`.

Current visual direction:

- Dark violet app background.
- Warm orange/apricot highlights.
- SVG hero artwork and logo.
- Responsive survey cards.
- Active and past survey filters.
- Survey detail and result views prepared for later logic.

## Tech Stack

- Angular 21
- TypeScript
- SCSS
- Angular Router
- SVG assets served from `public`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build the project:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project Structure

```text
pollApp/
  public/
    asset/        # UI icons
    imgs/         # Logo and hero illustrations
  src/
    app/
      layout/     # Header and layout components
      shared/
        components/
          home/
          create-survey/
          survey-card/
          survey-detail/
          survey-results/
        interfaces/
        services/
    styles.scss   # Global design tokens and shared styles
```

## Main Features

- Home page with hero section and survey overview.
- Ending-soon survey cards.
- Active and past survey filter controls.
- Create survey view.
- Survey detail view.
- Result display component.
- Mock survey data through an Angular service.

## Design Assets

The app uses these design and asset files:

- `design/Home.svg`
- `design/Create Survey.svg`
- `design/Create Survey added quistion.svg`
- `design/Single survey view  + results.svg`
- `design/Single survey view  -  no results yet.svg`
- `public/imgs/poll_app_orange_hero.svg`
- `public/imgs/hero1.svg`
- `public/imgs/hero 2.svg`

## Development Notes

This project is still in frontend construction. Data persistence, complete voting logic, validation flows, and backend integration are planned future steps.
