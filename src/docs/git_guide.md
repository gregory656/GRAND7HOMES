# GIT GUIDE - TEAM COLLABORATION

## OVERVIEW
This guide teaches the  how to use Git for collaborative development, including branching, pull requests, and merging workflows.

---

## BASIC GIT COMMANDS

### Configuration Commands (ONE-TIME SETUP)

#### `git config --global user.name "Your Name"`
**Purpose**: Sets your name for all commits
**Mandatory**: YES (first time only)
**When to use**: Once when setting up Git on your machine
**Example**: `git config --global user.name "John Doe"`

#### `git config --global user.email "your.email@example.com"`
**Purpose**: Sets your email for all commits
**Mandatory**: YES (first time only)
**When to use**: Once when setting up Git on your machine
**Example**: `git config --global user.email "john@example.com"`

---

## REPOSITORY COMMANDS

### `git clone <repository-url>`
**Purpose**: Downloads a remote repository to your local machine
**Mandatory**: YES (first time)
**When to use**: When you first join a project
**Example**: `git clone https://github.com/username/grand7homes.git`

### `git init`
**Purpose**: Initializes a new Git repository
**Mandatory**: NO (only for new projects)
**When to use**: When starting a new project from scratch
**Example**: `git init`

---

## BRANCHING COMMANDS

### `git branch`
**Purpose**: Lists all local branches
**Mandatory**: NO
**When to use**: To see available branches
**Example**: `git branch`

### `git branch <branch-name>`
**Purpose**: Creates a new branch
**Mandatory**: YES (when starting new work)
**When to use**: Before starting new features or bug fixes
**Example**: `git branch feature/user-authentication`

### `git branch -d <branch-name>`
**Purpose**: Deletes a local branch (only if merged)
**Mandatory**: NO
**When to use**: After merging a branch to clean up
**Example**: `git branch -d feature/user-authentication`

### `git branch -D <branch-name>`
**Purpose**: Force deletes a branch (even if not merged)
**Mandatory**: NO
**When to use**: When you want to discard unmerged changes
**Example**: `git branch -D feature/user-authentication`

### `git checkout <branch-name>`
**Purpose**: Switches to an existing branch
**Mandatory**: YES
**When to use**: When moving between branches
**Example**: `git checkout main`

### `git checkout -b <branch-name>`
**Purpose**: Creates and switches to a new branch in one command
**Mandatory**: YES (recommended)
**When to use**: When starting new work (combines branch + checkout)
**Example**: `git checkout -b feature/user-authentication`

### `git switch <branch-name>`
**Purpose**: Switches to an existing branch (newer command)
**Mandatory**: YES (alternative to checkout)
**When to use**: When moving between branches
**Example**: `git switch main`

### `git switch -c <branch-name>`
**Purpose**: Creates and switches to a new branch (newer command)
**Mandatory**: YES (recommended)
**When to use**: When starting new work
**Example**: `git switch -c feature/user-authentication`

---

## STATUS & LOG COMMANDS

### `git status`
**Purpose**: Shows the working tree status (modified, staged, untracked files)
**Mandatory**: YES (frequently)
**When to use**: Before committing to see what changed
**Example**: `git status`

### `git log`
**Purpose**: Shows commit history
**Mandatory**: NO
**When to use**: To view project history
**Example**: `git log`

### `git log --oneline`
**Purpose**: Shows condensed commit history (one line per commit)
**Mandatory**: NO
**When to use**: For quick history overview
**Example**: `git log --oneline`

### `git log --graph --oneline --all`
**Purpose**: Shows branch history as a graph
**Mandatory**: NO
**When to use**: To visualize branch structure
**Example**: `git log --graph --oneline --all`

---

## STAGING & COMMITTING COMMANDS

### `git add <file-name>`
**Purpose**: Stages a specific file for commit
**Mandatory**: YES
**When to use**: When you want to commit specific files
**Example**: `git add src/components/Button.jsx`

### `git add .`
**Purpose**: Stages all changes in current directory
**Mandatory**: YES (common)
**When to use**: When you want to commit all changes
**Example**: `git add .`

