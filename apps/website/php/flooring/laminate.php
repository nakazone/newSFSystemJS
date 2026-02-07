<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Laminate';
$pageDescription = 'Laminate flooring delivers the look of wood or tile at an affordable price. Durable, easy to maintain.';
$canonicalUrl = SITE_URL . '/flooring/laminate';
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Laminate</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Laminate flooring delivers the look of wood or tile at an affordable price. Durable, easy to maintain, and available in a wide range of styles.</p>
    <div class="max-w-3xl mx-auto prose prose-lg text-gray-600">
      <p>Content for Laminate can be added here. Contact us for more information or a free estimate.</p>
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
