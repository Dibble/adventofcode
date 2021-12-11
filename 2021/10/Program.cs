namespace AdventOfCode10
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n");

            var scores = new List<double>();

            var stacks = lines.ToList().Select(line =>
            {
                var stack = new List<char>();
                for (int i = 0; i < line.Length; i++)
                {
                    var c = line[i];
                    if (c == '(' || c == '[' || c == '{' || c =='<')
                    {
                        stack.Add(c);
                        continue;
                    }

                    if (IsMatchingPair(stack.Last(), c))
                    {
                        stack.RemoveAt(stack.Count - 1);
                        continue;
                    }

                    // corrupt line
                    // switch (c)
                    // {
                    //     case ')':
                    //         score += 3;
                    //         break;
                    //     case ']':
                    //         score += 57;
                    //         break;
                    //     case '}':
                    //         score += 1197;
                    //         break;
                    //     case '>':
                    //         score += 25137;
                    //         break;
                    // }

                    // Console.WriteLine($"{line} {c} {i}");

                    return new List<char>();
                }

                return stack;
            });

            var incompleteStacks = stacks.Where(s => s.Count > 0).ToList();
            incompleteStacks.ForEach(s =>
            {
                s.Reverse();
                var solution = s.Select(c =>
                {
                    switch (c)
                    {
                        case '(':
                            return ')';
                        case '[':
                            return ']';
                        case '{':
                            return '}';
                        case '<':
                            return '>';
                        default:
                            Console.WriteLine($"found {c} in stack :(");
                            return '-';
                    }
                });

                var stackScore = 0.0;
                solution.ToList().ForEach(c =>
                {
                    stackScore *= 5;
                    switch (c)
                    {
                        case ')':
                            stackScore += 1;
                            break;
                        case ']':
                            stackScore += 2;
                            break;
                        case '}':
                            stackScore += 3;
                            break;
                        case '>':
                            stackScore += 4;
                            break;
                    }
                });

                scores.Add(stackScore);
                Console.WriteLine($"{string.Join(string.Empty, solution)} {stackScore}");
            });

            scores.Sort();
            var scoreIndex = (int)Math.Floor(scores.Count / 2.0);

            Console.WriteLine(scores[scoreIndex]);
        }

        static bool IsMatchingPair (char a, char b)
        {
            return (a == '(' && b == ')') ||
                (a == '[' && b == ']') ||
                (a == '{' && b == '}') ||
                (a == '<' && b == '>');
        }
    }
}