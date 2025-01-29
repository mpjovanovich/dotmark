# Test

## Agile Development

The unit of work in agile development is a **user story** (or simply "story").

...

_Branching Strategy_

Agile development often uses **feature-branching**. One branching strategy for FB is **GitFlow**.

- The main branch is the **production branch** or **release branch**.
  - It is only modified for **hotfixes** (something that breaks production).
- A separate **development branch** is used for active development.
  - Features branch from a development branch (not the main branch).
  - Feature branches are merged into the development branch when completed.
  - The development branch is merged into the main branch when a **version cutoff** is reached. This is often the end of a sprint.

```mermaid
gitGraph
    commit id: "initial release" tag: "v1.0.0"
    branch develop
    checkout develop

    branch feature/major
    checkout feature/major
    commit id: "breaking API change"
    checkout develop
    merge feature/major

    branch release/2.0
    checkout release/2.0
    commit id: "prepare 2.0"
    checkout main
    merge release/2.0 tag: "v2.0.0"
    checkout develop
    merge release/2.0

    branch feature/minor
    checkout feature/minor
    commit id: "new feature"
    checkout develop
    merge feature/minor

    branch release/2.1
    checkout release/2.1
    commit id: "prepare 2.1"
    checkout main
    merge release/2.1 tag: "v2.1.0"
    checkout develop
    merge release/2.1

    checkout main
    branch hotfix/2.1.1
    commit id: "fix critical bug"
    checkout main
    merge hotfix/2.1.1 tag: "v2.1.1"
    checkout develop
    merge hotfix/2.1.1
```

## Continuous Integration (CI)

The unit of work in CI is a **commit**. It does not have to be a completed feature.

...

_Branching Strategy_

CI uses **Trunk-based development**.

- Branches are created from the main branch. There is no development branch.
- Branches are extremely short-lived.
- Commits are merged into the main branch by each developer at least daily.
- This avoids merge conflicts and ensures the main branch is always releasable.

```mermaid
gitGraph
    commit id: "init" tag: "v1.0.0"

    branch feature/search
    checkout feature/search
    commit id: "search ui"
    checkout main
    merge feature/search
    commit id: "deploy 1.1.0" tag: "v1.1.0"

    branch feature/auth
    checkout feature/auth
    commit id: "quick feature"
    checkout main
    merge feature/auth
    commit id: "deploy 1.2.0" tag: "v1.2.0"

    branch hotfix/auth
    checkout hotfix/auth
    commit id: "urgent fix"
    checkout main
    merge hotfix/auth
    commit id: "deploy 1.2.1" tag: "v1.2.1"
```

## Example

~.focusContent.example

**Example here**

/~

## Other Content

Other content here...
