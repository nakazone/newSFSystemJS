<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Engineered Wood';
$pageDescription = 'Engineered wood flooring combines a real wood veneer with a stable core for beauty and performance.';
$canonicalUrl = SITE_URL . '/flooring/engineered-wood';
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Engineered Wood</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Engineered wood flooring combines a real wood veneer with a stable core for beauty and performance. Ideal for areas where solid hardwood may not suit.</p>
    <div class="max-w-3xl mx-auto prose prose-lg text-gray-600">
      <p>Content for Engineered Wood can be added here. Contact us for more information or a free estimate.</p>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24 border-t border-gray-100" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto text-center">
      <a href="<?php echo base_url('/flooring'); ?>" class="text-primary font-medium hover:underline">← Back to Flooring Types</a>
    </div>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
