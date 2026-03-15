---
name: Code-Review
description: Reviews code changes for bugs, style issues, and best practices. Use when reviewing PRs or checking code quality.
---

# Code Review Skill

When reviewing code, follow these steps:

## Review checklist

1. **Correctness**: Does the code do what it's supposed to?
2. **Edge cases**: Are error conditions handled?
3. **Style**: Does it follow project conventions?
4. **Performance**: Are there obvious inefficiencies?
5. **Security**: Are there obvious security vulnerabilities?
6. **Accessibility**: Are there obvious accessibility issues?
7. **Maintainability**: Is the code easy to understand and maintain?
8. **Documentation**: Is the code well-documented?
9. **Testing**: Is the code well-tested?
10. **Best practices**: Does the code follow best practices?

## How to provide feedback

- Be specific about what needs to change
- Explain why, not just what
- Suggest alternatives when possible

## Coding Standards & Consistency

**CRITICAL RULE: When writing new code or modifying existing code, you MUST adhere to the following standards:**

1. **Match Existing Style**: Before writing a new function or component, look at how the surrounding files are built. If the project uses functional React components with hooks, do NOT write class components. If the CSS uses CSS Modules, do NOT use inline styles. Match the exact architectural style of the file you are editing.
2. **Modern Standards**: Ensure all new code uses updated Javascript/React standards (e.g., proper use of `const`/`let`, destructuring, arrow functions, ES6+ array methods, and semantic HTML).
3. **Design Consistency**: If creating new UI elements, strictly adhere to the project's established design language (e.g., the glassmorphic aesthetics, specific CSS variables, and padding norms). Do not introduce new color palettes without permission.
4. **DRY (Don't Repeat Yourself)**: If you find yourself writing a repeated styling pattern or function, extract it into a helper or a shared component.
5. **No Deprecated Code**: Always use the modern equivalent of methods and APIs, ensuring the code will not break in future framework versions.