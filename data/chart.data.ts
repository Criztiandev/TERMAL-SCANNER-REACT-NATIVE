export const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for lines
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 2, // optional, defaults to 2dp
  style: {
    borderRadius: 16,
    backgroundColor: "#000", // Black background color
  },
};
