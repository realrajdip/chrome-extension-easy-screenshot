document.getElementById('screenshotButton').addEventListener('click', () => {
    const format = document.getElementById('formatSelect').value;
  
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (image) => {
      if (format === 'pdf') {
        convertToPDF(image);
      } else {
        downloadImage(image, format);
      }
    });
  });
  
  function downloadImage(image, format) {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
  
      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const dataURL = canvas.toDataURL(mimeType);
  
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `screenshot.${format}`;
      link.click();
    };
    img.src = image;
  }
  
  function convertToPDF(image) {
    const pdf = new jspdf.jsPDF();
    
    const img = new Image();
    img.onload = () => {
      const width = pdf.internal.pageSize.getWidth();
      const height = (img.height * width) / img.width;
  
      pdf.addImage(img, 'PNG', 0, 0, width, height);
      pdf.save('screenshot.pdf');
    };
    img.src = image;
  }
  