const BASE_CSS = [
  "/css/fp-storefront.css?v=20260912g",
  "/css/fp-native.css?v=20260912g",
];

const FONT_URLS = [
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&display=swap",
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,500&family=Inter:wght@500;600&display=swap",
];

const SCRIPTS = [
  "/js/vendor/capacitor.js",
  "/js/fp-native.js?v=20260912g",
  "/js/flower-lore.js?v=20260912g",
  "/js/fp-looks.js?v=20260912g",
];

export function loadLegacyRuntime(extraCss: string[] = [], extraScripts: string[] = []): () => void {
  const links: HTMLLinkElement[] = [];
  const scripts: HTMLScriptElement[] = [];

  for (const href of FONT_URLS) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    links.push(link);
  }

  for (const href of [...BASE_CSS, ...extraCss]) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    links.push(link);
  }

  let chain = Promise.resolve();
  for (const src of [...SCRIPTS, ...extraScripts]) {
    chain = chain.then(
      () =>
        new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          document.body.appendChild(script);
          scripts.push(script);
        }),
    );
  }

  return () => {
    for (const script of scripts) script.remove();
    for (const link of links) link.remove();
  };
}
