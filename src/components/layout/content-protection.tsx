'use client';

import { useEffect } from 'react';

/**
 * ContentProtection — blocks casual content copying across the site.
 *
 * Protections applied:
 * - Disables right-click context menu
 * - Blocks Ctrl+C / Ctrl+A / Ctrl+U / Ctrl+S / Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C / F12
 * - Prevents image dragging
 * - Disables text selection via CSS (class applied to <body>)
 * - Clears clipboard on copy/cut attempts
 *
 * Note: These are deterrents against casual copying. Determined users with
 * technical knowledge can always bypass client-side protections.
 */
export function ContentProtection() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Block copy/cut keyboard shortcuts and dev tools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+A, Ctrl+U (view source), Ctrl+S (save page)
      if (e.ctrlKey && ['c', 'a', 'u', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      // Ctrl+Shift+I (dev tools), Ctrl+Shift+J (console), Ctrl+Shift+C (inspect)
      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }

      // F12 (dev tools)
      if (e.key === 'F12') {
        e.preventDefault();
      }

      // Ctrl+P (print)
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
      }
    };

    // Intercept copy/cut events and clear clipboard
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData?.setData('text/plain', '');
    };

    // Prevent image drag
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null;
}
