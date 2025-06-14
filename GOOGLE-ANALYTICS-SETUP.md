# 📊 Google Analytics 4 Setup Guide - Magna Web

## Quick Setup (5 minutes)

### 1. Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Start measuring**
4. Account name: "Magna Web"
5. Choose your data sharing preferences

### 2. Create Property
1. Property name: "Magna Web Website"
2. Time zone: **"(GMT-04:00) Atlantic Time (Dominican Republic)"**
3. Currency: **Dominican Peso (DOP)**

### 3. Get Tracking Code
1. Platform: **Web**
2. Website URL: `magnaweb.do` (or your domain)
3. Stream name: "Magna Web Main Site"
4. Copy the **Measurement ID** (looks like: `G-XXXXXXXXXX`)

### 4. Add to Website
**Add this code to the `<head>` section of ALL pages:**

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID**

### 5. Track Important Events
**Add this to your EmailJS success functions:**

```javascript
// In contact form success
gtag('event', 'form_submit', {
    'event_category': 'engagement',
    'event_label': 'contact_form'
});

// In project form success  
gtag('event', 'form_submit', {
    'event_category': 'engagement',
    'event_label': 'project_form'
});

// WhatsApp button clicks
gtag('event', 'click', {
    'event_category': 'engagement', 
    'event_label': 'whatsapp_button'
});
```

### 6. Verify Installation
1. Go back to Google Analytics
2. Check **Real-time** reports
3. Visit your website - you should see activity

## 🎯 What You'll Track:
- **Page views** - Which pages are most popular
- **Form submissions** - Contact and project forms
- **WhatsApp clicks** - Direct client interest
- **Traffic sources** - Where visitors come from
- **User behavior** - How people navigate your site

## 📈 Key Metrics to Watch:
- **Total visitors** per month
- **Form conversion rate** (visitors → form submissions)
- **Most popular pages**
- **Traffic sources** (Google, social media, direct)
- **Mobile vs desktop usage**

---
*Setup time: 5 minutes • Data available: 24-48 hours* 