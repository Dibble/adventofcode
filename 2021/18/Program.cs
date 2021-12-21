namespace AdventOfCode18
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var largestSum = 0;
            for (int i = 0; i < lines.Count; i++)
            {
                for (int j = 0; j < lines.Count; j++)
                {
                    if (i == j)
                    {
                        continue;
                    }
                    var sum = GetMagnitude(Reduce(Add(lines[i], lines[j])));
                    largestSum = Math.Max(sum, largestSum);
                }
            }

            Console.WriteLine(largestSum);

            // var sum = lines.Aggregate((acc, next) =>
            // {
            //     if (acc == null)
            //     {
            //         return next;
            //     }

            //     var added = Add(acc, next);
            //     return Reduce(added);
            // });
            // Console.WriteLine(sum);
            // Console.WriteLine(GetMagnitude(sum));
        }

        static int GetMagnitude (string input)
        {
            var output = input;
            while (output.Contains('['))
            {
                var charList = output.ToCharArray().ToList();
                var startPair = charList.FindLastIndex(c => c == '[');
                var endPair = charList.FindIndex(startPair + 1, c => c == ']');
                var pair = output[(startPair+1)..endPair];
                var s = pair.Split(',');
                var left = int.Parse(s[0]);
                var right = int.Parse(s[1]);
                var magnitude = left * 3 + right * 2;

                var beginning = startPair > 0 ? output[0..startPair] : string.Empty;
                var ending = endPair < output.Length - 1 ? output[(endPair+1)..] : string.Empty;
                output = $"{beginning}{magnitude}{ending}";
            }

            return int.Parse(output);
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
                                output = $"{output[0..(firstLeftValStart+1)]}{newLeft}{output[(firstLeftIdx+1)..]}";

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
    }
}