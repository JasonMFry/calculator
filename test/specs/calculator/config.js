module.exports = {
  // get zero () { return browser.element('button*=0)'); },
  get zero() { return browser.element('button*=0'); },
  get one() { return browser.element('button*=1'); },
  get two() { return browser.element('button*=2'); },
  get three() { return browser.element('button*=3'); },
  get four() { return browser.element('button*=4'); },
  get five() { return browser.element('button*=5'); },
  get six() { return browser.element('button*=6'); },
  get seven() { return browser.element('button*=7'); },
  get eight() { return browser.element('button*=8'); },
  get nine() { return browser.element('button*=9'); },
  get period() { return browser.element('button*=.'); },

  get dividedBy() { return browser.element('button*=÷'); },
  get times() { return browser.element('button*=×'); },
  get minus() { return browser.element('button*=-'); },
  get plus() { return browser.element('button*=+'); },
  get equals() { return browser.element('button*=='); },

  get responsePaneText() { return browser.getText('#response-pane'); },
};
