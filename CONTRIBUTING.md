# Contributing Guidelines

## Overview

Contributions to Gemini UI Design Server follow enterprise-grade development standards with focus on UI/UX excellence and security.

## Quick Start

```bash
git clone https://github.com/bobvasic/gemini-ui-design-server.git
cd gemini-ui-design-server
npm install
export GEMINI_API_KEY="your-dev-key"
npm start
```

## Development Workflow

### Branch Naming Convention
- `feature/ui-tool-name` - New UI design tools
- `fix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation improvements
- `refactor/code-improvement` - Code optimization

### Commit Message Format
```
<type>: <description>

feat: Add brand identity design tool
fix: Correct WCAG compliance validation
docs: Update UI architecture guidelines
refactor: Optimize Gemini prompt structure
```

## Code Standards

### Tool Design Principles
1. **Gemini Prompt Optimization** - Follow Google's official best practices
2. **Enterprise Quality** - Enterprise-grade output standards
3. **Accessibility First** - WCAG 2.1 AA/AAA compliance
4. **Security by Design** - Zero credential exposure

### Example: Adding New Tool

```javascript
{
  name: "new_ui_tool",
  description: "Brief, action-oriented description",
  inputSchema: {
    type: "object",
    properties: {
      // Define clear, typed parameters
    },
    required: ["mandatory_param"]
  }
}
```

### Prompt Engineering Standards
- **Structured Role**: Define expert persona clearly
- **Context Rich**: Provide comprehensive specifications
- **Deliverable Explicit**: Detail expected outputs
- **Constraint Defined**: WCAG, framework, performance requirements

## Testing

```bash
# Manual verification
export GEMINI_API_KEY="test-key"
npm start

# Test via Claude in Warp
# Invoke: gemini-ui-designer/<tool_name>
```

## Pull Request Checklist

- [ ] Code follows existing architectural patterns
- [ ] Gemini prompts optimized per Google guidelines
- [ ] No hardcoded credentials or API keys
- [ ] Documentation updated (README, tool reference)
- [ ] Security implications reviewed
- [ ] Tool tested via Warp Terminal

## Security Requirements

**CRITICAL**:
- Never commit API keys
- Always use environment variables
- Sanitize error messages
- Validate all tool inputs

## Documentation

Update relevant sections:
- **README.md** - Tool reference, use cases
- **SECURITY.md** - Security implications
- **Code Comments** - Complex prompt logic

## Areas for Contribution

### High Priority
- Additional UI design tools
- Enhanced prompt templates
- Accessibility validation improvements
- Performance optimization

### Feature Ideas
- Component variant generation
- Design token export formats
- Figma/Sketch integration
- Automated accessibility audits

## Review Process

1. **Automated Checks** - Linting, security scanning
2. **Code Review** - Maintainer approval required
3. **Testing** - Manual verification in Warp
4. **Documentation** - Completeness verification

## Support

**Technical Questions**: [GitHub Discussions](https://github.com/bobvasic/gemini-ui-design-server/discussions)  
**Bug Reports**: [GitHub Issues](https://github.com/bobvasic/gemini-ui-design-server/issues)  
**Security**: info@cyberlinksec.com

## Recognition

Contributors are acknowledged in:
- README.md contributors section
- Release notes
- GitHub contributors graph

---

**Project**: Gemini UI Design Server  
**Maintainer**: CyberLink Security  
**Contact**: info@cyberlinksec.com
