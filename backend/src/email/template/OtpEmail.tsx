import * as React from 'react';

interface OtpEmailProps {
  otp: string;
  firstName: string;
}

const OtpEmail: React.FC<OtpEmailProps> = ({ otp, firstName }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>
      <p>Ciao {firstName},</p>
      <p>Hai richiesto il reset della password. Il tuo codice OTP è:</p>
      <div
        style={{
          margin: '16px 0',
          padding: '12px',
          background: '#f5f5f5',
          display: 'inline-block',
        }}
      >
        <strong>{otp}</strong>
      </div>
      <p>Questo codice scade tra 10 minuti.</p>
      <p>Se non hai richiesto questo codice, ignora questa email.</p>
      <p>— Clinica Digitale</p>
    </div>
  );
};

export default OtpEmail;
