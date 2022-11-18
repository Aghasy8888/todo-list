export default function idGenerator() {
  return (
    Math.random(32).toString().slice(2) +
    "-" +
    Math.random(32).toString().slice(2)
  );
}
