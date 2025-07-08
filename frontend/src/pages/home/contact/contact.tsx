import React, { useState, FormEvent } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Qui puoi gestire l'invio del form
    alert(`Messaggio inviato da ${formData.name} (${formData.email})`);
  };

  return (
    <section id="contact" style={{ padding: '40px' }}>
      <h2>Contattaci</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Messaggio:</label><br />
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Invia</button>
      </form>
    </section>
  );
};

export default Contact;