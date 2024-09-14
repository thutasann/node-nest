import { BestTimeToBuyAndSellStockWithCoolDown } from './src/best-time-to-buy-sell-stock';
import { ContiguousArray } from './src/contiguous-array';
import { NumberOfIslands } from './src/number-of-islands';
import { Numbers } from './src/numbers';
import { ReverseLinkedList } from './src/reverse-linked-list';
import { RotateImage } from './src/rotate-image';
import { SubArraySumEqualsK } from './src/subarray-sums-equals-k';
import { ThreeSum } from './src/three-sum';
import { TwoSumInputArrayIsSorted } from './src/two-sum-input-array-is-sorted';
import { ValidParentheses } from './src/valid-parentheses';

// ----- Numbers Related Concepts
Numbers.swapNumber(2, 4);
Numbers.swapNumberWithIndex(['a', 'b', 'c', 'd', 'e'], 1, 3);
Numbers.getSecondLargest([5, 1, 8, 3, 10, 7, 8]);
Numbers.reverseNumber(12345);
Numbers.sumOfNumber();

// ----- Leetcodes Usages
NumberOfIslands.usageOne();
ValidParentheses.usageOne();
ReverseLinkedList.usageOne();
RotateImage.usageOne();

console.log('----------------------------\n');

BestTimeToBuyAndSellStockWithCoolDown.usageOne();
BestTimeToBuyAndSellStockWithCoolDown.usageTwo();

console.log('----------------------------\n');

ContiguousArray.findMaxLengthUsage();
ContiguousArray.findMaxBalanceMoodUsage();
ContiguousArray.ecommerceEngagementUsage();

console.log('----------------------------\n');

SubArraySumEqualsK.subArraySumUsage();
SubArraySumEqualsK.trackCustomerTransactionsUsage();

console.log('----------------------------\n');

TwoSumInputArrayIsSorted.solutionOneUsage();

console.log('----------------------------\n');

ThreeSum.solutionOneUsage();
ThreeSum.tripletArraySample();
