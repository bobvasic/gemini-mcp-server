# Security Policy

## 🔒 Overview

We take the security of Gemini MCP Server seriously. This document outlines our security practices, how to report vulnerabilities, and best practices for users.

## 🛡️ Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

**Please do NOT create public GitHub issues for security vulnerabilities.**

### How to Report

1. **Email**: Send details to `security@example.com` (replace with actual contact)
2. **Subject**: Use format `[SECURITY] Brief description`
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Regular Updates**: At least every 7 days
- **Disclosure Timeline**: 90 days (or coordinated disclosure)

## 🔐 Security Best Practices

### For Users

#### 1. API Key Management

**DO:**
- ✅ Store API keys in environment variables
- ✅ Use `.env` files (and add to `.gitignore`)
- ✅ Rotate keys every 90 days
- ✅ Use Google Cloud Console key restrictions
- ✅ Monitor usage regularly

**DON'T:**
- ❌ Commit API keys to version control
- ❌ Share keys in chat or email
- ❌ Use production keys in development
- ❌ Store keys in plaintext files
- ❌ Reuse keys across projects

#### 2. Environment Configuration

```bash
# Good: Environment variable
export GEMINI_API_KEY="actual-key-here"

# Bad: Hardcoded in config
{
  "env": {
    "GEMINI_API_KEY": "actual-key-here"  // Don't do this!
  }
}
```

#### 3. Secure Installation

```bash
# Verify package integrity
npm install --prefer-offline

# Audit dependencies regularly
npm audit
npm audit fix

# Keep dependencies updated
npm update
```

#### 4. Access Control

- Run server with least privilege (non-root user)
- Restrict file permissions: `chmod 600 ~/.config/warp/mcp.json`
- Use dedicated API keys per environment
- Implement rate limiting if exposing externally

### For Contributors

#### Code Review Checklist

- [ ] No hardcoded credentials or secrets
- [ ] Input validation on all external data
- [ ] Proper error handling (no sensitive data in logs)
- [ ] Dependencies are up to date
- [ ] No use of unsafe functions (`eval`, `exec` without sanitization)
- [ ] API responses are properly sanitized

#### Secure Development

```javascript
// Good: Safe error handling
catch (error) {
  console.error("API call failed:", error.message);  // Don't log full error
  return { error: "Request failed" };
}

// Bad: Exposing sensitive info
catch (error) {
  console.error(error);  // Might contain API keys
  return error;
}
```

## 🔍 Known Security Considerations

### API Key Exposure

**Risk**: API keys could be exposed in logs, error messages, or environment

**Mitigation**:
- Server validates `GEMINI_API_KEY` without logging it
- Errors never include key material
- Configuration uses environment variables

### Input Validation

**Risk**: Malicious input could cause unexpected behavior

**Mitigation**:
- All tool inputs are validated against JSON schema
- Google Gemini API provides additional content filtering
- Server implements error boundaries

### Dependency Vulnerabilities

**Risk**: npm packages may have security issues

**Mitigation**:
- Minimal dependency footprint (only 2 core dependencies)
- Regular `npm audit` checks
- Automated Dependabot updates (if enabled)

### Rate Limiting

**Risk**: Abuse could exhaust API quotas or incur costs

**Mitigation**:
- Google API enforces rate limits
- Users should implement additional limits per their needs
- Monitor usage in Google Cloud Console

## 🔒 Data Privacy

### What We Collect

**Nothing.** This server:
- Does not collect user data
- Does not transmit data except to Google Gemini API
- Does not persist conversation history
- Does not include analytics or telemetry

### What Google Collects

Google Gemini API processes your requests. Review their privacy policy:
- [Google AI Privacy](https://ai.google/responsibility/principles/)
- [Generative AI Terms](https://ai.google.dev/terms)

## 🛠️ Security Hardening

### Production Deployment

```bash
# 1. Use dedicated service account
useradd -r -s /bin/false mcp-server

# 2. Restrict file permissions
chown mcp-server:mcp-server /path/to/gemini-mcp-server
chmod 750 /path/to/gemini-mcp-server

# 3. Run with systemd (example)
# See docs/systemd-example.service

# 4. Enable firewall rules (if exposing HTTP)
# Only allow localhost by default

# 5. Use process isolation
# Consider containerization (Docker) or VMs
```

### Environment Isolation

```bash
# Use separate keys per environment
export GEMINI_API_KEY_DEV="dev-key"
export GEMINI_API_KEY_PROD="prod-key"

# Never use production keys in development
if [ "$NODE_ENV" = "production" ]; then
    export GEMINI_API_KEY="$GEMINI_API_KEY_PROD"
else
    export GEMINI_API_KEY="$GEMINI_API_KEY_DEV"
fi
```

## 📋 Security Checklist for Deployment

- [ ] API keys stored securely (env vars, secrets manager)
- [ ] Configuration files have restricted permissions (600/640)
- [ ] Dependencies are audited (`npm audit`)
- [ ] Server runs as non-root user
- [ ] Logs don't contain sensitive information
- [ ] Google Cloud Console monitoring configured
- [ ] Billing alerts set up (prevent surprise costs)
- [ ] API key restrictions enabled in Google Cloud
- [ ] Regular key rotation schedule established
- [ ] Incident response plan documented

## 🚨 Incident Response

### If Your API Key is Compromised

1. **Immediate**: Revoke key in [Google Cloud Console](https://console.cloud.google.com/)
2. **Generate**: Create new API key with restrictions
3. **Update**: Change environment variables / config
4. **Restart**: Restart MCP server with new key
5. **Review**: Check API usage logs for unauthorized activity
6. **Report**: If fraud detected, contact Google Cloud Support

### If Server is Compromised

1. **Isolate**: Disconnect server from network
2. **Assess**: Review logs for unauthorized access
3. **Contain**: Revoke all API keys used by server
4. **Remediate**: Patch vulnerabilities, update dependencies
5. **Restore**: Rebuild from clean source
6. **Monitor**: Watch for recurring issues

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Google Cloud Security](https://cloud.google.com/security)
- [MCP Security Guidelines](https://modelcontextprotocol.io/docs/security)

## 📞 Contact

- **Security Issues**: security@example.com
- **General Support**: issues@example.com
- **Security Team**: PGP key available at [keybase.io/yourproject]

---

**Last Updated**: 2025-10-17

**Version**: 1.0.0
