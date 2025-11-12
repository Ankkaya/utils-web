/**
 * 本地存储封装工具
 * 支持 localStorage, sessionStorage, Cookie, IndexedDB
 */

const Storage = {
  /**
   * localStorage 操作
   */
  local: {
    set(key, value) {
      try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
        return true;
      } catch (e) {
        console.error('localStorage set error:', e);
        return false;
      }
    },
    get(key, defaultValue = null) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
      } catch (e) {
        console.error('localStorage get error:', e);
        return defaultValue;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('localStorage remove error:', e);
        return false;
      }
    },
    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.error('localStorage clear error:', e);
        return false;
      }
    }
  },

  /**
   * sessionStorage 操作
   */
  session: {
    set(key, value) {
      try {
        const data = JSON.stringify(value);
        sessionStorage.setItem(key, data);
        return true;
      } catch (e) {
        console.error('sessionStorage set error:', e);
        return false;
      }
    },
    get(key, defaultValue = null) {
      try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
      } catch (e) {
        console.error('sessionStorage get error:', e);
        return defaultValue;
      }
    },
    remove(key) {
      try {
        sessionStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('sessionStorage remove error:', e);
        return false;
      }
    },
    clear() {
      try {
        sessionStorage.clear();
        return true;
      } catch (e) {
        console.error('sessionStorage clear error:', e);
        return false;
      }
    }
  },

  /**
   * Cookie 操作
   */
  cookie: {
    set(name, value, days = 30) {
      try {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
        return true;
      } catch (e) {
        console.error('Cookie set error:', e);
        return false;
      }
    },
    get(name, defaultValue = null) {
      try {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
          }
        }
        return defaultValue;
      } catch (e) {
        console.error('Cookie get error:', e);
        return defaultValue;
      }
    },
    remove(name) {
      try {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        return true;
      } catch (e) {
        console.error('Cookie remove error:', e);
        return false;
      }
    }
  },

  /**
   * IndexedDB 操作（简化版）
   */
  indexedDB: {
    dbName: 'UtilsWebDB',
    dbVersion: 1,
    
    async open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('history')) {
            db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
          }
        };
      });
    },
    
    async add(storeName, data) {
      try {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return store.add(data);
      } catch (e) {
        console.error('IndexedDB add error:', e);
        throw e;
      }
    },
    
    async getAll(storeName) {
      try {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return store.getAll();
      } catch (e) {
        console.error('IndexedDB getAll error:', e);
        return [];
      }
    }
  }
};

