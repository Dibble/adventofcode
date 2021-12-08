namespace AdventOfCode8
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var sum = 0;

            lines.ForEach(l =>
            {
                var s = l.Split('|');
                var combinations = s[0].Split(' ').ToList();
                var outputs = s[1].Split(' ').Where(x => !string.IsNullOrWhiteSpace(x)).ToList();

                // identify possible values for known uniques
                // 1 has 2 inputs (c & f)
                var one = combinations.First(c => c.Length == 2);
                // 4 has 4 inputs (b, c, d, f)
                var four = combinations.First(c => c.Length == 4);
                // 7 has 3 inputs (a, c, f)
                var seven = combinations.First(c => c.Length == 3);
                // 8 has all inputs
                var eight = combinations.First(c => c.Length == 7);

                // b & d = four - 1
                var bAndD = four.Where(c => !one.Contains(c));

                // a = seven - 1
                var a = seven.Where(c => !one.Contains(c)).First();

                // e & g = remaining values in eight
                var eAndG = eight.Where(c => !bAndD.Contains(c) && c != a && !one.Contains(c));

                // length 6 = 0, 6, 9 (variables c, d, e) (constant a, b, f, g)
                var sixes = combinations.Where(c => c.Length == 6);
                // length 5 = 2, 3, 5 (variables b, c, e, f) (constant a, d, g)
                var fives = combinations.Where(c => c.Length == 5);

                // constants in 5s and 6s = a & g, a is known, so g can be identified
                var fivesAndSixes = combinations.Where(c => c.Length == 5 || c.Length == 6);
                var g = eAndG.Where(c => fivesAndSixes.All(x => x.Contains(c))).First();
                var e = eAndG.Where(c => c != g).First();

                // f is constant in 6s
                var f = one.Where(c => sixes.All(s => s.Contains(c))).First();
                var c = one.Where(x => x != f).First();

                // d is constant in 5s
                var d = bAndD.Where(c => fives.All(s => s.Contains(c))).First();
                var b = bAndD.Where(x => x != d).First();

                var digits = string.Empty;
                outputs.ForEach(output =>
                {
                    switch (output.Length)
                    {
                        case 2:
                            digits += "1";
                            break;
                        case 4:
                            digits += "4";
                            break;
                        case 3:
                            digits += "7";
                            break;
                        case 7:
                            digits += "8";
                            break;
                        case 5:
                            // 2, 3 or 5
                            if (new [] { a, c, d, e, g }.All(x => output.Contains(x)))
                            {
                                digits += "2";
                                break;
                            }
                            if (new [] { a, c, d, f, g }.All(x => output.Contains(x)))
                            {
                                digits += "3";
                                break;
                            }
                            if (new [] { a, b, d, f, g }.All(x => output.Contains(x)))
                            {
                                digits += "5";
                                break;
                            }
                            else
                            {
                                Console.WriteLine($"failed to identify output {output}");
                                break;
                            }
                        default: // length 6
                            // 0, 6, or 9
                            if (new [] { a, b, c, e, f, g }.All(x => output.Contains(x)))
                            {
                                digits += "0";
                                break;
                            }
                            if (new [] { a, b, d, e, f, g }.All(x => output.Contains(x)))
                            {
                                digits += "6";
                                break;
                            }
                            if (new [] { a, b, c, d, f, g }.All(x => output.Contains(x)))
                            {
                                digits += "9";
                                break;
                            }
                            else
                            {
                                Console.WriteLine($"failed to identify output {output}");
                                break;
                            }
                    }
                });

                Console.WriteLine(digits);
                sum += int.Parse(digits);
            });

            Console.WriteLine(sum);
        }
    }
}