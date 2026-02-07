<?php
require __DIR__ . '/../config.php';
$pageTitle = 'Professional Hardwood Floor Refinishing';
$pageDescription = 'Bring your hardwood floors back to life. Senior Floors offers professional refinishing: evaluation, dust-controlled sanding, stain & finish. Free estimate.';
$canonicalUrl = SITE_URL . '/services/hardwood-refinishing';

$processSteps = [
  ['title' => 'Personalized Evaluation', 'desc' => 'We begin with a detailed inspection of your floor, assessing its condition, level of wear, wood type, and specific needs. This allows us to recommend the best refinishing approach and ideal finish for your space.'],
  ['title' => 'Preparation & Protection', 'desc' => 'Before work begins, we carefully protect your home. Cabinets, baseboards, and doorways are sealed with plastic and protective materials to keep your space clean and minimize disruption.'],
  ['title' => 'Dust-Controlled Sanding', 'desc' => 'We use state-of-the-art sanding equipment with advanced dust containment systems that capture up to 90% of airborne dust, ensuring a cleaner and healthier environment.'],
  ['title' => 'Repairs & Surface Leveling', 'desc' => 'Cracks, gaps, nail holes, and imperfections are filled and repaired, followed by fine sanding to create a smooth, even surface ready for finishing.'],
  ['title' => 'Stain & Finish Application', 'desc' => 'Choose from a wide range of stain colors and sheen levels, or keep the natural look of the wood. We apply stain (if desired) and up to three coats of a high-performance, durable finish to protect your floors from future wear.'],
  ['title' => 'Final Inspection', 'desc' => 'A thorough final walkthrough ensures the finished floors meet our quality standards and exceed your expectations.'],
];

$benefits = [
  'Cost-Effective Alternative to Replacement – refinishing costs significantly less than installing new flooring',
  'Extended Floor Lifespan – new protective layers help your floors last for years',
  'Easier Maintenance – smooth, sealed surfaces resist dirt and are easier to clean',
  'Improved Indoor Air Quality – removing old buildup and applying fresh finishes enhances the home environment',
];

include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/header.php';
?>

<section class="py-16 lg:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:items-start">
      <div class="min-w-0">
        <h1 class="text-4xl sm:text-5xl lg:text-5xl font-bold text-primary mb-2">Professional Hardwood Floor Refinishing</h1>
        <p class="text-xl sm:text-2xl text-primary-600 font-medium mb-4" style="color: #252b47;">Bring Your Hardwood Floors Back to Life</p>
        <div class="text-lg text-gray-600 mb-8 space-y-4">
          <p>At Senior Floors, our hardwood floor refinishing service is carefully designed to transform worn, scratched, or faded floors into stunning surfaces that look brand new again. Whether for residential, commercial, or historic spaces, we provide complete restoration solutions that preserve the quality, durability, and unique character of each wood floor.</p>
          <p><strong>Why Refinish Your Hardwood Floors?</strong></p>
          <p>Even high-quality solid hardwood floors can lose their shine and protection over time due to natural wear, heavy foot traffic, scratches, and aging finishes. Refinishing is the ideal solution to restore the original beauty of your floors, remove deep scratches and stains, update the color or style, increase property value, and improve safety and comfort.</p>
          <p>Refinishing is far more cost-effective than installing new floors and delivers long-lasting results while preserving the integrity of the wood for many years.</p>
        </div>
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
            <input type="hidden" name="service" value="/services/hardwood-refinishing">
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
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-8">Benefits of Professional Refinishing</h2>
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
    <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">Our Professional Refinishing Process</h2>
    <p class="text-lg text-gray-600 mb-12">Here's how we deliver outstanding results with precision and care:</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:items-start">
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
      <div class="mt-10 lg:mt-0">
        <div class="rounded-xl overflow-hidden shadow-lg">
          <img src="<?php echo asset_url('assets/project1.jpg'); ?>" alt="Hardwood floor refinishing" class="w-full h-80 object-cover">
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-16 lg:py-24 text-white" style="background: linear-gradient(135deg, #1a2036, #252b47);">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-4">Request a Free Evaluation & Estimate</h2>
    <p class="text-xl text-white/90 mb-4">Ready to restore your hardwood floors with professional care and exceptional results? Contact us today to schedule a free consultation.</p>
    <p class="text-lg mb-8 text-secondary font-medium">✨ Transform your hardwood floors — and renew the heart of your home.</p>
    <a href="<?php echo base_url('/free-estimate'); ?>" class="cta-button-secondary text-lg px-8 py-4">Get Free Estimate</a>
  </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
