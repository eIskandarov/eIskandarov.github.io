class Utils {
  static debounce(fn, delay) {
    let id = null;
    let outerArgs = [];

    function execute() {
      fn(...outerArgs);
      id = null;
    }

    return function(...args) {
      if (id !== null) {
        clearTimeout(id);
      }

      id = setTimeout(execute, delay);
      outerArgs = args;
    };
  }
}

export default Utils;
