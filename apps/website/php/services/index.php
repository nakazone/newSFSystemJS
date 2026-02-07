<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Our Services';
$pageDescription = 'Hardwood refinishing, installation, water damage repair, extend hardwood, screen and coat, self leveling, stairs. Senior Floors Denver.';
$canonicalUrl = SITE_URL . '/services';
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Our Flooring Services</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Expert installation and services for all your flooring needs. From hardwood to epoxy, we have got you covered.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($menuServices as $item): ?>
        <a href="<?php echo base_url($item['href']); ?>" class="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all group border border-gray-200">
          <div class="mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center group-hover:from-primary-600 group-hover:to-primary-700 transition-all shadow-md group-hover:shadow-lg group-hover:-translate-y-1" style="background: linear-gradient(to bottom right, #1a2036, #252b47);">
              <span class="text-3xl filter brightness-0 invert">🏠</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors"><?php echo htmlspecialchars($item['name']); ?></h2>
          <p class="text-gray-600 mb-4"><?php echo htmlspecialchars($item['shortDescription']); ?></p>
          <span class="inline-block text-primary font-semibold group-hover:underline">Learn More →</span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Not Sure Which Service You Need?</h2>
    <p class="text-lg text-gray-600 mb-8">Our experts can help you choose the perfect flooring solution for your space.</p>
    <a href="<?php echo base_url('/free-estimate'); ?>" class="cta-button text-lg px-8 py-4">Get Free Consultation</a>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
