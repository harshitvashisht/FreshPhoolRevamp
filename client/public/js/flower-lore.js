/* Heritage / scientific blurbs for catalog hover overlays. No medical claims. */
(function (root) {
  var LORE = {
    "Fresh Roses": {
      binomial: "Rosa × hybrida",
      family: "Rosaceae",
      origin: "West Asia and China; garden roses are centuries of crossing.",
      science: "Cut roses are ethylene-sensitive: nearby fruit speeds petal drop. Cool water and a clean cut slow it."
    },
    "Gerbera": {
      binomial: "Gerbera jamesonii",
      family: "Asteraceae",
      origin: "South African Transvaal daisy, named for botanist Traugott Gerber.",
      science: "A composite head: the disc is packed with tiny florets. High pigment density makes the face read from across a room."
    },
    "Anthurium": {
      binomial: "Anthurium andraeanum",
      family: "Araceae",
      origin: "Tropical Americas; the shiny spathe is a modified leaf, not a petal.",
      science: "The spadix holds the true flowers. A waxy cuticle keeps the spathe looking lacquered in the vase."
    },
    "Carnations": {
      binomial: "Dianthus caryophyllus",
      family: "Caryophyllaceae",
      origin: "Mediterranean; clove-scented cultivars travelled the spice routes.",
      science: "Among the longest-lasting cuts. The name Dianthus is 'flower of Zeus'; caryophyllus nods to clove."
    },
    "Chrysanthemums": {
      binomial: "Chrysanthemum × morifolium",
      family: "Asteraceae",
      origin: "East Asia — cultivated for millennia as ritual, tea, and court bloom.",
      science: "Many florets packed into one head. In India they mark both celebration and remembrance."
    },
    "Dahlias": {
      binomial: "Dahlia",
      family: "Asteraceae",
      origin: "Mexican highlands; Aztec gardens grew them as food and ornament.",
      science: "True tubers, not bulbs. Bloom geometry is a Fibonacci spiral of ray florets."
    },
    "Gladiolus": {
      binomial: "Gladiolus",
      family: "Iridaceae",
      origin: "Most species are African; the name is Latin for a small sword.",
      science: "A spike inflorescence: florets open from the base up, so the stem keeps performing in the vase."
    },
    "Asiatic Lily": {
      binomial: "Lilium Asiatic hybrid",
      family: "Liliaceae",
      origin: "Bred from East Asian lilies; unscented, upright, early.",
      science: "True bulbs. Pollen stains fabric; snip anthers if the stem sits on a table."
    },
    "Orchids (set of 10)": {
      binomial: "Dendrobium (typical cut spray)",
      family: "Orchidaceae",
      origin: "Epiphytes of tropical Asia — they grow on trees, not in soil.",
      science: "Velamen roots drink mist. Sprays last weeks because each floret is a water-tight chamber."
    },
    "Oriental Lilies": {
      binomial: "Lilium Oriental hybrid",
      family: "Liliaceae",
      origin: "Japanese and Chinese trumpet lilies crossed for perfume and size.",
      science: "Heavy fragrance is volatile oils. Pollen is staining; same anther trick as Asiatics."
    },
    "Sunflower": {
      binomial: "Helianthus annuus",
      family: "Asteraceae",
      origin: "North America; a sacred crop long before it was a vase flower.",
      science: "Buds track the sun (heliotropism). Cut stems usually face one way — the disc is already set."
    },
    "Baby's Breath": {
      binomial: "Gypsophila paniculata",
      family: "Caryophyllaceae",
      origin: "Eurasian steppes; 'gypsum lover' — it likes lime-rich soils.",
      science: "Clouds of tiny flowers on wiry stems. The airy habit is architecture, not filler by accident."
    },
    "Tuberose": {
      binomial: "Polianthes tuberosa",
      family: "Asparagaceae",
      origin: "Mexico by birth; India knows it as rajanigandha — the night-fragrant spike.",
      science: "A waxy spike of tubular florets. Scent is strongest after dusk; keep the stem in deep water."
    },
    "Asparagus Fern": {
      binomial: "Asparagus setaceus",
      family: "Asparagaceae",
      origin: "Southern Africa; a fine-textured vine used as cut greenery, not a true fern.",
      science: "What looks like leaves are cladodes — flattened stems. They hold in the vase if the cut stays wet."
    },
    "Eucalyptus": {
      binomial: "Eucalyptus",
      family: "Myrtaceae",
      origin: "Australia; silver-dollar and baby-blue types are the usual cut stems.",
      science: "Oil glands in the leaf give the scent. Woody stems drink slowly — a fresh cut and warm water help."
    },
    "Daily Puja Pack": {
      binomial: "Seasonal mix",
      family: "Altar botanicals",
      origin: "A morning set: jasmine, marigold, lotus and leaves as the season allows.",
      science: "Packed before 7:30 AM so scent and turgor are still high when the lamp is lit."
    },
    "Marigold": {
      binomial: "Tagetes erecta / T. patula",
      family: "Asteraceae",
      origin: "Mexico by birth; India made it the festival flower.",
      science: "Lutein-rich petals. Strong scent is thiophenes — the same chemistry that deters garden pests."
    },
    "Lotus": {
      binomial: "Nelumbo nucifera",
      family: "Nelumbonaceae",
      origin: "Sacred across South and East Asia; rises from still water.",
      science: "Ultra-hydrophobic leaves (the lotus effect). Seed viability is measured in centuries, not seasons."
    },
    "Durva Grass": {
      binomial: "Cynodon dactylon",
      family: "Poaceae",
      origin: "Durva — offered in odd counts to Ganesha.",
      science: "A creeping grass; tied bunches stay turgid if kept damp until the lamp is lit."
    },
    "Loose Tulsi Leaves": {
      binomial: "Ocimum tenuiflorum",
      family: "Lamiaceae",
      origin: "Holy basil; a household deity as much as a herb.",
      science: "Square stems and opposite leaves mark the mint family. Volatile oils are strongest at first light."
    },
    "Loose Lily Flowers": {
      binomial: "Lilium",
      family: "Liliaceae",
      origin: "Loose altar lilies, not the long decorative stem.",
      science: "Pollen stains; snip anthers if the bloom sits on cloth."
    },
    "Loose Rose Flowers": {
      binomial: "Rosa",
      family: "Rosaceae",
      origin: "Loose heads for the altar, distinct from per-stem decorative roses.",
      science: "Petals are the offering. Keep cool so they do not collapse before morning puja."
    },
    "Jasmine Garland": {
      binomial: "Jasminum sambac",
      family: "Oleaceae",
      origin: "Mogra — the night-blooming jasmine of Indian hair and altar.",
      science: "Flowers open after dusk; indole and benzyl acetate carry the perfume. String them the same night."
    },
    "Marigold Garland": {
      binomial: "Tagetes",
      family: "Asteraceae",
      origin: "Toran and malai — the colour of sankranti, onam, and every threshold.",
      science: "Dense heads hold shape when strung. Pigment stays vivid even as the stem dries."
    },
    "Tulsi Garland": {
      binomial: "Ocimum tenuiflorum",
      family: "Lamiaceae",
      origin: "Holy basil; a household deity as much as a herb.",
      science: "Square stems and opposite leaves mark the mint family. Volatile oils are strongest at first light."
    },
    "Chrysanthemum Garland": {
      binomial: "Chrysanthemum × morifolium",
      family: "Asteraceae",
      origin: "East Asian bloom strung for Indian ritual as sevanthi-style malai.",
      science: "Many florets packed into one head, so a garland reads full even in a short length."
    },
    "Bilva Leaves": {
      binomial: "Aegle marmelos",
      family: "Rutaceae",
      origin: "Bael — trifoliate leaves offered to Shiva.",
      science: "Three leaflets on one petiole. The tree is in the citrus family; the fruit is a different offering."
    },
    "Betel Leaf Garland": {
      binomial: "Piper betle",
      family: "Piperaceae",
      origin: "Betel vine leaves strung as 21, 51 or 108 for rite.",
      science: "A vine in the pepper family. Keep the string damp so leaves do not crisp before morning."
    }
  };

  function overlayHtml(lore) {
    return (
      '<div class="lore-overlay" role="note">' +
        '<p class="lore-bin">' + lore.binomial + "</p>" +
        '<p class="lore-fam">' + lore.family + "</p>" +
        '<p class="lore-origin">' + lore.origin + "</p>" +
        '<p class="lore-sci">' + lore.science + "</p>" +
      "</div>"
    );
  }

  function apply() {
    document.querySelectorAll(".prod-card").forEach(function (card) {
      var lore = LORE[card.dataset.name];
      if (!lore) return;
      var photo = card.querySelector(".prod-photo");
      if (!photo || photo.querySelector(".lore-overlay")) return;
      photo.insertAdjacentHTML("beforeend", overlayHtml(lore));
      photo.setAttribute("tabindex", "0");
      photo.setAttribute("aria-label", (card.dataset.name || "") + " — heritage");
      function closeLore() {
        card.classList.remove("lore-open");
        if (photo === document.activeElement || photo.contains(document.activeElement)) {
          if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        }
      }
      function toggle(e) {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && e.type === "click") return;
        card.classList.toggle("lore-open");
      }
      photo.addEventListener("click", toggle);
      photo.addEventListener("mouseleave", closeLore);
      photo.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.classList.toggle("lore-open");
        }
      });
      card.addEventListener("pointerdown", function (e) {
        if (!photo.contains(e.target)) closeLore();
      });
    });
  }

  root.FLOWER_LORE = LORE;
  root.applyFlowerLore = apply;
})(window);
