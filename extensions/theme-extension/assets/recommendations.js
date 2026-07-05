(function () {
  function formatProductItem(product, showImage) {
    var li = document.createElement("li");
    li.className = "rec-item";

    var anchor = document.createElement("a");
    anchor.href = product.url;
    anchor.className = "rec-link";

    if (showImage && product.featured_image) {
      var imageWrapper = document.createElement("div");
      imageWrapper.className = "rec-image";
      var img = document.createElement("img");
      img.src = product.featured_image.src || product.featured_image;
      img.alt = product.title;
      img.loading = "lazy";
      imageWrapper.appendChild(img);
      anchor.appendChild(imageWrapper);
    }

    var meta = document.createElement("div");
    meta.className = "rec-meta";
    var title = document.createElement("span");
    title.className = "rec-title";
    title.textContent = product.title;
    meta.appendChild(title);

    if (product.vendor) {
      var vendor = document.createElement("span");
      vendor.className = "rec-description";
      vendor.textContent = product.vendor;
      meta.appendChild(vendor);
    }

    anchor.appendChild(meta);
    li.appendChild(anchor);
    return li;
  }

  function initCarousel(carousel) {
    var track = carousel.querySelector(".rec-track");
    var items = track ? Array.from(track.children) : [];
    var prev = carousel.querySelector(".rec-prev");
    var next = carousel.querySelector(".rec-next");
    var block = carousel.closest(".recommendations-block");
    var limit = parseInt(block.dataset.limit, 10) || 3;
    var visibleItems = Math.min(
      parseInt(block.dataset.carouselItems, 10) || limit,
      items.length,
    );
    var visible = Math.max(1, visibleItems);

    if (!track) return;

    items.forEach(function (item) {
      item.style.width = 100 / visible + "%";
    });

    var index = 0;
    function update() {
      var maxIndex = Math.max(0, items.length - visible);
      track.style.transform = "translateX(" + -index * (100 / visible) + "%)";
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index >= maxIndex;
    }

    if (prev)
      prev.addEventListener("click", function () {
        index = Math.max(0, index - 1);
        update();
      });

    if (next)
      next.addEventListener("click", function () {
        index = Math.min(items.length - visible, index + 1);
        update();
      });

    window.addEventListener("resize", function () {
      visible = Math.max(
        1,
        Math.min(
          parseInt(block.dataset.carouselItems, 10) || limit,
          items.length,
        ),
      );
      items.forEach(function (item) {
        item.style.width = 100 / visible + "%";
      });
      update();
    });

    update();
  }

  function renderRecommendations(container, products, layout, showImage) {
    var grid = container.querySelector(".rec-grid");
    var carousel = container.querySelector(".rec-carousel");
    var message = container.querySelector(".rec-message");
    var track = container.querySelector(".rec-track");

    if (!products.length) {
      if (message) {
        message.textContent = "No recommendations available for this product.";
        message.hidden = false;
      }
      if (grid) grid.hidden = true;
      if (carousel) carousel.hidden = true;
      return;
    }

    if (message) message.hidden = true;
    if (grid) grid.innerHTML = "";
    if (track) track.innerHTML = "";

    products.forEach(function (product) {
      var item = formatProductItem(product, showImage);
      if (layout === "carousel") {
        if (track) track.appendChild(item);
      } else {
        item.className = "rec-card";
        if (grid) grid.appendChild(item);
      }
    });

    if (layout === "carousel") {
      if (grid) grid.hidden = true;
      if (carousel) {
        carousel.hidden = false;
        initCarousel(carousel);
      }
    } else {
      if (grid) grid.hidden = false;
      if (carousel) carousel.hidden = true;
    }
  }

  function fetchRecommendations(block) {
    var productId = block.dataset.productId;
    var intent = block.dataset.intent || "related";
    var limit = block.dataset.limit || "3";
    var showImage = block.dataset.showImage === "true";
    var layout = block.dataset.layout || "grid";
    var url =
      block.dataset.url ||
      window.location.origin +
        "/recommendations/products.json?product_id=" +
        productId +
        "&limit=" +
        limit +
        "&intent=" +
        intent;

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.status + " " + response.statusText);
        }
        return response.json();
      })
      .then(function (payload) {
        renderRecommendations(block, payload.products || [], layout, showImage);
      })
      .catch(function (error) {
        console.error("Recommendation fetch failed:", error);
        var message = block.querySelector(".rec-message");
        if (message) message.textContent = "Unable to load recommendations.";
      });
  }

  function initRecommendations() {
    document
      .querySelectorAll(".recommendations-block")
      .forEach(function (block) {
        if (!block.dataset.productId) return;
        fetchRecommendations(block);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRecommendations);
  } else {
    initRecommendations();
  }
})();
