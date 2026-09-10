# RockSolid

RockSolid is a modern UI component library built with **SolidJS** and **Tailwind CSS**

It provides accessible, customizable, and reusable components for building modern web applications.

[Read the Documentation](https://rocksolidjs.com/)

## Features

- Built with SolidJS
- Styled with Tailwind CSS
- Accessible components
- Themeable design system
- Dark mode support
- TypeScript support
- Customizable theme tokens

## Prerequisites

Before installing RockSolid, make sure your project has the following dependencies installed:

- SolidJS
- Tailwind CSS

If you are starting a new SolidJS project, set up SolidJS and Tailwind CSS first.

Install the required dependencies:

```bash
npm install solid-js tailwindcss
```

## Installation

Once the prerequisites are installed, install RockSolid:

```bash
npm install rocksolidjs
```

## Setup

Import the RockSolid stylesheet into your application's global CSS file:

```css
@import "tailwindcss";
@import "rocksolidjs/index.css";
/* Provide the relative path of the rocksolidjs package */
@source "../node_modules/rocksolidjs";
```

Make sure Tailwind CSS is configured in your project.

## Usage

Import components from RockSolid and use them in your SolidJS application:

```tsx
import Button from "rocksolidjs/Button";

export default function App() {
  return (
    <Button>
      Click me
    </Button>
  );
}
```

## Accessibility

RockSolid is designed with accessibility in mind.

Components follow common accessibility practices, including:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible interaction patterns
- Appropriate ARIA attributes where required

## TypeScript

RockSolid is written in TypeScript and provides type definitions for components, theme configuration, and APIs.

## Documentation

For detailed information about components, theming, accessibility, and customization, see the [RockSolid documentation.](https://rocksolidjs.com/)


## License

MIT