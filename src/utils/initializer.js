import cookie from 'js-cookie';

const init = async () => {
  if (cookie.get('locale') === 'ar') {
    await import('../assets/style/css/bootstrap-rtl.min.css');
    await import('../assets/fonts/ar/stylesheet.css');
  }
  if (cookie.get('theme') == 'dark') {
    await import('../assets/style/sass/en/dark.main.scss');
  } else {
    await import('../assets/style/sass/en/main.scss');
  }
};

export default init;
