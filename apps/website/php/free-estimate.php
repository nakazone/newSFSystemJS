<?php
require __DIR__ . '/config.php';
$pageTitle = 'Free Estimate';
$pageDescription = 'Get a free, no-obligation estimate for your flooring project. Senior Floors Denver.';
$canonicalUrl = SITE_URL . '/free-estimate';
$success = isset($_GET['sent']) && $_GET['sent'] === '1';
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl font-bold text-primary mb-4">Get Your Free Estimate</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Fill out the form below and we'll contact you within 24 hours with a free, no-obligation estimate for your flooring project.</p>

    <?php if ($success): ?>
      <div class="bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl">
        <h2 class="text-xl font-semibold text-green-800 mb-2">Thank You!</h2>
        <p class="text-green-700">We've received your request. Our team will contact you within 24 hours.</p>
      </div>
    <?php else: ?>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="bg-gray-50 rounded-xl p-8">
          <h2 class="text-xl font-bold text-primary mb-4">Request Your Free Estimate</h2>
          <form action="<?php echo base_url('api/estimate.php'); ?>" method="post" class="space-y-4">
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
            <div>
              <label for="service" class="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select id="service" name="service" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="">Select a service</option>
                <?php foreach ($menuServices as $s): ?>
                  <option value="<?php echo htmlspecialchars($s['href']); ?>"><?php echo htmlspecialchars($s['name']); ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            <button type="submit" class="cta-button w-full">Get Free Estimate</button>
          </form>
          <p class="text-xs text-gray-500 mt-4 text-center">By submitting this form, you agree to be contacted by our team.</p>
        </div>
        <div>
          <div class="bg-primary/5 rounded-xl p-6 mb-6" style="background-color: rgba(26,32,54,0.05);">
            <h3 class="text-xl font-bold text-primary mb-4">Why Get an Estimate?</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex gap-2">✔ No obligation – completely free</li>
              <li class="flex gap-2">✔ Transparent pricing</li>
              <li class="flex gap-2">✔ Expert consultation</li>
              <li class="flex gap-2">✔ Quick response time</li>
            </ul>
          </div>
          <p class="text-gray-600"><strong>Prefer to call?</strong> <a href="tel:<?php echo PHONE_RAW; ?>" class="text-secondary hover:underline font-semibold"><?php echo PHONE; ?></a></p>
        </div>
      </div>
    <?php endif; ?>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
