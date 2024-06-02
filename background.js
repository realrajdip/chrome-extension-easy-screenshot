chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.captureVisibleTab(null, {}, (image) => {
      // Save the screenshot or do something with the image
      console.log(image);
    });
  });
  