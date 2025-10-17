#!/bin/bash

echo "==================================="
echo "Gemini MCP Server Setup"
echo "==================================="
echo ""

# Check if API key is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup.sh YOUR_GEMINI_API_KEY"
    echo ""
    echo "Get your API key from: https://makersuite.google.com/app/apikey"
    exit 1
fi

API_KEY="$1"
INSTALL_DIR="$(cd "$(dirname "$0")" && pwd)"

# Create Warp MCP config directory if it doesn't exist
mkdir -p ~/.config/warp

# Check if mcp.json exists
if [ -f ~/.config/warp/mcp.json ]; then
    echo "⚠️  Warp MCP config already exists at ~/.config/warp/mcp.json"
    echo "Please manually add the following configuration:"
    echo ""
    cat "$INSTALL_DIR/warp-mcp-config.json" | sed "s|\${HOME}|$HOME|g" | sed "s/PASTE_YOUR_API_KEY_HERE/$API_KEY/"
    echo ""
else
    # Create new config
    cat "$INSTALL_DIR/warp-mcp-config.json" | sed "s|\${HOME}|$HOME|g" | sed "s/PASTE_YOUR_API_KEY_HERE/$API_KEY/" > ~/.config/warp/mcp.json
    echo "✓ Created Warp MCP configuration at ~/.config/warp/mcp.json"
fi

echo ""
echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Restart Warp terminal"
echo "2. Your Gemini MCP server is now available"
echo ""
echo "Test the server manually:"
echo "export GEMINI_API_KEY=\"$API_KEY\""
echo "cd \"$INSTALL_DIR\""
echo "npm start"
echo ""
