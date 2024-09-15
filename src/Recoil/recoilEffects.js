export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    // 嘗試從 localStorage 獲取初始值
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // 監聽 atom 值的變化，並將新值存入 localStorage
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
