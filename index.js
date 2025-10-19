#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Create MCP server
const server = new Server(
  {
    name: "gemini-ui-design-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "design_ui_component",
        description: "Design premium UI components with enterprise-grade expertise following industry best practices",
        inputSchema: {
          type: "object",
          properties: {
            component_type: {
              type: "string",
              description: "Type of component (button, form, card, navigation, hero, etc.)",
            },
            requirements: {
              type: "string",
              description: "Detailed requirements including functionality, brand identity, target audience, accessibility needs",
            },
            framework: {
              type: "string",
              description: "Frontend framework (React, Vue, Angular, Svelte, vanilla) Default: React",
              default: "React",
            },
            design_system: {
              type: "string",
              description: "Design system reference (Material, Tailwind, Custom, etc.)",
            },
          },
          required: ["component_type", "requirements"],
        },
      },
      {
        name: "review_ui_implementation",
        description: "Expert UI/UX review of existing frontend code with actionable improvements",
        inputSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "Frontend code to review",
            },
            framework: {
              type: "string",
              description: "Framework used (React, Vue, Angular, etc.)",
            },
            review_focus: {
              type: "string",
              description: "Focus areas: accessibility, performance, ux, visual-design, responsive, all",
              enum: ["accessibility", "performance", "ux", "visual-design", "responsive", "all"],
              default: "all",
            },
          },
          required: ["code"],
        },
      },
      {
        name: "generate_frontend_code",
        description: "Generate production-ready, enterprise-grade frontend code with best practices",
        inputSchema: {
          type: "object",
          properties: {
            specification: {
              type: "string",
              description: "Detailed specification of what to build including layout, interactions, styling, responsiveness",
            },
            framework: {
              type: "string",
              description: "Target framework (React, Vue, Angular, Svelte, vanilla)",
              default: "React",
            },
            styling_approach: {
              type: "string",
              description: "Styling method (Tailwind, CSS Modules, Styled Components, SCSS, CSS-in-JS)",
              default: "Tailwind",
            },
            typescript: {
              type: "boolean",
              description: "Use TypeScript (true/false)",
              default: true,
            },
          },
          required: ["specification"],
        },
      },
      {
        name: "ui_architecture_consultation",
        description: "Strategic frontend architecture guidance for scalable, maintainable UI systems",
        inputSchema: {
          type: "object",
          properties: {
            project_context: {
              type: "string",
              description: "Project description, scale, team size, technical constraints",
            },
            consultation_topic: {
              type: "string",
              description: "Topic: component-architecture, state-management, design-system, performance, testing, deployment",
              enum: ["component-architecture", "state-management", "design-system", "performance", "testing", "deployment", "general"],
            },
          },
          required: ["project_context", "consultation_topic"],
        },
      },
      {
        name: "brand_identity_design",
        description: "Create cohesive brand identity and visual design system for web applications",
        inputSchema: {
          type: "object",
          properties: {
            brand_requirements: {
              type: "string",
              description: "Brand values, target audience, industry, competitive landscape, desired emotions",
            },
            deliverables: {
              type: "string",
              description: "What to create: color-palette, typography, components, spacing, motion, icons, illustrations",
              default: "color-palette,typography,components,spacing",
            },
          },
          required: ["brand_requirements"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    switch (name) {
      case "design_ui_component": {
        const prompt = `# UI Component Design Task

## Role
You are a world-class UI/UX designer and frontend architect operating at enterprise-grade professionalism. You specialize in creating industry-leading, accessible, and visually stunning user interfaces.

## Component Specifications
- **Component Type**: ${args.component_type}
- **Framework**: ${args.framework || 'React'}
- **Design System**: ${args.design_system || 'Custom with modern best practices'}

## Requirements
${args.requirements}

## Deliverables Required
1. **Design Specification**
   - Visual hierarchy and layout structure
   - Color palette with WCAG AAA compliance
   - Typography scale and font choices
   - Spacing and sizing specifications
   - Animation and interaction patterns

2. **Component Architecture**
   - Component composition strategy
   - Props interface design
   - State management approach
   - Accessibility features (ARIA, keyboard navigation)

3. **Implementation Guidelines**
   - Responsive breakpoints strategy
   - Performance optimization techniques
   - Cross-browser compatibility notes
   - Testing recommendations

4. **Code Structure**
   - File organization
   - Naming conventions
   - Reusability patterns

Provide enterprise-grade, production-ready design specifications following industry best practices.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [{ type: "text", text }],
        };
      }

      case "review_ui_implementation": {
        const prompt = `# UI Implementation Expert Review

## Role
You are an elite frontend architect and UI/UX expert conducting a professional code review with enterprise-grade standards.

## Code to Review
\`\`\`${args.framework || 'javascript'}
${args.code}
\`\`\`

## Review Focus
**Primary Focus**: ${args.review_focus || 'all'}

## Review Criteria
Analyze and provide expert feedback on:

1. **Accessibility (WCAG 2.1 AA/AAA)**
   - Semantic HTML usage
   - ARIA attributes and roles
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast ratios

2. **Performance**
   - Render optimization
   - Bundle size impact
   - Re-render prevention
   - Code splitting opportunities
   - Image/asset optimization

3. **User Experience**
   - Interaction patterns
   - Visual feedback
   - Error states
   - Loading states
   - Micro-interactions

4. **Visual Design**
   - Design system consistency
   - Typography hierarchy
   - Spacing and layout
   - Responsive design
   - Visual polish

5. **Code Quality**
   - Component architecture
   - Naming conventions
   - Maintainability
   - Testability
   - Best practices adherence

## Deliverables
- **Critical Issues**: Must-fix problems
- **Recommendations**: Improvement opportunities
- **Best Practices**: Industry-standard enhancements
- **Refactored Code**: Production-ready alternatives where applicable

Provide actionable, enterprise-grade feedback with specific code examples.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [{ type: "text", text }],
        };
      }

      case "generate_frontend_code": {
        const prompt = `# Frontend Code Generation Task

## Role
You are a senior frontend engineer generating production-ready, enterprise-grade code following industry best practices.

## Specification
${args.specification}

## Technical Stack
- **Framework**: ${args.framework || 'React'}
- **Styling**: ${args.styling_approach || 'Tailwind CSS'}
- **TypeScript**: ${args.typescript ? 'Yes' : 'No'}

## Code Requirements
1. **Production Quality**
   - Clean, maintainable, self-documenting code
   - Proper error handling
   - Loading and error states
   - Optimistic UI updates where applicable

2. **Accessibility**
   - WCAG 2.1 AA compliance minimum
   - Semantic HTML5 elements
   - ARIA attributes where needed
   - Keyboard navigation support
   - Screen reader compatibility

3. **Performance**
   - Optimized renders
   - Lazy loading where applicable
   - Proper memoization
   - Efficient event handlers

4. **Responsive Design**
   - Mobile-first approach
   - Fluid layouts
   - Breakpoint strategy
   - Touch-friendly interactions

5. **Best Practices**
   - Component composition
   - Props validation
   - Proper naming conventions
   - Inline documentation

## Deliverables
- Complete, runnable code
- Component structure
- Props/interface definitions
- Usage examples
- Styling implementation
- Unit test structure recommendations

Generate enterprise-grade, production-ready code.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [{ type: "text", text }],
        };
      }

      case "ui_architecture_consultation": {
        const prompt = `# Frontend Architecture Consultation

## Role
You are a principal frontend architect providing strategic guidance for scalable, maintainable UI systems.

## Project Context
${args.project_context}

## Consultation Topic
**Focus Area**: ${args.consultation_topic}

## Analysis Framework
Provide comprehensive architectural guidance covering:

1. **Strategic Recommendations**
   - Architecture patterns best suited for requirements
   - Technology stack recommendations
   - Scalability considerations
   - Team velocity impact

2. **Implementation Strategy**
   - Phased rollout approach
   - Risk mitigation
   - Performance targets
   - Testing strategy

3. **Design Patterns**
   - Component architecture patterns
   - State management approaches
   - Code organization
   - Reusability strategies

4. **Best Practices**
   - Industry standards
   - Enterprise-grade patterns
   - Maintenance considerations
   - Documentation requirements

5. **Technical Decisions**
   - Trade-off analysis
   - Pros and cons
   - Alternative approaches
   - Future-proofing strategies

## Deliverables
- Executive summary
- Detailed recommendations
- Architecture diagrams (described textually)
- Implementation roadmap
- Risk assessment
- Success metrics

Provide enterprise-grade strategic guidance.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [{ type: "text", text }],
        };
      }

      case "brand_identity_design": {
        const prompt = `# Brand Identity & Design System Creation

## Role
You are a world-class brand designer and design system architect creating cohesive, memorable visual identities.

## Brand Requirements
${args.brand_requirements}

## Deliverables Requested
${args.deliverables || 'Complete brand identity system'}

## Design System Components
Create a comprehensive brand identity including:

1. **Color System**
   - Primary palette (5-7 colors)
   - Secondary/accent colors
   - Neutral scale
   - Semantic colors (success, warning, error, info)
   - Color usage guidelines
   - WCAG compliance verification
   - Dark mode variants

2. **Typography System**
   - Font family recommendations (with fallbacks)
   - Type scale (6-8 levels)
   - Font weights and styles
   - Line heights and letter spacing
   - Responsive typography strategy
   - Hierarchy guidelines

3. **Spacing System**
   - Base unit (4px, 8px, etc.)
   - Spacing scale (8-12 levels)
   - Layout grid system
   - Component spacing rules

4. **Component Specifications**
   - Button variants and states
   - Form elements
   - Card patterns
   - Navigation patterns
   - Feedback components

5. **Design Principles**
   - Visual language philosophy
   - Interaction principles
   - Animation guidelines
   - Iconography style

6. **Implementation Guide**
   - CSS custom properties structure
   - Naming conventions
   - Design token architecture
   - Component library structure

## Output Format
- Hex/RGB color values
- Font stack specifications
- Spacing values in rem/px
- Code-ready design tokens
- Implementation examples

Create an enterprise-grade, production-ready brand identity.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return {
          content: [{ type: "text", text }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Gemini MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
