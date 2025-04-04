import { displayedElementAfter, displayedElementBefore, needsPageBreak } from "../utils/dom.js";

export function afterParsed(parsed, breaks) {
  for (let b in breaks) {
    // Find elements
    let elements = parsed.querySelectorAll(b);
    // Add break data
    for (var i = 0; i < elements.length; i++) {
      for (let prop of breaks[b]) {

        if (prop.property === "break-after") {
          let nodeAfter = displayedElementAfter(elements[i], parsed);

          elements[i].setAttribute("data-break-after", prop.value);

          if (nodeAfter) {
            nodeAfter.setAttribute("data-previous-break-after", prop.value);
          }
        } else if (prop.property === "break-before") {
          let nodeBefore = displayedElementBefore(elements[i], parsed);

          // Breaks are only allowed between siblings, not between a box and its container.
          // If we cannot find a node before we should not break!
          // https://drafts.csswg.org/css-break-3/#break-propagation
          if (nodeBefore) {
            if (prop.value === "page" && needsPageBreak(elements[i], nodeBefore)) {
              // we ignore this explicit page break because an implicit page break is already needed
              continue;
            }
            elements[i].setAttribute("data-break-before", prop.value);
            nodeBefore.setAttribute("data-next-break-before", prop.value);
          }
        } else if (prop.property === "page") {
          elements[i].setAttribute("data-page", prop.value);

          let nodeAfter = displayedElementAfter(elements[i], parsed);

          if (nodeAfter) {
            nodeAfter.setAttribute("data-after-page", prop.value);
          }
        } else {
          elements[i].setAttribute("data-" + prop.property, prop.value);
        }
      }
    }
  }
}

export function afterPageLayout(pageElement, page) {
  let before = pageElement.querySelector("[data-break-before]");
  let after = pageElement.querySelector("[data-break-after]");
  let previousBreakAfter = pageElement.querySelector("[data-previous-break-after]");

  if (before) {
    if (before.dataset.splitFrom) {
      page.splitFrom = before.dataset.splitFrom;
      pageElement.setAttribute("data-split-from", before.dataset.splitFrom);
    } else if (before.dataset.breakBefore && before.dataset.breakBefore !== "avoid") {
      page.breakBefore = before.dataset.breakBefore;
      pageElement.setAttribute("data-break-before", before.dataset.breakBefore);
    }
  }

  if (after && after.dataset) {
    if (after.dataset.splitTo) {
      page.splitTo = after.dataset.splitTo;
      pageElement.setAttribute("data-split-to", after.dataset.splitTo);
    } else if (after.dataset.breakAfter && after.dataset.breakAfter !== "avoid") {
      page.breakAfter = after.dataset.breakAfter;
      pageElement.setAttribute("data-break-after", after.dataset.breakAfter);
    }
  }

  if (previousBreakAfter && previousBreakAfter.dataset) {
    if (previousBreakAfter.dataset.previousBreakAfter && previousBreakAfter.dataset.previousBreakAfter !== "avoid") {
      page.previousBreakAfter = previousBreakAfter.dataset.previousBreakAfter;
    }
  }
}
