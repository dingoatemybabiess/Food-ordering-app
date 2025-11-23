const assert = require('node:assert');
const test = require('node:test');

// Mock Cart Logic for testing
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

test('Cart Calculation Logic', async (t) => {
  await t.test('calculates total correctly for multiple items', () => {
    const items = [
      { id: '1', price: 10, quantity: 2 },
      { id: '2', price: 5, quantity: 1 },
    ];
    const total = calculateTotal(items);
    assert.strictEqual(total, 25);
  });

  await t.test('calculates total correctly for empty cart', () => {
    const items = [];
    const total = calculateTotal(items);
    assert.strictEqual(total, 0);
  });
});
