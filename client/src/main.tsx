
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Show loading initially
const root = document.getElementById("root")!;
root.innerHTML = `
  <div style="
    display: flex;
    items-center: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f9fafb;
  ">
    <div style="text-align: center;">
      <div style="
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      "></div>
      <p style="color: #6b7280; font-size: 16px;">Loading Application...</p>
    </div>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`;

// Render React app
const reactRoot = createRoot(root);

try {
  reactRoot.render(<App />);
} catch (error) {
  console.error('Failed to render app:', error);
  root.innerHTML = `
    <div style="
      display: flex;
      items-center: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f9fafb;
    ">
      <div style="text-align: center;">
        <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 16px;">
          Application Error
        </h1>
        <p style="color: #6b7280; margin-bottom: 16px;">
          Failed to load the application. Please refresh the page.
        </p>
        <button 
          onclick="window.location.reload()" 
          style="
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          "
        >
          Refresh Page
        </button>
      </div>
    </div>
  `;
}
