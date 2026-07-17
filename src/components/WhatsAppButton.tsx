import { site } from '@/lib/site';
export default function WhatsAppButton() {
  return (
    <a className="wa-float" href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-1.3-.5-2.2-1.6-2.4-2-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.2.2-.4v-.4c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.6-.4 2.9.6 1.5 1.9 3 3.9 3.9 1.9.8 2.3.6 2.8.5.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z" /></svg>
    </a>
  );
}
