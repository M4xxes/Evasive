import React, { useState } from 'react';
import { contact } from '../data/site';

const inputClass =
  'w-full bg-transparent border-b border-white/20 py-4 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-400 transition-colors';

// Envoi : endpoint de formulaire si configuré, sinon client mail (si un email est renseigné).
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | unavailable

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (contact.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.statusText);
        e.target.reset();
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    if (contact.email) {
      const subject = encodeURIComponent(`Contact — ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n${data.name} — ${data.email}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('unavailable');
  };

  if (status === 'sent') {
    return (
      <p className="animate-fade-in py-16 font-serif-title text-2xl tracking-widest text-white">
        {contact.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-xl flex-col gap-6 text-left">
      <label className="sr-only" htmlFor="contact-name">Nom</label>
      <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="NOM *" className={inputClass} />
      <label className="sr-only" htmlFor="contact-email">Adresse email</label>
      <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="ADRESSE EMAIL *" className={inputClass} />
      <label className="sr-only" htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" required rows={5} placeholder="MESSAGE *" className={inputClass}></textarea>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full bg-white py-4 text-xs font-bold uppercase tracking-[0.3em] text-black transition-colors hover:bg-amber-400 disabled:opacity-60"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer →'}
      </button>
      {status === 'error' && (
        <p className="text-center text-xs tracking-wider text-red-400">
          L'envoi a échoué. Merci de réessayer un peu plus tard.
        </p>
      )}
      {status === 'unavailable' && (
        <p className="text-center text-xs tracking-wider text-amber-400">
          L'envoi de messages n'est pas encore configuré sur ce site.
        </p>
      )}
    </form>
  );
}
