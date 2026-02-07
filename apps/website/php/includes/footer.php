<?php
if (!defined('BASE_PATH')) require __DIR__ . '/../config.php';
?>
</main>
<footer class="text-white" style="background-color: #1a2036;">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1">
        <img src="<?php echo asset_url('assets/logoSeniorFloors.png'); ?>" alt="Senior Floors" class="h-32 w-auto object-contain mb-4">
        <p class="text-white/80 mb-4 text-sm leading-relaxed">
          Elegant, durable flooring installed with precision and care. Denver's trusted hardwood flooring experts.
        </p>
        <div class="text-secondary text-sm font-semibold mb-1">★★★★★ Google Reviews</div>
        <div class="text-white/95 text-xs font-semibold uppercase tracking-wide">Hardwood Flooring Specialists</div>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4 text-secondary">Services</h4>
        <ul class="space-y-2">
          <?php foreach ($menuServices as $item): ?>
            <li><a href="<?php echo base_url($item['href']); ?>" class="text-white/80 hover:text-secondary text-sm"><?php echo htmlspecialchars($item['name']); ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4 text-secondary">Flooring</h4>
        <ul class="space-y-2">
          <?php foreach ($flooringMenu as $item): ?>
            <li><a href="<?php echo base_url($item['href']); ?>" class="text-white/80 hover:text-secondary text-sm"><?php echo htmlspecialchars($item['name']); ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-semibold mb-4 text-secondary">Contact Us</h4>
        <p class="text-sm"><strong class="text-white">Phone:</strong> <a href="tel:<?php echo PHONE_RAW; ?>" class="text-secondary hover:underline"><?php echo PHONE; ?></a></p>
        <p class="text-sm mt-2"><strong class="text-white">Email:</strong> <a href="mailto:<?php echo EMAIL; ?>" class="text-secondary hover:underline"><?php echo EMAIL; ?></a></p>
        <p class="text-sm mt-2 text-white/80">Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison, DTC & Metro Area</p>
        <div class="flex gap-3 mt-4">
          <a href="https://www.instagram.com/seniorfloors/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:border-secondary" aria-label="Instagram">IG</a>
          <a href="https://www.facebook.com/seniorflooring" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:border-secondary" aria-label="Facebook">FB</a>
        </div>
      </div>
    </div>
    <div class="mt-12 pt-8 border-t border-white/20 text-center">
      <p class="text-white/80 text-sm">&copy; <?php echo date('Y'); ?> Senior Floors. All rights reserved.</p>
    </div>
  </div>
</footer>
<script>
  document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
</script>
</body>
</html>
