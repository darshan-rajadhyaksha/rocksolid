# Contributing

Thank you for contributing!

We welcome bug fixes, features, documentation, tests, and improvements.

## Getting Started

1. Fork the repository.
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/rocksolid.git
cd rocksolid
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/darshan-rajadhyaksha/rocksolid.git
```

4. Install dependencies:

```bash
npm install
```

## Create a Branch

Create a branch for your changes:

```bash
git checkout -b feat/my-feature
```

Use prefixes such as:

- `feat/` — feature
- `fix/` — bug fix
- `docs/` — documentation
- `refactor/` — refactoring
- `test/` — tests

Do not work directly on `main`.

## Make Changes

- Follow the existing code style.
- Add or update tests when needed.
- Update documentation when needed.
- Add Storybook stories for UI changes when appropriate.

## Test Your Changes

Before submitting a PR, run:

```bash
npm test
npm run build
```

## Commit

Use a clear commit message:

```bash
git add .
git commit -m "feat: add tooltip component"
```

## Push Your Changes

```bash
git push origin feat/my-feature
```

## Create a Pull Request

Open a Pull Request from your fork to the original repository's `main` branch.

The `PULL_REQUEST_TEMPLATE.md` will guide you through the required information.

## Code Review

Maintainers may request changes. Make the changes on the same branch and push again:

```bash
git add .
git commit -m "fix: address review feedback"
git push origin feat/my-feature
```

Your existing Pull Request will update automatically.

## Questions & Bugs

- Use the **Bug Report** template for bugs.
- Use the **Feature Request** template for feature proposals.
- Check existing issues before opening a new one.

## Code of Conduct

Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

Thank you for contributing!