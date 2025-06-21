"use client";

import React, { useState } from 'react';
import type { ClientFieldProps, UIFieldClient } from 'payload'

const SendTestEmailComponent: React.FC<UIFieldClient> = (props) => {
  console.log(props) 
  const { value = {} } = props;

  // Grab subject and body from group value
  const subject = value.subject || '';
  const body = value.body || ''; 

  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject,
          body,
          type: 'userSignup',
        }),
      });
      if (res.ok) {
        setResult('Test email sent!');
      } else {
        setResult('Failed to send test email.');
      }
    } catch {
      setResult('Failed to send test email.');
    }
    setSending(false);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <input
        type="email"
        placeholder="Test email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginRight: 8, padding: 4 }}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={sending || !email}
        style={{ padding: 4 }}
      >
        {sending ? 'Sending…' : 'Send Test Email'}
      </button>
      {result && <div style={{ marginTop: 8 }}>{result}</div>}
    </div>
  );
};

export default SendTestEmailComponent;
