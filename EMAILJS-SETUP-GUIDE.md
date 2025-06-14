# 📧 EmailJS Setup Guide - Magna Web

## Quick Setup (5 minutes)

### 1. Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up with your email (free plan is fine)
3. Verify your email

### 2. Configure Service
1. Go to **Services** in EmailJS dashboard
2. Click **Add Service**
3. Choose **Gmail** (easiest) or your preferred email provider
4. Connect your `hola@magnaweb.do` email account
5. Copy the **Service ID** (looks like: `service_xxxxxxx`)

### 3. Create Email Templates
**Template 1: Contact Form**
1. Go to **Email Templates**
2. Click **Create New Template**
3. Template ID: `contact_form_template`
4. Subject: `Nuevo mensaje de contacto - {{from_name}}`
5. Content:
```
Hola Magna Web Team,

Tienes un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

Responde pronto!
```

**Template 2: Project Form**
1. Create another template
2. Template ID: `project_form_template` 
3. Subject: `Nueva solicitud de proyecto - {{business_name}}`
4. Content:
```
¡Nueva solicitud de proyecto!

=== INFORMACIÓN DEL NEGOCIO ===
Empresa: {{business_name}}
Industria: {{industry}}

=== DETALLES DEL PROYECTO ===
Tipos de proyecto: {{project_types}}
Presupuesto: {{budget}}
Timeline: {{timeline}}

=== CONTACTO ===
Nombre: {{client_name}}
Email: {{client_email}}
Teléfono: {{client_phone}}

=== DETALLES ADICIONALES ===
{{project_details}}

¡Contacta al cliente dentro de 24 horas!
```

### 4. Get Your Keys
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like: `YOUR_PUBLIC_KEY`)

### 5. Update the Code
Replace in both `js/main.js` and `js/project-form.js`:

```javascript
// Replace these lines:
emailjs.init("YOUR_PUBLIC_KEY"); 
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// With your actual values:
emailjs.init("your_actual_public_key");
emailjs.send('service_xxxxxxx', 'contact_form_template', templateParams)
```

For project form, use:
```javascript
emailjs.send('service_xxxxxxx', 'project_form_template', templateParams)
```

### 6. Test Everything
1. Open your website
2. Fill out contact form → should receive email
3. Fill out project form → should receive detailed email

## 🚀 You're Done!
Forms will now send emails directly to `hola@magnaweb.do` instantly.

## Alternative: Gmail Setup
If you don't have `hola@magnaweb.do` yet:
1. Use your personal Gmail temporarily
2. Set up `hola@magnaweb.do` later with your domain provider
3. Update EmailJS service when ready

---
*Total setup time: 5-10 minutes* 