### `git add -A`
**Purpose**: Stages all changes (including deletions)
**Mandatory**: YES (recommended)
**When to use**: When you want to stage everything including deleted files
**Example**: `git add -A`

### `git commit -m "commit message"`
**Purpose**: Commits staged changes with a message
**Mandatory**: YES
**When to use**: After staging changes
**Example**: `git commit -m "Add user authentication feature"`

### `git commit -am "commit message"`
**Purpose**: Stages and commits modified files (not new files) in one command
**Mandatory**: NO (convenience)
**When to use**: For quick commits of modified files only
**Example**: `git commit -am "Fix login bug"`

### `git commit --amend`
**Purpose**: Modifies the last commit (add changes or change message)
**Mandatory**: NO
**When to use**: When you forgot to add something to the last commit
**Example**: `git commit --amend`

### `git reset <file-name>`
**Purpose**: Unstages a file (keeps changes)
**Mandatory**: NO
**When to use**: When you accidentally staged a file
**Example**: `git reset src/components/Button.jsx`

### `git reset --hard HEAD`
**Purpose**: Discards all local changes (dangerous!)
**Mandatory**: NO (use with caution)
**When to use**: When you want to discard all uncommitted changes
**Example**: `git reset --hard HEAD`

---

## REMOTE COMMANDS

### `git remote`
**Purpose**: Lists remote repositories
**Mandatory**: NO
**When to use**: To see configured remotes
**Example**: `git remote`

### `git remote -v`
**Purpose**: Lists remote repositories with URLs
**Mandatory**: NO
**When to use**: To see remote repository URLs
**Example**: `git remote -v`

### `git remote add <name> <url>`
**Purpose**: Adds a new remote repository
**Mandatory**: NO (usually already configured)
**When to use**: When adding a new remote
**Example**: `git remote add origin https://github.com/username/repo.git`

### `git fetch`
**Purpose**: Downloads changes from remote without merging
**Mandatory**: NO (but recommended)
**When to use**: To see what others have changed before merging
**Example**: `git fetch`

### `git fetch origin`
**Purpose**: Downloads changes from origin remote
**Mandatory**: NO
**When to use**: To update remote tracking branches
**Example**: `git fetch origin`

---

## PULL & PUSH COMMANDS

### `git pull`
**Purpose**: Fetches and merges changes from remote to current branch
**Mandatory**: YES (before starting work)
**When to use**: Before starting work to get latest changes
**Example**: `git pull`

### `git pull origin main`
**Purpose**: Pulls from specific remote and branch
**Mandatory**: YES (specific)
**When to use**: When pulling from a specific branch
**Example**: `git pull origin main`

### `git pull --rebase`
**Purpose**: Pulls with rebase instead of merge (cleaner history)
**Mandatory**: NO (recommended)
**When to use**: When you want to keep linear history
**Example**: `git pull --rebase`

### `git push`
**Purpose**: Pushes committed changes to remote branch
**Mandatory**: YES
**When to use**: After committing changes
**Example**: `git push`

### `git push origin <branch-name>`
**Purpose**: Pushes to specific remote and branch
**Mandatory**: YES (first push)
**When to use**: When pushing a new branch for the first time
**Example**: `git push origin feature/user-authentication`

### `git push -u origin <branch-name>`
**Purpose**: Pushes and sets upstream branch (tracks remote)
**Mandatory**: YES (first push - recommended)
**When to use**: When pushing a new branch for the first time
**Example**: `git push -u origin feature/user-authentication`

### `git push --force`
**Purpose**: Force pushes (overwrites remote history - dangerous!)
**Mandatory**: NO (avoid unless necessary)
**When to use**: Only when you know what you're doing (rare)
**Example**: `git push --force`

### `git push --force-with-lease`
**Purpose**: Safer force push (checks if remote has new commits)
**Mandatory**: NO (safer alternative)
**When to use**: When you need to force push but safely
**Example**: `git push --force-with-lease`

---

## MERGING COMMANDS

### `git merge <branch-name>`
**Purpose**: Merges a branch into the current branch
**Mandatory**: YES (when integrating changes)
**When to use**: When merging a feature branch into main
**Example**: `git merge feature/user-authentication`

