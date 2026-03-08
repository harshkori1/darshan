import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

// Mouse sprinkle effect - More sprinkles!
document.addEventListener('mousemove', (e) => {
  // Create multiple sprinkles per mousemove (5 sprinkles)
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sprinkle = document.createElement('div');
      sprinkle.className = 'sprinkle';
      
      // Random size
      const size = Math.random() * 10 + 3 + 'px';
      sprinkle.style.width = size;
      sprinkle.style.height = size;
      
      // Set starting position at cursor with slight offset
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 30;
      sprinkle.style.left = (e.pageX + offsetX) + 'px';
      sprinkle.style.top = (e.pageY + offsetY) + 'px';
      
      // Set random spread direction using CSS variables
      sprinkle.style.setProperty('--x', (Math.random() - 0.5) * 150 + 'px');
      sprinkle.style.setProperty('--y', (Math.random() - 0.5) * 150 + 'px');

      document.body.appendChild(sprinkle);
      
      // Remove element after animation ends
      setTimeout(() => sprinkle.remove(), 1000);
    }, i * 20); // Stagger the sprinkles slightly
  }
});

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
