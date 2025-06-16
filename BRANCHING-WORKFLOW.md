# 🌳 Magna Web - Git Branching Workflow

## Branch Structure

### 🚀 `main` Branch
- **Purpose**: Production-ready code (your live website)
- **Status**: What customers see
- **Protection**: Only merge tested code from `development`
- **Deployment**: This branch represents your official releases

### 🔧 `development` Branch  
- **Purpose**: Active development and testing
- **Status**: Where you make changes, test features, experiment
- **Safety**: Your playground - break things here, not in main
- **Testing**: All new features go here first

## 📋 Daily Workflow

### When Starting New Work:
```bash
# 1. Switch to development branch
git checkout development

# 2. Pull latest changes (if working with others)
git pull origin development

# 3. Make your changes to files
# ... edit your HTML, CSS, JS files ...

# 4. Commit your changes
git add .
git commit -m "Add new feature: contact form validation"

# 5. Push to development
git push origin development
```

### When Ready to Release:
```bash
# 1. Test everything in development branch first!

# 2. Switch to main branch
git checkout main

# 3. Merge development into main
git merge development

# 4. Push the updated main branch (your new release)
git push origin main

# 5. Switch back to development for next work
git checkout development
```

## 🔄 Quick Commands Reference

### Branch Navigation:
```bash
git checkout main          # Switch to main branch
git checkout development   # Switch to development branch
git branch                 # See all local branches
git branch -a              # See all branches (local + remote)
```

### Daily Development:
```bash
# Your typical day:
git checkout development   # Start in development
# ... make changes ...
git add .
git commit -m "Your changes"
git push origin development
```

### Status Checking:
```bash
git status                 # See what branch you're on and what's changed
git log --oneline -5       # See recent commits
```

## 🎯 Best Practices

### ✅ DO:
- Always develop in the `development` branch
- Test thoroughly before merging to `main`
- Write clear commit messages
- Commit often (small, logical changes)
- Push `development` regularly as backup

### ❌ DON'T:
- Never commit directly to `main` (always go through development)
- Don't merge untested code to `main`
- Don't work in `main` branch directly

## 🆘 Emergency Fixes

If your live site has a critical bug:

```bash
# 1. Switch to main for hotfix
git checkout main

# 2. Make the quick fix
# ... fix the critical issue ...

# 3. Commit the hotfix
git add .
git commit -m "HOTFIX: Critical bug fix"
git push origin main

# 4. Merge the fix back to development to keep branches in sync
git checkout development
git merge main
git push origin development
```

## 📊 Current Status

- **✅ Main Branch**: Clean, production-ready Magna Web site
- **✅ Development Branch**: Your active workspace
- **✅ Both branches**: Pushed to GitHub and synced

## 🎉 Benefits of This Setup

1. **Safety**: Never accidentally break your live site
2. **Backup**: Your development work is always saved on GitHub
3. **Professional**: Industry-standard workflow
4. **Flexibility**: Experiment freely without fear
5. **Rollback**: Easy to revert to previous working versions

---

**Current Branch**: `development` (ready for your next changes!)
**Repository**: https://github.com/tenebrsx/magnaweb 