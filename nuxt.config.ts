// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/ripplelogo.png' },
      ],
      script: [
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
try {
  if (localStorage.getItem('ptb-analytics') === 'granted') {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-YWFE7H53SL';
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'G-YWFE7H53SL');
  }
} catch (e) {}`,
        },
      ],
    },
  },
})
