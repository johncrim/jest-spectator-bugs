// browser mocks globally available for every test

// See https://github.com/angular/material2/issues/7101
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

// Add Element.scrollIntoView
if (window.Element.prototype.scrollIntoView === undefined) {
  (window.Element.prototype as any).scrollIntoView = (arg?: boolean | ScrollIntoViewOptions) => { };
}
