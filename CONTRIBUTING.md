# Contributing to Gemini MCP Server

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/gemini-mcp-server.git
cd gemini-mcp-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
# Get API key from https://makersuite.google.com/app/apikey
export GEMINI_API_KEY="your-dev-api-key"
```

### 4. Test Your Setup

```bash
npm start
# Should see: "Gemini MCP Server running on stdio"
```

## 🔧 Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, commented code
   - Follow existing code style
   - Update documentation if needed

3. **Test thoroughly**
   ```bash
   # Test the server
   npm start
   
   # If you add tests (future):
   # npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

   **Commit Message Format:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation only
   - `style:` - Code style (formatting, no logic change)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## ✅ Pull Request Guidelines

### Before Submitting

- [ ] Code follows existing style
- [ ] All changes are tested
- [ ] Documentation is updated
- [ ] No hardcoded API keys or secrets
- [ ] Commit messages are clear
- [ ] No breaking changes (or clearly documented)

### PR Description Should Include

```markdown
## What does this PR do?
Brief description of changes

## Why is this needed?
Problem this solves

## How was it tested?
Steps you took to verify

## Breaking changes?
None / List any breaking changes

## Screenshots (if UI changes)
Add if applicable
```

## 🎯 Areas for Contribution

### High Priority

- **Tests**: Add unit and integration tests
- **Error Handling**: Improve error messages and recovery
- **Documentation**: Improve examples and guides
- **Performance**: Optimize API calls and response times

### Feature Ideas

- Streaming response support
- Token usage tracking and reporting
- Conversation history persistence
- Support for image inputs
- Docker container
- Configuration validation
- Health check endpoints
- Prometheus metrics

### Bug Reports

When reporting bugs, include:

1. **Description**: What happened?
2. **Expected**: What should have happened?
3. **Steps to reproduce**: How to trigger the bug
4. **Environment**: OS, Node version, Warp version
5. **Logs**: Any error messages (redact API keys!)

## 📋 Code Style

### JavaScript/Node.js

```javascript
// Use ES6+ features
import { foo } from 'bar';

// Use const/let, not var
const apiKey = process.env.API_KEY;
let retryCount = 0;

// Async/await over callbacks
async function fetchData() {
  try {
    const result = await api.call();
    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Descriptive variable names
const userMessage = request.params.message;
const responseText = result.text();

// Comments for complex logic
// Calculate retry delay with exponential backoff
const delay = Math.pow(2, retryCount) * 1000;
```

### Security

```javascript
// ✅ Good: Safe error handling
catch (error) {
  console.error('API error:', error.message);
}

// ❌ Bad: Might log API keys
catch (error) {
  console.error(error);
}

// ✅ Good: Validate input
if (typeof args.temperature !== 'number' || args.temperature < 0) {
  throw new Error('Invalid temperature');
}

// ✅ Good: No hardcoded secrets
const apiKey = process.env.GEMINI_API_KEY;

// ❌ Bad: Hardcoded secrets
const apiKey = "AIza...";  // Never do this!
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Server starts without errors
- [ ] `gemini_chat` tool works
- [ ] `gemini_chat_with_history` maintains context
- [ ] `gemini_analyze_code` returns useful results
- [ ] Error handling works (invalid API key, etc.)
- [ ] Configuration changes work
- [ ] Documentation is accurate

### Future: Automated Tests

We welcome contributions to add automated testing:

- Unit tests for individual functions
- Integration tests for MCP tools
- End-to-end tests with Warp
- Performance benchmarks

## 📝 Documentation

### What to Document

- New features and tools
- Configuration options
- Environment variables
- Error codes and troubleshooting
- Architecture decisions (in code comments)

### Documentation Style

- Clear, concise language
- Include code examples
- Add "Why" not just "How"
- Keep README.md comprehensive but scannable
- Use proper markdown formatting

## 🔒 Security

### Security-First Development

- Never commit API keys or secrets
- Validate all external input
- Use environment variables for config
- Don't log sensitive information
- Review dependencies for vulnerabilities

### Reporting Security Issues

See [SECURITY.md](SECURITY.md) for security reporting.

## 📦 Release Process

(For maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.x.x`
4. Push tag: `git push origin v1.x.x`
5. Create GitHub release with notes
6. Announce in discussions

## 🙏 Recognition

Contributors will be:
- Listed in README.md acknowledgments
- Mentioned in release notes
- Added to GitHub contributors graph

## 💬 Questions?

- 💬 Ask in [GitHub Discussions](https://github.com/bobvasic/gemini-mcp-server/discussions)
- 🐛 Check existing [Issues](https://github.com/bobvasic/gemini-mcp-server/issues)
- 📧 Email maintainers (see README)

## 📚 Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Thank you for contributing to Gemini MCP Server! 🚀
