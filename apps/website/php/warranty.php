<?php
require __DIR__ . '/config.php';
$pageTitle = 'Warranty';
$pageDescription = 'Learn about our flooring warranty and guarantee. We stand behind our work with comprehensive coverage.';
$canonicalUrl = SITE_URL . '/warranty';
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Our Warranty</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">We stand behind our work with comprehensive warranty coverage.</p>
    <div class="max-w-3xl mx-auto">
      <div class="flex items-start gap-4 mb-8">
        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(26,32,54,0.1);">
          <span class="text-primary text-2xl">🛡️</span>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary mb-2">Workmanship Guarantee</h2>
          <p class="text-gray-600">Our warranty details and coverage will be displayed here. Contact us for specific terms.</p>
        </div>
      </div>
      <p class="text-gray-600">Warranty terms and conditions can be added to this page. Reach out to our team for current warranty information.</p>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