### `git merge --no-ff <branch-name>`
**Purpose**: Merges with a merge commit (even if fast-forward possible)
**Mandatory**: NO (recommended for feature branches)
**When to use**: When you want to preserve branch history
**Example**: `git merge --no-ff feature/user-authentication`

### `git merge --abort`
**Purpose**: Aborts a conflicted merge
**Mandatory**: NO
**When to use**: When you want to cancel a merge with conflicts
**Example**: `git merge --abort`

---

## REBASE COMMANDS

### `git rebase <branch-name>`
**Purpose**: Rebases current branch onto another branch
**Mandatory**: NO
**When to use**: When you want to update your branch with latest main
**Example**: `git rebase main`

### `git rebase -i HEAD~3`
**Purpose**: Interactive rebase of last 3 commits
**Mandatory**: NO
**When to use**: When you want to squash/reorder/edit commits
**Example**: `git rebase -i HEAD~3`

### `git rebase --abort`
**Purpose**: Aborts a rebase
**Mandatory**: NO
**When to use**: When you want to cancel a rebase
**Example**: `git rebase --abort`

### `git rebase --continue`
**Purpose**: Continues a rebase after resolving conflicts
**Mandatory**: NO
**When to use**: After fixing rebase conflicts
**Example**: `git rebase --continue`

---

## CONFLICT RESOLUTION

### When Conflicts Occur
**Purpose**: Resolve merge/rebase conflicts
**Mandatory**: YES (when conflicts happen)
**When to use**: During merge or rebase when conflicts appear

**Steps to resolve conflicts:**
1. Git will mark conflicted files with `<<<<<<<`, `=======`, `>>>>>>>`
2. Open the conflicted file(s)
3. Edit the file to resolve conflicts (choose which changes to keep)
4. `git add <resolved-file>`
5. `git commit` (for merge) or `git rebase --continue` (for rebase)

**Example conflict marker:**
```
<<<<<<< HEAD
const greeting = "Hello";
=======
const greeting = "Hi";
>>>>>>> feature-branch
```

---

## STASH COMMANDS

### `git stash`
**Purpose**: Temporarily saves uncommitted changes
**Mandatory**: NO
**When to use**: When you need to switch branches but don't want to commit
**Example**: `git stash`

### `git stash save "message"`
**Purpose**: Stashes with a descriptive message
**Mandatory**: NO
**When to use**: When you want to label your stash
**Example**: `git stash save "Work in progress on login"`

### `git stash list`
**Purpose**: Lists all stashes
**Mandatory**: NO
**When to use**: To see your stashed changes
**Example**: `git stash list`

### `git stash apply`
**Purpose**: Applies the most recent stash (keeps stash)
**Mandatory**: NO
**When to use**: When you want to restore stashed changes
**Example**: `git stash apply`

### `git stash pop`
**Purpose**: Applies and removes the most recent stash
**Mandatory**: NO
**When to use**: When you want to restore and discard stash
**Example**: `git stash pop`

### `git stash drop`
**Purpose**: Discards the most recent stash
**Mandatory**: NO
**When to use**: When you no longer need stashed changes
**Example**: `git stash drop`

### `git stash clear`
**Purpose**: Deletes all stashes
**Mandatory**: NO
**When to use**: When you want to clean up all stashes
**Example**: `git stash clear`

---

## TEAM WORKFLOW - STEP BY STEP

### SCENARIO 1: STARTING A NEW FEATURE

**Step 1: Update your local main branch**
```bash
git checkout main
git pull origin main
```
**Mandatory**: YES
**Why**: Ensures you have the latest changes before starting

**Step 2: Create a new feature branch**
```bash
git checkout -b feature/your-feature-name
```
**Mandatory**: YES
**Why**: Isolates your work from others

**Step 3: Make your changes**
- Edit files
- Test your changes

**Step 4: Check status**
```bash
git status
```
**Mandatory**: YES
**Why**: See what files changed

**Step 5: Stage your changes**
```bash
git add .
```
**Mandatory**: YES
**Why**: Prepare files for commit

