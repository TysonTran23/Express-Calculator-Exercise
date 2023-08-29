const express = require("express");
const app = express();
app.use(express.json());

// Function for Mean
function getMean(nums) {
  //Get sum of array by continuing to add each value of the array to accumulator and then dividing it by the number of values in the array
  let sum = nums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return sum / nums.length;
}

// Function for Median
function getMedian(nums) {
  //Sort array from least to greatest
  nums.sort((a, b) => a - b);
  //Find the middle Index of the array
  const middleIdx = Math.floor(nums.length / 2);
  //If the array is even, we grab the two values in the middle of the array, add them together and divide by 2
  if (nums.length % 2 === 0) {
    return (nums[middleIdx - 1] + nums[middleIdx]) / 2;
  }
  //If the array is odd, then the middle idx is actually the median
  else {
    return nums[middleIdx];
  }
}

function getMode(nums) {
  //Frequency keeps track of how many times we see the number in the array
  let frequency = {};
  //Keeps track of the number of times we see the number
  let max = 0;
  //A list of all the numbers that are "MAX"
  let mode = [];

  //For each number, if the number is in the frequency object, +1
  nums.forEach((num) => {
    if (frequency[num]) {
      frequency[num]++;
    }
    // If the number in the array is not in our frequency object, we set it to 1 being the first time we saw it
    else {
      frequency[num] = 1;
    }
    //If the number count is greater then the max, set max and mode to that number
    if (frequency[num] > max) {
      max = frequency[num];
      mode = [num];
    }
    //If they are equal, add it to the mode list
    else if (frequency[num] === max) {
      mode.push(num);
    }
  });
  //return list
  return mode;
}

app.get("/mean", (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: "Nums are Required" });
  }

  const nums = req.query.nums.split(",").map((num, index) => parseFloat(num));
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: "All values must be numbers" });
  }

  res.json({ operation: "mean", value: getMean(nums) });
});
app.get("/median", (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: "Nums are Required" });
  }

  const nums = req.query.nums.split(",").map((num, index) => parseFloat(num));
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: "All values must be numbers" });
  }

  res.json({ operation: "median", value: getMedian(nums) });
});
app.get("/mode", (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: "Nums are required" });
  }
  const nums = req.query.nums.split(",").map((num, index) => parseFloat(num));
  if (nums.some(isNaN)) {
    return res.status(400).json({ error: "All values must be numbers" });
  }

  res.json({ operation: "mode", value: getMode(nums) });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});

module.exports = {
  getMean,
  getMedian,
  getMode,
};
