function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString(); 
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    console.log(`Cookie ${name} set with value ${value}`);
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, val] = cookie.split('=');
      acc[key] = val;
      return acc;
    }, {});
    return cookies[name];
  }
  
  function setSession(key, value) {
    sessionStorage.setItem(key, value);
    console.log(`Session key ${key} set with value ${value}`);
  }
  
  function getSession(key) {
    return sessionStorage.getItem(key);
  }
  