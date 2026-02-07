<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Flooring Types';
$pageDescription = 'Explore our flooring options: site-finished wood, pre-finished wood, luxury vinyl, engineered wood, and laminate. Find the perfect floor for your home.';
$canonicalUrl = SITE_URL . '/flooring';
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Flooring Types</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Explore our range of flooring options for your home or project.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($flooringMenu as $item): ?>
        <a href="<?php echo base_url($item['href']); ?>" class="block bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group" style="background-color: #f7f8fc;">
          <h2 class="text-xl font-bold text-primary group-hover:text-primary-600 transition-colors"><?php echo htmlspecialchars($item['name']); ?></h2>
          <span class="inline-block mt-2 text-sm font-medium text-primary group-hover:underline">Learn more →</span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
