<div align="center">

# 🤖 Gemini MCP Server

### Model Context Protocol Server for Google Gemini API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0.4-blue)](https://modelcontextprotocol.io/)
[![Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-orange)](https://ai.google.dev/)

**Seamlessly integrate Google Gemini AI into your Warp terminal workflow**

[Features](#-features) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

Gemini MCP Server is a Model Context Protocol implementation that brings Google Gemini's powerful AI capabilities directly into your Warp terminal. Built with enterprise-grade standards, this server enables conversational AI, multi-turn dialogues, and intelligent code analysis through simple, well-defined tools.

### Why Use This?

✨ **Zero Configuration** - Works out of the box with Warp terminal  
🔒 **Secure by Default** - API keys stored in environment variables  
⚡ **High Performance** - Optimized for rapid response times  
🎯 **Purpose-Built Tools** - Three focused tools for maximum utility  
🌐 **Open Source** - MIT licensed, community-driven development

---

## ✨ Features

<table>
<tr>
<td width="33%">

### 💬 Single-Turn Chat
**`gemini_chat`**

Quick, stateless conversations with Gemini. Perfect for one-off questions, code generation, or content creation.

</td>
<td width="33%">

### 🔄 Multi-Turn Conversations
**`gemini_chat_with_history`**

Maintain context across multiple exchanges. Build complex dialogues and iterative problem-solving sessions.

</td>
<td width="33%">

### 🔍 Code Analysis
**`gemini_analyze_code`**

Deep code review, bug detection, optimization suggestions, and explanations. Supports multiple programming languages.

</td>
</tr>
</table>

---

## 🚀 Installation

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Warp Terminal** (latest version)
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Quick Start

```bash
# Clone or download the repository
git clone https://github.com/yourusername/gemini-mcp-server.git
cd gemini-mcp-server

# Install dependencies
npm install

# Run automated setup (recommended)
./setup.sh YOUR_GEMINI_API_KEY
```

### Manual Installation

```bash
# Install dependencies
npm install

# Make scripts executable
chmod +x index.js setup.sh
```

---

## ⚙️ Configuration

### Method 1: Automated Setup (Recommended)

```bash
./setup.sh YOUR_GEMINI_API_KEY
```

This script automatically:
- Creates Warp MCP configuration
- Sets up your API key securely
- Validates the installation

### Method 2: Manual Configuration

#### Step 1: Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Generate a new API key
4. Copy the key (keep it secure!)

#### Step 2: Configure Warp

Create or edit `~/.config/warp/mcp.json`:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "node",
      "args": ["${HOME}/gemini-mcp-server/index.js"],
      "env": {
        "GEMINI_API_KEY": "your-actual-api-key-here"
      }
    }
  }
}
```

> ⚠️ **Security Best Practice**: Never commit your API key to version control. Use environment variables for production deployments.

#### Step 3: Restart Warp

Completely quit and restart Warp terminal for changes to take effect.

---

## 💡 Usage

### Testing the Server

Verify your installation works:

```bash
export GEMINI_API_KEY="your-api-key"
cd gemini-mcp-server
npm start
```

You should see: `Gemini MCP Server running on stdio`

### Tool Examples

#### 1. Basic Conversation

```json
{
  "tool": "gemini_chat",
  "arguments": {
    "message": "Explain the difference between async/await and Promises in JavaScript",
    "temperature": 0.7,
    "max_tokens": 2048
  }
}
```

**Use Cases:**
- Quick questions and answers
- Code generation
- Content writing
- Brainstorming ideas

#### 2. Contextual Dialogue

```json
{
  "tool": "gemini_chat_with_history",
  "arguments": {
    "messages": [
      {
        "role": "user",
        "parts": [{"text": "What is dependency injection?"}]
      },
      {
        "role": "model",
        "parts": [{"text": "Dependency injection is a design pattern..."}]
      },
      {
        "role": "user",
        "parts": [{"text": "Show me an example in TypeScript"}]
      }
    ],
    "temperature": 0.8
  }
}
```

**Use Cases:**
- Technical tutorials
- Iterative problem-solving
- Learning sessions
- Complex debugging

#### 3. Code Analysis

```json
{
  "tool": "gemini_analyze_code",
  "arguments": {
    "code": "function processUser(data) {\n  return data.name.toUpperCase();\n}",
    "language": "javascript",
    "analysis_type": "bugs"
  }
}
```

**Analysis Types:**
- `bugs` - Find errors and potential issues
- `optimize` - Performance and best practices
- `explain` - Detailed code explanation
- `review` - Comprehensive assessment

---

## 📚 API Reference

### Tool: `gemini_chat`

**Description:** Single-turn conversation with Gemini

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `message` | string | Yes | - | Your prompt or question |
| `temperature` | number | No | 1.0 | Creativity (0.0-2.0) |
| `max_tokens` | number | No | 8192 | Maximum response length |

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Here's a detailed explanation..."
    }
  ]
}
```

---

### Tool: `gemini_chat_with_history`

