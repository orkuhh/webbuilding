# Contributing to Division Builds

First off, thank you for considering contributing to Division Builds! It's people like you that make Division Builds such a great tool for the community.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read and follow it to ensure a welcoming environment for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Describe the behavior you observed and what you expected to see
- Include screenshots if possible
- Note your browser and operating system
- Include any relevant error messages

### Suggesting Enhancements

If you have ideas for new features or improvements:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code follows our coding standards
5. Include appropriate documentation
6. Issue the pull request

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with required variables (see README.md)

3. Start the development server:
```bash
npm run dev
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### CSS/Tailwind

- Follow the existing class naming pattern
- Use Tailwind utility classes when possible
- Keep styles modular and reusable
- Maintain responsive design principles

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant

Example:
```
feat: Add gear score filter to builds page

- Implement gear score range slider
- Add filter to build query
- Update UI to show current filter
- Add reset button

Closes #123
```

## Component Structure

When creating new components:

1. Place them in the appropriate directory under `src/components`
2. Follow the existing naming convention
3. Include proper PropTypes or TypeScript types
4. Add necessary comments and documentation
5. Consider reusability and modularity

Example component structure:
```jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentName({ prop1, prop2 }) {
  // Component logic here
  return (
    // JSX here
  );
}

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};
```

## Testing

- Write tests for new features
- Update tests when modifying existing features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where appropriate

## Documentation

- Update README.md if needed
- Document new features or changes
- Include JSDoc comments for functions
- Update API documentation if applicable

## Review Process

1. A maintainer will review your PR
2. They may request changes or improvements
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged

## Questions?

Feel free to:
- Join our [Discord server](https://discord.gg/divisionbuilds)
- Open an issue
- Contact the maintainers

## Recognition

Contributors will be:
- Listed in our [Contributors](https://github.com/yourusername/divisionbuilds/graphs/contributors) page
- Acknowledged in release notes
- Given credit for their specific contributions

Thank you for contributing to Division Builds! 