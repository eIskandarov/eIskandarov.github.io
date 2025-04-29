document.addEventListener(
  "dblclick",
  function(e) {
    e.preventDefault();
    console.log("prevented");
  },
  { passive: false },
);