**Step 6: Commit your changes**
```bash
git commit -m "Descriptive commit message"
```
**Mandatory**: YES
**Why**: Save your changes with a message

**Step 7: Push your branch**
```bash
git push -u origin feature/your-feature-name
```
**Mandatory**: YES
**Why**: Upload your branch to remote for PR

**Step 8: Create Pull Request on GitHub/GitLab**
- Go to repository on GitHub/GitLab
- Click "New Pull Request"
- Select your branch
- Add description
- Request review

---

### SCENARIO 2: UPDATING YOUR FEATURE BRANCH

**Step 1: Fetch latest changes**
```bash
git fetch origin
```
**Mandatory**: YES (before continuing work)
**Why**: See what others have changed

**Step 2: Rebase your feature branch onto main**
```bash
git rebase origin/main
```
**Mandatory**: YES (recommended)
**Why**: Keep your branch up-to-date with main

**Step 3: Resolve conflicts if any**
- Edit conflicted files
- `git add <resolved-files>`
- `git rebase --continue`

**Step 4: Force push (if you rebased)**
```bash
git push --force-with-lease origin feature/your-feature-name
```
**Mandatory**: YES (after rebase)
**Why**: Update remote with rebased commits

---

### SCENARIO 3: AFTER PR IS MERGED

**Step 1: Update local main**
```bash
git checkout main
git pull origin main
```
**Mandatory**: YES
**Why**: Get the merged changes

**Step 2: Delete your feature branch (local)**
```bash
git branch -d feature/your-feature-name
```
**Mandatory**: NO (recommended)
**Why**: Clean up local branches

**Step 3: Delete your feature branch (remote)**
```bash
git push origin --delete feature/your-feature-name
```
**Mandatory**: NO (recommended)
**Why**: Clean up remote branches

---

### SCENARIO 4: REVIEWING SOMEONE'S PR

**Step 1: Fetch the PR branch**
```bash
git fetch origin
git checkout feature/their-branch-name
```
**Mandatory**: YES
**Why**: Get their changes locally

**Step 2: Test the changes**
- Run the app
- Test the feature

**Step 3: Switch back to your branch**
```bash
git checkout feature/your-branch-name
```
**Mandatory**: YES
**Why**: Return to your work

**Step 4: Go to GitHub/GitLab and approve/request changes**

---

## BRANCHING NAMING CONVENTIONS

### Feature Branches
**Format**: `feature/<feature-name>`
**Examples**:
- `feature/user-authentication`
- `feature/booking-system`
- `feature/payment-integration`

### Bugfix Branches
**Format**: `bugfix/<bug-description>`
**Examples**:
- `bugfix/login-crash`
- `bugfix/payment-error`
- `bugfix/booking-validation`

### Hotfix Branches
**Format**: `hotfix/<hotfix-description>`
**Examples**:
- `hotfix/security-patch`
- `hotfix/critical-bug`

### Release Branches
**Format**: `release/<version>`
**Examples**:
- `release/v1.0.0`
- `release/v2.1.0`

---

## COMMIT MESSAGE CONVENTIONS

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat(auth): add user login functionality

Implement JWT-based authentication with login form,
validation, and error handling.

Closes #123
```

```
fix(booking): resolve date picker bug

Fixed issue where date picker showed wrong month
when selecting future dates.

Fixes #456
```

```
docs(readme): update installation instructions

