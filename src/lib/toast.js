export const toast = (msg) => window.dispatchEvent(new CustomEvent('vr-toast', { detail: msg }));
export const openPalette = () => window.dispatchEvent(new Event('vr-palette'));
export async function copyText(text, msg = 'Copied!') {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch { /* ignore */ } t.remove();
  }
  toast(msg);
}
