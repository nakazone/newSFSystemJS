<?php
if (!defined('BASE_PATH')) {
    require __DIR__ . '/../config.php';
}
$pageTitle = isset($pageTitle) ? $pageTitle . ' | Senior Floors' : 'Professional Flooring Installation & Services | Senior Floors';
$pageDescription = isset($pageDescription) ? $pageDescription : 'Expert flooring installation and services including hardwood, vinyl, tile, epoxy, and refinishing. Free estimates. Serving Denver and surrounding areas.';
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($pageTitle); ?></title>
<meta name="description" content="<?php echo htmlspecialchars($pageDescription); ?>">
<link rel="canonical" href="<?php echo isset($canonicalUrl) ? htmlspecialchars($canonicalUrl) : SITE_URL . $_SERVER['REQUEST_URI']; ?>">
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: { DEFAULT: '#1a2036', 50: '#f0f2f8', 100: '#e2e8f0', 600: '#252b47', 700: '#14192b' },
          secondary: { DEFAULT: '#d6b598', 50: '#f5ede4', 100: '#e0c4a8', 600: '#c4a588' },
          'text': { dark: '#1a2036', light: '#4a5568', muted: '#718096' },
          'bg': { light: '#f7f8fc', white: '#ffffff' }
        }
      }
    }
  }
</script>
<style>
  .cta-button { @apply inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold text-white transition-all duration-200 bg-primary hover:bg-primary-600 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2; }
  .cta-button-secondary { @apply inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold transition-all duration-200 bg-secondary text-text-dark hover:bg-secondary-100 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2; }
</style>
</head>
<body class="bg-white text-[#1a2036] antialiased">
