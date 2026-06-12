#!/usr/bin/env node

// Calculator CLI
// Supported operations:
//  - addition (add)
//  - subtraction (sub)
//  - multiplication (mul)
//  - division (div)
//
// Usage examples:
//   node src/calculator.js add 2 3    # outputs 5
//   node src/calculator.js sub 5 2    # outputs 3
//   node src/calculator.js mul 4 3    # outputs 12
//   node src/calculator.js div 10 2   # outputs 5
//
// The CLI validates numeric input and exits with a non-zero code on errors.

function printHelp() {
  console.log(`Calculator CLI

Usage:
  calculator.js <operation> <num1> <num2>

Operations:
  add   Add num1 and num2
  sub   Subtract num2 from num1
  mul   Multiply num1 by num2
  div   Divide num1 by num2

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js div 10 2
`);
}

function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : NaN;
}

// Pure functions exported for testing and reuse
function add(a, b) {
  return Number(a) + Number(b);
}

function sub(a, b) {
  return Number(a) - Number(b);
}

function mul(a, b) {
  return Number(a) * Number(b);
}

function div(a, b) {
  const nb = Number(b);
  if (nb === 0) {
    const err = new Error('division by zero');
    err.code = 'DIV_BY_ZERO';
    throw err;
  }
  return Number(a) / nb;
}

function main(argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const [op, aRaw, bRaw] = argv;

  if (!op || !aRaw || !bRaw) {
    console.error('Error: operation and two numeric arguments are required.');
    printHelp();
    process.exit(1);
  }

  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both arguments must be valid numbers.');
    process.exit(1);
  }

  try {
    switch (op) {
      case 'add':
        console.log(add(a, b));
        break;
      case 'sub':
        console.log(sub(a, b));
        break;
      case 'mul':
        console.log(mul(a, b));
        break;
      case 'div':
        try {
          console.log(div(a, b));
        } catch (e) {
          if (e && e.code === 'DIV_BY_ZERO') {
            console.error('Error: division by zero is not allowed.');
            process.exit(2);
          }
          throw e;
        }
        break;
      default:
        console.error(`Error: unsupported operation "${op}".`);
        printHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  // process.argv[0] = node, [1] = script, so slice from 2
  main(process.argv.slice(2));
}

module.exports = { main, add, sub, mul, div };
