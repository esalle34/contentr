"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Dropdown = () => {
  var dropdownList = Array.from(document.querySelectorAll(".dropdown,.dropright"));

  document.onclick = e => {
    dropdownList.map(dropdown => {
      for (var i = 0; i < dropdown.childNodes.length; i++) {
        dropdown.childNodes[i].classList.remove("show");
      }
    });
  };

  dropdownList.map(dropdown => {
    dropdown.onclick = e => {
      if (!e.target.classList.contains("dropdown-item") || !e.target.classList.contains("dropright")) {
        e.stopPropagation();

        if (e.target.classList.contains("show")) {
          e.target.classList.remove("show");
          e.target.parentNode.lastChild.classList.remove("show");
        } else {
          e.target.classList.add("show");
          e.target.parentNode.lastChild.classList.add("show");
        }
      }
    };

    dropdown.onmouseover = e => {
      var r = e.toElement || e.relatedTarget;

      if (dropdown.classList.contains("submenu")) {
        dropdownList.map(d => {
          if (!d.contains(e.target)) {
            d.firstChild.classList.remove("show");
            d.lastChild.classList.remove("show");
          } else {
            d.firstChild.classList.add("show");
            d.lastChild.classList.add("show");
          }
        });
      }
    };
  });
};

var _default = Dropdown;
exports.default = _default;