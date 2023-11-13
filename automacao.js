function downloadAndClick(index) {
    
    var imgXPath = '/html/body/div/div[2]/div[5]/div[3]/div/div[2]/div[2]/div/div[1]/div/img';
    var imgElement = document.evaluate(imgXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
    if (imgElement) {
      
      var imgUrl = imgElement.src;
      var imgFilename = 'image' + index + '.jpg';
  
      downloadImage(imgUrl, imgFilename);
  
      var divXPath = '/html/body/div/div[2]/div[5]/div[3]/div/div[3]/div[2]';
      var divElement = document.evaluate(divXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
      if (divElement) {
        
        divElement.click();
      } else {
        console.error('Elemento da div não encontrado para XPath:', divXPath);
      }
    } else {
      console.error('Elemento de imagem não encontrado para XPath:', imgXPath);
    }
  }
  
  function downloadImage(imgUrl, imgFilename) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imgUrl, true);
    xhr.responseType = 'blob';
  
    xhr.onload = function () {
      var blob = xhr.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = imgFilename;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(link.href);
    };
  
    xhr.send();
  }
  
  
  for (var i = 0; i < 78; i++) {
    
    setTimeout(function (index) {
      return function () {
        downloadAndClick(index);
      };
    }(i), i * 1000);
  }
  