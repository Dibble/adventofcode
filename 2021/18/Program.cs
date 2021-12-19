namespace AdventOfCode18
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("test2.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            // var snails = lines.Select(line => ParseInput(line)).ToList();
            // var sum = snails.Aggregate((acc, next) => acc == null ? next : acc.Add(next));
            // Console.WriteLine(sum.Magnitude);

            var sum = lines.Aggregate((acc, next) =>
            {
                if (acc == null)
                {
                    return next;
                }

                var added = Add(acc, next);
                return Reduce(added);
            });
            Console.WriteLine(sum);
        }

        static string Reduce (string input)
        {
            var output = input;
            var changed = true;

            while (changed)
            {
                var nested = ReduceNestedPairs(output);
                if (nested == output)
                {
                    var largeNumber = ReduceLargeNumber(nested);
                    changed = largeNumber != nested;
                    output = largeNumber;
                }
                else
                {
                    changed = true;
                    output = nested;
                }
            }

            return output;
        }

        static string ReduceNestedPairs (string input)
        {
            var idx = 0;
            var depth = 0;

            var output = input;

            while (idx < output.Length)
            {
                var nextChar = output[idx];

                switch (nextChar)
                {
                    case '[':
                        depth++;
                        if (depth > 4)
                        {
                            // explode this pair
                            ;
                            // find first number to left
                            var firstLeftIdx = output.ToCharArray().ToList().FindLastIndex(idx, c => c != '[' && c != ']' && c != ',');

                            // find and add left value
                            var commaIdx = output.ToCharArray().ToList().FindIndex(idx + 1, c => c == ',');
                            
                            if (firstLeftIdx > -1)
                            {
                                var leftVal = int.Parse(output[(idx+1)..commaIdx]);
                                var firstLeftValStart = output.ToCharArray().ToList().FindLastIndex(firstLeftIdx, c => c == '[' || c == ']' || c == ',');
                                var firstLeftVal = output[(firstLeftValStart+1)..(firstLeftIdx+1)];
                                var newLeft = int.Parse(firstLeftVal) + leftVal;
                                output = $"{output[0..firstLeftIdx]}{newLeft}{output[(firstLeftIdx+1)..]}";

                                var stringLengthDiff = $"{newLeft}".Length - firstLeftVal.Length;
                                commaIdx += stringLengthDiff;
                                idx += stringLengthDiff;
                            }

                            // find right value
                            var endPair = output.ToCharArray().ToList().FindIndex(commaIdx + 1, c => c == ']');
                            var rightVal = int.Parse(output[(commaIdx+1)..endPair]);

                            // find next right value and add
                            var firstRightIdx = output.ToCharArray().ToList().FindIndex(endPair + 1, c => c != '[' && c != ']' && c != ',');
                            if (firstRightIdx > -1)
                            {
                                var firstRightValEnd = output.ToCharArray().ToList().FindIndex(firstRightIdx + 1, c => c == '[' || c == ']' || c == ',');
                                var firstRightVal = output[firstRightIdx..firstRightValEnd];
                                
                                var firstRight = int.Parse(firstRightVal);
                                var newRight = rightVal + firstRight;

                                var remainingString = output[(firstRightIdx+firstRightVal.Length)..];
                                output = $"{output[0..firstRightIdx]}{newRight}{remainingString}";
                            }

                            // replace this pair with 0
                            output = $"{output[0..idx]}0{output[(endPair+1)..]}";

                            idx = 0;
                            depth = 0;
                            continue;
                        }
                        break;
                    case ']':
                        depth--;
                        break;
                }

                idx++;
            }

            return output;
        }

        static string ReduceLargeNumber (string input)
        {
            var idx = 0;

            var output = input;
            var numChars = string.Empty;

            while (idx < output.Length)
            {
                var nextChar = output[idx];

                switch (nextChar)
                {
                    case ']':
                        if (!string.IsNullOrWhiteSpace(numChars) && int.Parse(numChars) > 9)
                        {
                            // split
                            var num = int.Parse(numChars);
                            var newLeft = (int)Math.Floor(num / 2.0);
                            var newRight = (int)Math.Ceiling(num / 2.0);
                            var newPair = $"[{newLeft},{newRight}]";

                            var splitStart = idx - numChars.Length;
                            var splitEnd = idx;
                            output = $"{output[0..splitStart]}{newPair}{output[splitEnd..]}";
                            
                            idx = 0;
                            numChars = string.Empty;
                            return output;
                        }

                        numChars = string.Empty;
                        break;
                    case ',':
                        if (!string.IsNullOrWhiteSpace(numChars) && int.Parse(numChars) > 9)
                        {
                            // split
                            var num = int.Parse(numChars);
                            var newLeft = (int)Math.Floor(num / 2.0);
                            var newRight = (int)Math.Ceiling(num / 2.0);
                            var newPair = $"[{newLeft},{newRight}]";

                            var splitStart = idx - numChars.Length;
                            var splitEnd = idx;
                            output = $"{output[0..splitStart]}{newPair}{output[splitEnd..]}";
                            
                            idx = 0;
                            numChars = string.Empty;
                            return output;
                        }
                        numChars = string.Empty;
                        break;
                    case '[':
                        // do nothing
                        break;
                    default:
                        numChars += nextChar;
                        break;
                }

                idx++;
            }

            return output;
        }

        static string Add (string num1, string num2)
        {
            return $"[{num1},{num2}]";
        }

        // static SnailNumber ParseInput(string line)
        // {
        //     var idx = 0;
        //     SnailNumber currentSnail = null;

        //     while (idx < line.Length)
        //     {
        //         var nextChar = line[idx];

        //         switch (nextChar)
        //         {
        //             case '[':
        //                 var newSnail = new SnailNumber(currentSnail, null, null, null, null);
                        
        //                 if (currentSnail != null)
        //                 {
        //                     currentSnail._leftSnail = newSnail;
        //                 }
        //                 currentSnail = newSnail;
        //                 break;
        //             case ']':
        //                 if (currentSnail._parent == null)
        //                 {
        //                     break;
        //                 }

        //                 // set current as left or right (if left already set) on parent
        //                 if (currentSnail._parent._leftSnail == currentSnail)
        //                 {
        //                     currentSnail._parent._rightSnail = currentSnail;
        //                 }
        //                 else
        //                 {
        //                     currentSnail._parent._leftSnail = currentSnail;
        //                 }
        //                 // set current to parent
        //                 currentSnail = currentSnail._parent;
        //                 break;
        //             case ',':
        //                 // do nothing
        //                 break;
        //             default:
        //                 // parse number
        //                 var num = int.Parse(nextChar.ToString());
        //                 // set on current as left or right (if left already set)
        //                 if (currentSnail._left == null)
        //                 {
        //                     currentSnail._left = num;
        //                 }
        //                 else
        //                 {
        //                     currentSnail._right = num;
        //                 }
        //                 break;
        //         }

        //         idx++;
        //     }

        //     while (currentSnail._parent != null)
        //     {
        //         currentSnail = currentSnail._parent;
        //     }

        //     return currentSnail;
        // }
    }

    // class SnailNumber
    // {
    //     public SnailNumber? _parent;
    //     public SnailNumber? _leftSnail;
    //     public SnailNumber? _rightSnail;
    //     public int? _left;
    //     public int? _right;

    //     public int Magnitude
    //     { 
    //         get
    //         {
    //             var leftMag = _leftSnail == null ? _left * 3 : _leftSnail.Magnitude * 3;
    //             var rightMag = _rightSnail == null ? _right * 2 : _rightSnail.Magnitude * 2;
    //             return leftMag.Value + rightMag.Value;
    //         }
    //     }

    //     public SnailNumber(SnailNumber? parent, SnailNumber? leftSnail, SnailNumber? rightSnail, int? left, int? right)
    //     {
    //         _parent = parent;
    //         _leftSnail = leftSnail;
    //         _rightSnail = rightSnail;
    //         _left = left;
    //         _right = right;
    //     }

    //     public SnailNumber Add(SnailNumber other)
    //     {
    //         var newSnail = new SnailNumber(null, this, other, null, null);

    //         var current = newSnail;
    //         var reduced = true;
    //         while (reduced || current != newSnail)
    //         {
    //             reduced = false;

    //             if (current._parent?._parent?._parent?._parent != null)
    //             {
    //                 reduced = true;
    //                 // explode current pair
    //                 var leftExplode = current._parent;
    //                 while (leftExplode._left == null && leftExplode._parent != null)
    //                 {
    //                     leftExplode = leftExplode._parent;
    //                 }
    //                 if (leftExplode._left != null)
    //                 {
    //                     leftExplode._left += current._left;
    //                 }

    //                 var rightExplode = current._parent;
    //                 while (rightExplode._right == null && rightExplode._parent != null)
    //                 {
    //                     rightExplode = rightExplode._parent;
    //                 }
    //                 if (rightExplode._right != null)
    //                 {
    //                     rightExplode._right += current._right;
    //                 }

    //                 if (current._parent._leftSnail == current)
    //                 {
    //                     current._parent._left = 0;
    //                     current._parent._leftSnail = null;
    //                 }
    //                 else
    //                 {
    //                     current._parent._right = 0;
    //                     current._parent._rightSnail = null;
    //                 }

    //                 current = newSnail;
    //             }
    //             else if (current._left > 9)
    //             {
    //                 reduced = true;
    //                 // split left
    //                 var newLeft = Math.Floor(current._left.Value / 2.0);
    //                 var newRight = Math.Ceiling(current._left.Value / 2.0);
    //                 var splitSnail = new SnailNumber(current, null, null, (int)newLeft, (int)newRight);
    //                 current._leftSnail = splitSnail;
    //                 current._left = null;

    //                 current = newSnail;
    //             }
    //             else if (current._right > 9)
    //             {
    //                 reduced = true;
    //                 // split right
    //                 var newLeft = Math.Floor(current._right.Value / 2.0);
    //                 var newRight = Math.Ceiling(current._right.Value / 2.0);
    //                 var splitSnail = new SnailNumber(current, null, null, (int)newLeft, (int)newRight);
    //                 current._rightSnail = splitSnail;
    //                 current._right = null;

    //                 current = newSnail;
    //             }

    //             // select next snail
    //             if (current._leftSnail != null)
    //             {
    //                 current = current._leftSnail;
    //             }
    //             else if (current._rightSnail != null)
    //             {
    //                 current = current._rightSnail;
    //             }
    //             else
    //             {
    //                 // go up
    //                 var nextCurrent = current;
    //                 while (nextCurrent._rightSnail == null && nextCurrent._parent != null)
    //                 {
    //                     nextCurrent = nextCurrent._parent;
    //                 }

    //                 if (nextCurrent._rightSnail != null)
    //                 {
    //                     current = nextCurrent._rightSnail;
    //                 }
    //                 else
    //                 {
    //                     current = newSnail;
    //                 }
    //             }
    //         }

    //         return newSnail;
    //     }
    // }
}