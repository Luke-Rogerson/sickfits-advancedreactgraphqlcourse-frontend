import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional pounds', () => {
    expect(formatMoney(1)).toEqual('£0.01');
    expect(formatMoney(109)).toEqual('£1.09');
    expect(formatMoney(40)).toEqual('£0.40');
  });
  it('leaves pennies off for whole pounds', () => {
    expect(formatMoney(100)).toEqual('£1');
    expect(formatMoney(1000)).toEqual('£10');
    expect(formatMoney(50000000)).toEqual('£500,000');
  });

  it('works with whole and fractional pounds', () => {
    expect(formatMoney(8088)).toEqual('£80.88');
    expect(formatMoney(101)).toEqual('£1.01');
    expect(formatMoney(5873462340923734209724307)).toEqual(
      '£58,734,623,409,237,340,000,000.00'
    );
  });
});
