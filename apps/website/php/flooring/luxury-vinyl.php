<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Luxury Vinyl';
$pageDescription = 'Luxury vinyl plank (LVP) and luxury vinyl tile (LVT) offer waterproof, durable, and stylish flooring. Perfect for any room.';
$canonicalUrl = SITE_URL . '/flooring/luxury-vinyl';
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Luxury Vinyl</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Luxury vinyl plank (LVP) and luxury vinyl tile (LVT) offer waterproof, durable, and stylish flooring. Perfect for any room. See our luxury vinyl collection.</p>
    <div class="max-w-3xl mx-auto prose prose-lg text-gray-600">
      <p>Content for Luxury Vinyl can be added here. Contact us for more information or a free estimate.</p>
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
