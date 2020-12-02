export default function (array) {
  if (!array) return;
  return () => {
    const randomArrayIndex = Math.floor(Math.random() * array.length);
    return array[randomArrayIndex]?.value;
  };
}