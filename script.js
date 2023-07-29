var array = [];

function generateArray() {
  array = [];
  var arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = "";

  for (var i = 0; i < 50; i++) {
    var value = Math.floor(Math.random() * 200) + 1;
    array.push(value);

    var bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value + "px";
    arrayContainer.appendChild(bar);
  }
}

function resetArray() {
  generateArray();
}

function swap(i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSort() {
  var len = array.length;
  var sorted = false;

  var i = 0;
  var j = 0;
  var interval = setInterval(function() {
    if (i < len - j - 1) {
      var currentBar = document.getElementsByClassName("bar")[i];
      currentBar.style.backgroundColor = "#ff0000";

      var nextBar = document.getElementsByClassName("bar")[i + 1];
      nextBar.style.backgroundColor = "#ff0000";

      if (array[i] > array[i + 1]) {
        swap(i, i + 1);

        currentBar.style.height = array[i] + "px";
        nextBar.style.height = array[i + 1] + "px";
      }

      setTimeout(function() {
        currentBar.style.backgroundColor = "#4caf50";
        nextBar.style.backgroundColor = "#4caf50";
      }, 300);
      
      i++;
    } else {
      if (!sorted) {
        sorted = true;
        j++;
        i = 0;
      } else {
        clearInterval(interval);
      }
    }
  }, 500);
}

function selectionSort() {
  var len = array.length;
  var minIndex, temp;

  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    var interval = setInterval(function() {
      var currentBar = document.getElementsByClassName("bar")[minIndex];
      currentBar.style.backgroundColor = "#ff0000";

      setTimeout(function() {
        currentBar.style.backgroundColor = "#4caf50";
      }, 300);

      for (var j = i + 1; j < len; j++) {
        var nextBar = document.getElementsByClassName("bar")[j];
        nextBar.style.backgroundColor = "#ff0000";

        setTimeout(function() {
          nextBar.style.backgroundColor = "#4caf50";
        }, 300);

        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        swap(i, minIndex);

        var currentBar = document.getElementsByClassName("bar")[i];
        var nextBar = document.getElementsByClassName("bar")[minIndex];

        currentBar.style.height = array[i] + "px";
        nextBar.style.height = array[minIndex] + "px";
      }

      clearInterval(interval);
    }, 500 * i);
  }
}

function insertionSort() {
  var len = array.length;
  var i, key, j;

  for (i = 1; i < len; i++) {
    key = array[i];
    j = i - 1;

    var interval = setInterval(function() {
      var currentBar = document.getElementsByClassName("bar")[j];
      currentBar.style.backgroundColor = "#ff0000";

      setTimeout(function() {
        currentBar.style.backgroundColor = "#4caf50";
      }, 300);

      if (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        
        var currentBar = document.getElementsByClassName("bar")[j];
        var nextBar = document.getElementsByClassName("bar")[j + 1];

        currentBar.style.height = array[j] + "px";
        nextBar.style.height = array[j + 1] + "px";

        j--;
      } else {
        array[j + 1] = key;

        var currentBar = document.getElementsByClassName("bar")[j + 1];
        currentBar.style.height = key + "px";

        clearInterval(interval);
      }
    }, 500 * i);
  }
}

function mergeSort() {
  var len = array.length;
  var sortedArray = mergeSortRecursive(array);

  function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    var middle = Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);

    return merge(mergeSortRecursive(left), mergeSortRecursive(right));
  }

  function merge(left, right) {
    var result = [];
    var leftIndex = 0;
    var rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  var interval = setInterval(function() {
    if (sortedArray.length > 0) {
      var currentBar = document.getElementsByClassName("bar")[0];
      currentBar.style.backgroundColor = "#ff0000";

      setTimeout(function() {
        currentBar.style.backgroundColor = "#4caf50";
      }, 300);

      var minValue = sortedArray.shift();
      currentBar.style.height = minValue + "px";
    } else {
      clearInterval(interval);
    }
  }, 300);
}

function quickSort() {
  quickSortRecursive(array, 0, array.length - 1);

  function quickSortRecursive(arr, low, high) {
    if (low < high) {
      var partitionIndex = partition(arr, low, high);
      quickSortRecursive(arr, low, partitionIndex - 1);
      quickSortRecursive(arr, partitionIndex + 1, high);
    }
  }

  function partition(arr, low, high) {
    var pivot = arr[high];
    var i = low - 1;

    for (var j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(i, j);
        
        var currentBar = document.getElementsByClassName("bar")[i];
        var nextBar = document.getElementsByClassName("bar")[j];

        currentBar.style.height = array[i] + "px";
        nextBar.style.height = array[j] + "px";
      }
    }

    swap(i + 1, high);

    var currentBar = document.getElementsByClassName("bar")[i + 1];
    var nextBar = document.getElementsByClassName("bar")[high];

    currentBar.style.height = array[i + 1] + "px";
    nextBar.style.height = array[high] + "px";

    return i + 1;
  }
}

window.onload = function() {
  generateArray();
};
