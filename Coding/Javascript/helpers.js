function setLocalData(key, value) {
    window.localStorage.setItem(key, value);
  }
  
  function getLocalData(key) {
    var result = window.localStorage.getItem(key);
    if (result != null){
        return result;
    }
    return "";
  }