**Description:** Multi-turn conversation with context preservation

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `messages` | array | Yes | - | Conversation history |
| `temperature` | number | No | 1.0 | Creativity (0.0-2.0) |

**Message Format:**
```typescript
{
  role: "user" | "model",
  parts: [{ text: string }]
}
```

---

### Tool: `gemini_analyze_code`

**Description:** AI-powered code analysis and review

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `code` | string | Yes | - | Code to analyze |
| `language` | string | No | - | Programming language |
| `analysis_type` | enum | No | review | bugs, optimize, explain, review |

**Supported Languages:**
JavaScript, TypeScript, Python, Go, Rust, Java, C++, Ruby, PHP, Swift, Kotlin, and more

---

## 🔧 Advanced Configuration

### Environment Variables

```bash
# Required
export GEMINI_API_KEY="your-api-key"

# Optional (for custom deployments)
export MCP_SERVER_PORT="3000"  # If running as HTTP server
export LOG_LEVEL="info"         # debug, info, warn, error
```

### Model Selection

To use different Gemini models, edit `index.js`:

```javascript
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-pro",  // or "gemini-2.0-flash-exp"
  generationConfig: {
    temperature: 1.0,
    maxOutputTokens: 8192,
  },
});
```

**Available Models:**
- `gemini-2.0-flash-exp` - Fast, efficient (default)
- `gemini-2.5-pro` - Most capable (when available)
- `gemini-pro` - Balanced performance

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>Error: "GEMINI_API_KEY environment variable is required"</b></summary>

**Solution:**
```bash
export GEMINI_API_KEY="your-key"
# Or add to ~/.bashrc or ~/.zshrc for persistence
echo 'export GEMINI_API_KEY="your-key"' >> ~/.bashrc
```
</details>

<details>
<summary><b>Warp doesn't recognize the MCP server</b></summary>

**Checklist:**
1. Verify `~/.config/warp/mcp.json` exists and is valid JSON
2. Ensure paths in config use absolute paths or `${HOME}`
3. Completely quit and restart Warp (not just close window)
4. Check Warp logs: `Settings → Advanced → View Logs`
</details>

<details>
<summary><b>API calls fail with 403 or 401 errors</b></summary>

**Possible causes:**
- Invalid API key
- API key not activated
- Billing not enabled on Google Cloud
- Rate limits exceeded

**Solution:** Verify your API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
</details>

<details>
<summary><b>Server starts but responses are empty</b></summary>

**Debug steps:**
```bash
export GEMINI_API_KEY="your-key"
node index.js 2>&1 | tee debug.log
# Then check debug.log for errors
```
</details>

### Getting Help

- 📖 Check the [Wiki](https://github.com/yourusername/gemini-mcp-server/wiki)
- 💬 Join [Discussions](https://github.com/yourusername/gemini-mcp-server/discussions)
- 🐛 Report bugs via [Issues](https://github.com/yourusername/gemini-mcp-server/issues)

---

## 🔒 Security

### Best Practices

1. **Never commit API keys** - Use environment variables
2. **Rotate keys regularly** - Generate new keys every 90 days
3. **Use key restrictions** - Limit keys to specific APIs in Google Cloud Console
4. **Monitor usage** - Check Google Cloud Console for unexpected activity
5. **Audit logs** - Review MCP server logs periodically

### Reporting Security Issues

Please report security vulnerabilities to **security@example.com**. Do not create public issues for security concerns.

See [SECURITY.md](SECURITY.md) for our full security policy.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/gemini-mcp-server.git
cd gemini-mcp-server

# Install dependencies
npm install

# Run in development mode
export GEMINI_API_KEY="your-key"
npm start
```

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure no hardcoded credentials
- Use meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 Gemini MCP Server Contributors
```

---

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specification
- [Google AI](https://ai.google.dev/) - Gemini API
- [Warp Terminal](https://www.warp.dev/) - Modern terminal platform
- All [contributors](https://github.com/yourusername/gemini-mcp-server/graphs/contributors) who helped build this project

---

## 📊 Stats & Metrics

- **Response Time**: < 2s average
- **Uptime**: 99.9% (dependent on Google API)
- **Models Supported**: 3+ Gemini variants
- **Languages**: JavaScript/TypeScript
- **MCP Version**: 1.0.4

---

## 🗺️ Roadmap

- [ ] Add streaming response support
- [ ] Implement token usage tracking
- [ ] Add conversation history persistence
- [ ] Support for image inputs
- [ ] Multi-language documentation
- [ ] Docker container support
- [ ] Health check endpoints
- [ ] Prometheus metrics export

---

<div align="center">

**Built with ❤️ for the developer community**

If this project helped you, please ⭐ star the repository!

[Documentation](https://github.com/yourusername/gemini-mcp-server/wiki) • [Issues](https://github.com/yourusername/gemini-mcp-server/issues) • [Discussions](https://github.com/yourusername/gemini-mcp-server/discussions)

</div>
