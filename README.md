# homework 08. Set as Array

Implement `Set` class as Array. Override methods which are
adding items to array to not allow repeats.
 
 * `constructor` should allow to add it's arguments as initial elements of set
 * `concat` should not allow repeats and should return a set which should be
    the union of arguments and itself. (should work similar to Array's concat
    but return a Set).
 * `push` should not allow repeats and should return the length of final set
 * `unshift` should not allow repeats and should return the length of final set
 * `splice` should not allow repeats and should return the subset removed
 * `for-in` should iterate only over elements of set