<?php
require __DIR__ . '/config.php';
$pageTitle = 'Contact Us';
$pageDescription = 'Contact Senior Floors for a free flooring estimate. Denver metro area. Phone, email, and contact form.';
$canonicalUrl = SITE_URL . '/contact';
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';
?>

<section class="py-16 lg:py-24" style="background-color: #f7f8fc;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">Get In Touch</h1>
    <p class="text-xl text-gray-600 max-w-3xl mb-12">Have questions? We are here to help.</p>
  </div>
</section>

<section class="py-16 lg:py-24 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      <div>
        <h2 class="text-2xl font-bold text-primary mb-2">Send a message</h2>
        <p class="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
        <div class="bg-gray-50 rounded-xl p-6 sm:p-8">
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
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-primary mb-6">Contact</h2>
        <ul class="space-y-5 text-gray-600">
          <li class="flex gap-3">
            <span class="text-primary text-xl flex-shrink-0 mt-0.5">📞</span>
            <span>
              <a href="tel:<?php echo PHONE_RAW; ?>" class="text-primary font-medium hover:underline"><?php echo PHONE; ?></a><br>
              <span class="text-sm">Mon–Fri 8am–6pm</span>
            </span>
          </li>
          <li class="flex gap-3">
            <span class="text-primary text-xl flex-shrink-0 mt-0.5">✉️</span>
            <span>
              <a href="mailto:<?php echo EMAIL; ?>" class="text-primary font-medium hover:underline"><?php echo EMAIL; ?></a>
            </span>
          </li>
          <li class="flex gap-3">
            <span class="text-primary text-xl flex-shrink-0 mt-0.5">📍</span>
            <span>Denver, CO · Metro Area</span>
          </li>
          <li class="flex gap-3">
            <span class="text-primary text-xl flex-shrink-0 mt-0.5">⏰</span>
            <span>Sat 9am–4pm · Sun closed</span>
          </li>
        </ul>
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm font-medium text-primary mb-2">Follow us</p>
          <div class="flex gap-2">
            <a href="https://www.instagram.com/seniorfloors/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" aria-label="Instagram" style="background-color: rgba(26,32,54,0.05);">IG</a>
            <a href="https://www.facebook.com/seniorflooring" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" aria-label="Facebook" style="background-color: rgba(26,32,54,0.05);">FB</a>
          </div>
        </div>
        <div class="mt-6">
          <p class="text-sm font-medium text-primary mb-1">Service areas</p>
          <p class="text-sm text-gray-600">Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison & metro area</p>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