Added steps for installing dependencies and
configuring environment variables.
```

---

## PULL REQUEST BEST PRACTICES

### Before Creating PR
1. **Update your branch**: Rebase onto latest main
2. **Test thoroughly**: Ensure your changes work
3. **Clean commits**: Squash related commits if needed
4. **Write good description**: Explain what and why

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested this change

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

### During Review
1. **Be responsive**: Address feedback promptly
2. **Be open**: Accept constructive criticism
3. **Ask questions**: If you don't understand feedback
4. **Update PR**: Make requested changes

### After Merge
1. **Delete branch**: Clean up both local and remote
2. **Notify team**: Let relevant people know
3. **Update documentation**: If needed

---

## COMMON GIT PROBLEMS & SOLUTIONS

### Problem: "Pull failed due to local changes"
**Solution**:
```bash
git stash
git pull
git stash pop
```

### Problem: "Merge conflict"
**Solution**:
1. Open conflicted files
2. Resolve conflicts manually
3. `git add <resolved-files>`
4. `git commit` (or `git rebase --continue`)

### Problem: "Accidentally committed to wrong branch"
**Solution**:
```bash
git reset --soft HEAD~1
git checkout correct-branch
git commit -m "Your message"
```

### Problem: "Want to undo last commit but keep changes"
**Solution**:
```bash
git reset --soft HEAD~1
```

### Problem: "Want to undo last commit and discard changes"
**Solution**:
```bash
git reset --hard HEAD~1
```

### Problem: "Committed sensitive data"
**Solution**:
```bash
git reset --hard HEAD~1
git push --force
# Then remove sensitive data from history (more complex)
```

### Problem: "Remote branch deleted but still shows locally"
**Solution**:
```bash
git remote prune origin
```

---

## MANDATORY vs OPTIONAL COMMANDS SUMMARY

### MANDATORY COMMANDS (Must Know)
- `git clone` - First time setup
- `git pull` - Get latest changes
- `git checkout -b` - Create branches
- `git add` - Stage changes
- `git commit` - Save changes
- `git push` - Upload changes
- `git status` - Check state
- `git merge` - Combine branches

### HIGHLY RECOMMENDED (Should Know)
- `git branch` - List branches
- `git log --oneline` - View history
- `git fetch` - Get remote info
- `git stash` - Save work temporarily
- `git rebase` - Update branch cleanly
- `git reset` - Unstage files

### OPTIONAL (Nice to Know)
- `git log` - Detailed history
- `git commit --amend` - Modify last commit
- `git rebase -i` - Interactive rebase
- `git cherry-pick` - Pick specific commit
- `git blame` - See who changed what
- `git tag` - Tag versions

### RARELY USED (Advanced)
- `git bisect` - Binary search for bugs
- `git filter-branch` - Rewrite history
- `git submodule` - Manage sub-repositories
- `git worktree` - Multiple working trees

---

## TEAM RULES

### DO's
- Always pull before starting work
- Create descriptive branch names
- Write clear commit messages
- Create PRs for all changes
- Review PRs thoroughly
- Test before merging
- Delete merged branches
- Communicate with team

### DON'Ts
- Don't commit to main directly
- Don't push without reviewing
- Don't force push unless necessary
- Don't commit large files
- Don't commit sensitive data
- Don't ignore merge conflicts
- Don't leave stale branches
- Don't work on same feature without coordination

---

## QUICK REFERENCE CARD

### Daily Workflow
```bash
git pull origin main                    # Get latest
git checkout -b feature/name            # New branch
# Make changes
git add .                               # Stage
git commit -m "message"                 # Commit
git push -u origin feature/name         # Push
# Create PR on GitHub/GitLab
```

### Update Branch
```bash
git fetch origin                        # Fetch
git rebase origin/main                  # Rebase
git push --force-with-lease             # Push
```

### After Merge
```bash
git checkout main                       # Switch to main
git pull origin main                    # Get latest
git branch -d feature/name              # Delete local
git push origin --delete feature/name   # Delete remote
```

---

## GLOSSARY

- **Repository**: Project storage with all history
- **Commit**: Snapshot of changes
- **Branch**: Parallel version of code
- **Merge**: Combining branches
- **Rebase**: Moving branch to new base
- **Pull**: Download remote changes
- **Push**: Upload local changes
- **Stash**: Temporary save of changes
- **Remote**: Repository on server (GitHub/GitLab)
- **Upstream**: Tracking remote branch
- **Fast-forward**: Simple merge (linear)
- **Conflict**: When same line changed in both branches
- **PR (Pull Request)**: Request to merge changes
- **HEAD**: Reference to current commit
- **Stage**: Area for commits

---

This guide covers everything your team needs to collaborate effectively using Git. Follow these workflows and your development process will be smooth and organized.
