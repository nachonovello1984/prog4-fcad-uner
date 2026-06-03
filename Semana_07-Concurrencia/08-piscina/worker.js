export default function ({ n }) {
  n = Number(n);

  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('n must be a non-negative integer');
  }

  return fib(n);
}

function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}
