export default function ThemeInit() {
  const code = `
(() => {
  let theme = 'light';

  try {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
  } catch {
    theme = 'light';
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.bsTheme = theme;
  if (document.body) {
    document.body.dataset.bsTheme = theme;
  }
})();
`;

  // eslint-disable-next-line react/no-danger -- static inline script, no user input, required for no-flash theme init
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
