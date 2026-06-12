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

  switch (op) {
    case 'add':
      console.log(a + b);
      break;
    case 'sub':
      console.log(a - b);
      break;
    case 'mul':
      console.log(a * b);
      break;
    case 'div':
      if (b === 0) {
        console.error('Error: division by zero is not allowed.');
        process.exit(2);
      }
      console.log(a / b);
      break;
    default:
      console.error(`Error: unsupported operation "${op}".`);
      printHelp();
      process.exit(1);
  }
}

if (require.main === module) {
  // process.argv[0] = node, [1] = script, so slice from 2
  main(process.argv.slice(2));
}

module.exports = { main };
