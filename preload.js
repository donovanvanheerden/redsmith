const handleDOMContentLoaded = () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);

    if (element) element.innerText = text;
  };

  for (const dep of ['chrome', 'node', 'electron']) {
    replaceText(`${dep}-version`, process.versions[dep]);
  }
};

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
