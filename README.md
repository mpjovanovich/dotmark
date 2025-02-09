# dotmark

Style markdown with CSS-like syntax while preserving its readability.

```markdown
~#intro.fade-in.left

# Welcome

This markdown stays clean and readable.
/~
```

↓ Transforms to ↓

```html
<div id="intro" class="fade-in left">
  <h1 id="welcome">Welcome</h1>
  <p>This markdown stays clean and readable.</p>
</div>
```

## Installation

```bash
npm install @mpjovanovich/dotmark
```

## Usage

```typescript
import { parseDotmark } from "@mpjovanovich/dotmark";

const markdown = `
~#section1.highlight
# Section 1
Some content here
/~
`;

const html = await parseDotmark(markdown);
```

## Features

- Add IDs and classes to markdown sections
- GitHub-style heading IDs
- Syntax highlighting with Shiki
- Formatted HTML output
