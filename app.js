(function () {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".price-table");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.getAttribute("data-tab");

      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      panels.forEach(function (panel) {
        const isActive = panel.getAttribute("data-panel") === target;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
})();
