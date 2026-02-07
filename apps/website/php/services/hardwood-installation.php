<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Hardwood Installation';
$pageDescription = 'New hardwood flooring installed with precision and care. Site-finished and pre-finished options available.';
$canonicalUrl = SITE_URL . '/services/hardwood-installation';

$processSteps = [
  ['title' => 'Free Estimate', 'desc' => 'We measure the space and discuss species, width, and finish.'],
  ['title' => 'Acclimation', 'desc' => 'Wood is delivered and acclimated to your home\'s humidity.'],
  ['title' => 'Installation', 'desc' => 'Expert installation with proper fastening and expansion gaps.'],
  ['title' => 'Finish (if site-finished)', 'desc' => 'Sanding and finishing on-site for a seamless look.'],
];

$benefits = [
  'Increases property value significantly',
  'Durable and long-lasting (50+ years with care)',
  'Wide range of species and finishes',
  'Professional installation ensures warranty validity',
];

include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:items-start">
      <div class="min-w-0">
        <h1 class="text-4xl sm:text-5xl font-bold text-primary mb-4">Hardwood Installation</h1>
        <p class="text-lg text-gray-600 mb-8">From site-finished to pre-finished, we install hardwood flooring for homes and businesses. We handle subfloor prep, acclimation, layout, and finishing details so your new floors look flawless and last for decades.</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="<?php echo base_url('/free-estimate'); ?>" class="cta-button text-lg px-8 py-4">Get Free Estimate</a>
          <a href="tel:<?php echo PHONE_RAW; ?>" class="cta-button-secondary text-lg px-8 py-4 flex items-center justify-center">Call <?php echo PHONE; ?></a>
        </div>
      </div>
      <div class="mt-10 lg:mt-0">
        <div class="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 sticky lg:top-24">
          <h2 class="text-xl font-bold text-primary mb-2">Get Your Free Flooring Estimate</h2>
          <p class="text-sm text-gray-500 mb-6">Fill out the form below and we'll contact you within 24 hours</p>
          <form action="<?php echo base_url('api/estimate.php'); ?>" method="post" class="space-y-4">
            <input type="hidden" name="service" value="/services/hardwood-installation">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="name" name="name" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="John Doe">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" name="email" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="john@example.com">
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" id="phone" name="phone" required class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="(720) 555-0123">
            </div>
            <button type="submit" class="cta-button w-full">Get Free Estimate</button>
          </form>
          <p class="text-xs text-gray-500 mt-4 text-center">✓ No obligation · ✓ Free in-home consultation · ✓ Same-day response</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-8">Benefits of Hardwood Installation</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <?php foreach ($benefits as $b): ?>
        <div class="flex items-start gap-3">
          <span class="text-secondary text-xl flex-shrink-0">✔</span>
          <p class="text-gray-700"><?php echo htmlspecialchars($b); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Installation Process</h2>
    <p class="text-lg text-gray-600 mb-12">We follow a proven process to ensure quality results every time</p>
    <div class="space-y-8">
      <?php foreach ($processSteps as $i => $step): ?>
        <div class="flex gap-6">
          <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white" style="background-color: #252b47;"><?php echo $i + 1; ?></div>
          <div>
            <h3 class="text-xl font-semibold text-primary mb-2"><?php echo htmlspecialchars($step['title']); ?></h3>
            <p class="text-gray-600"><?php echo htmlspecialchars($step['desc']); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
