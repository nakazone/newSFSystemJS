<?php
// JavaScript para a galeria de projetos na home
?>
<script>
(function() {
  const galleryItems = [
    { img: '<?php echo asset_url("assets/project1.jpg"); ?>', desc: 'Full hardwood refinishing – single-family home in Cherry Creek, Denver, CO' },
    { img: '<?php echo asset_url("assets/project2.jpg"); ?>', desc: 'New white oak installation – open concept living room in Greenwood Village (DTC)' },
    { img: '<?php echo asset_url("assets/project3.jpg"); ?>', desc: 'Chevron pattern installation – luxury home near Morrison' },
    { img: '<?php echo asset_url("assets/project4.jpg"); ?>', desc: 'Stair refinishing and handrail update – Lakewood residence' },
  ];
  let activeIndex = 0;
  const imgEl = document.getElementById('gallery-img');
  const descEl = document.getElementById('gallery-desc');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  
  function updateGallery() {
    if (!imgEl || !descEl) return;
    imgEl.src = galleryItems[activeIndex].img;
    descEl.textContent = galleryItems[activeIndex].desc;
    imgEl.style.opacity = '0';
    setTimeout(() => { imgEl.style.opacity = '1'; }, 150);
  }
  
  function goPrev() {
    activeIndex = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
    updateGallery();
  }
  
  function goNext() {
    activeIndex = activeIndex === galleryItems.length - 1 ? 0 : activeIndex + 1;
    updateGallery();
  }
  
  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);
  
  setInterval(goNext, 5000);
  
  if (imgEl) {
    imgEl.style.transition = 'opacity 0.5s ease-in-out';
  }
})();
</script>
