var methods = new Dictionary<string, Action<IEnumerable<string>>>
{
    { "1", Day1 },
    { "2", Day2 },
    { "3", Day3 },
    { "4", Day4 },
    { "5", Day5 },
    { "6", Day6 },
    { "7", Day7 },
};

while (true)
{
    Console.WriteLine("Choose input");
    var input = Console.ReadLine();

    var lines = File.ReadLines($"Input/{input}.txt");

    methods[input!.TrimEnd('t', 'z')](lines);

    Console.WriteLine("Finished");
    Console.ReadLine();
}

void Day7(IEnumerable<string> lines)
{
    var (grid, positions) = ParseGrid(lines, "S", "^");
    Console.WriteLine($"Total splitters: {positions[1].Count}");

    /* part 1 */
    //var activated = new HashSet<(int, int)>();
    //var active = new HashSet<int>
    //{
    //    positions[0].First().Item1
    //};

    //var y = 0;
    //while (y < grid.GetLength(1))
    //{
    //    var nextActive = new HashSet<int>();
    //    y++;

    //    foreach (var act in active)
    //    {
    //        Console.WriteLine($"{act}, {y}");
    //        if (act == 0 || act == grid.GetLength(0))
    //        {
    //            continue;
    //        }

    //        var next = (act, y);
    //        if (positions[1].Contains(next) && !activated.Contains(next))
    //        {
    //            activated.Add(next);
    //            if (act > 0) nextActive.Add(act - 1);
    //            if (act < grid.GetLength(0) - 1) nextActive.Add(act + 1);
    //            continue;
    //        }

    //        nextActive.Add(act);
    //    }

    //    active = nextActive;
    //}

    //Console.WriteLine(activated.Count);

    /* part 2 */
    var activated = new Dictionary<(int, int), int>();
    var active = new HashSet<int>
    {
        positions[0].First().Item1
    };

    var y = 0;
    while (y < grid.GetLength(1))
    {
        var nextActive = new HashSet<int>();
        y++;

        foreach (var act in active)
        {
            Console.WriteLine($"{act}, {y}");
            if (act == 0 || act == grid.GetLength(0))
            {
                continue;
            }

            var next = (act, y);
            if (positions[1].Contains(next))
            {
                if (activated.ContainsKey(next))
                {
                    activated[next]++;
                }
                else
                {
                    activated[next] = 1;
                    if (act > 0) nextActive.Add(act - 1);
                    if (act < grid.GetLength(0) - 1) nextActive.Add(act + 1);
                    continue;
                }
            }

            nextActive.Add(act);
        }

        active = nextActive;
    }

    Console.WriteLine(activated.Values.Sum());
    var timelines = activated.Values.Aggregate(1, (next, acc) => )
}

void Day6(IEnumerable<string> lines)
{
    var total = 0L;

    /* part 1 */
    //var problems = new List<List<long>>();
    //foreach (var line in lines)
    //{
    //    var x = line.Replace("  ", " ");
    //    while (x.Contains("  "))
    //    {
    //        x = x.Replace("  ", " ");
    //    }

    //    x = x.Trim();

    //    var split = x.Split(' ');

    //    for (var i = 0; i < split.Length; i++)
    //    {
    //        if (problems.Count <= i)
    //        {
    //            problems.Add([]);
    //        }

    //        switch (split[i])
    //        {
    //            case "*":
    //                var solution = problems[i].Aggregate(1L, (acc, x) => acc * x);
    //                Console.WriteLine(solution);
    //                total += solution;
    //                break;
    //            case "+":
    //                solution = problems[i].Sum();
    //                Console.WriteLine(solution);
    //                total += solution;
    //                break;
    //            default:
    //                problems[i].Add(int.Parse(split[i]));
    //                break;
    //        }
    //    }
    //}

    /* part 2*/
    var columns = new List<int>();
    for (var i = 1; i < lines.Last().Length; i++)
    {
        if (lines.Last()[i] != ' ')
        {
            columns.Add(i - 1);
        }
    }

    var problems = new List<List<string>>();
    foreach (var line in lines)
    {
        var problem = 0;
        var num = 0;
        for (var i = line.Length - 1; i >= 0; i--)
        {
            if (columns.Contains(i))
            {
                problem++;
                num = 0;
                continue;
            }

            if (problems.Count <= problem)
            {
                problems.Add([]);
            }

            if (problems[problem].Count <= num)
            {
                problems[problem].Add(string.Empty);
            }

            switch (line[i])
            {
                case '*':
                    var solution = problems[problem].Aggregate(1L, (acc, x) => acc * long.Parse(x.TrimEnd('0')));
                    Console.WriteLine(solution);
                    total += solution;
                    break;
                case '+':
                    solution = problems[problem].Sum(x => long.Parse(x.TrimEnd('0')));
                    Console.WriteLine(solution);
                    total += solution;
                    break;
                case ' ':
                    problems[problem][num] += "0";
                    break;
                default:
                    problems[problem][num] += line[i].ToString();
                    break;
            }

            num++;
        }
    }

    Console.WriteLine(total);
}

void Day5(IEnumerable<string> lines)
{
    /* part 1 */
    //var ranges = new List<(long, long)>();
    //var fresh = 0;

    //var x = false;
    //foreach (var line in lines)
    //{
    //    if (string.IsNullOrWhiteSpace(line))
    //    {
    //        x = true;
    //        continue;
    //    }

    //    if (x)
    //    {
    //        var num = long.Parse(line);
    //        foreach (var range in ranges)
    //        {
    //            if (num >= range.Item1 && num <= range.Item2)
    //            {
    //                fresh++;
    //                break;
    //            }
    //        }
    //    }
    //    else
    //    {
    //        var split = line.Split('-');
    //        var start = long.Parse(split[0]);
    //        var end = long.Parse(split[1]);
    //        ranges.Add((start, end));
    //    }
    //}

    //Console.WriteLine(fresh);

    /* part 2 */
    var ranges = new List<(long, long)>();
    foreach (var line in lines)
    {
        if (string.IsNullOrWhiteSpace(line)) break;

        var split = line.Split('-');
        var start = long.Parse(split[0]);
        var end = long.Parse(split[1]);
        ranges.Add((start, end));
    }

    ranges = ranges.OrderBy(r => r.Item1).ToList();
    var merged = new List<(long, long)>();
    foreach (var range in ranges)
    {
        if (merged.Count == 0)
        {
            merged.Add(range);
        }
        else
        {
            var last = merged.Last();
            if (range.Item1 <= last.Item2 + 1)
            {
                merged[^1] = (last.Item1, Math.Max(last.Item2, range.Item2));
            }
            else
            {
                merged.Add(range);
            }
        }
    }

    var total = 0L;
    foreach (var merge in merged)
    {
        total += merge.Item2 - merge.Item1 + 1;
    }
    Console.WriteLine(total);
}

void Day4(IEnumerable<string> lines)
{
    /* part 1 */
    //var accessible = 0;

    //var grid = lines.Select(l => l.Select(c => c == '@').ToArray()).ToArray();
    //for (var x = 0; x < grid[0].Length; x++)
    //{
    //    for (var y = 0; y < grid.Length; y++)
    //    {
    //        var surrounding = 0;
    //        // get all surrounding positions
    //        for (var i = x - 1; i <= x + 1; i++)
    //        {
    //            for (var j = y - 1; j <= y + 1; j++)
    //            {
    //                if (i == x && j == y) continue;
    //                if (i < 0 || i >= grid[0].Length || j < 0 || j >= grid.Length) continue;
    //                if (grid[j][i]) surrounding++;
    //            }
    //        }
    //        // count how many are true
    //        // increment accessible if less than 4
    //        if (grid[y][x] && surrounding < 4) accessible++;
    //        Console.WriteLine($"{x},{y}: {grid[y][x]} {surrounding}");
    //    }
    //}

    //Console.WriteLine(accessible);

    var total = 0;
    var grid = lines.Select(l => l.Select(c => c == '@').ToArray()).ToArray();
    while (true)
    {
        var accessible = new List<(int, int)>();
        for (var x = 0; x < grid[0].Length; x++)
        {
            for (var y = 0; y < grid.Length; y++)
            {
                var surrounding = 0;
                // get all surrounding positions
                for (var i = x - 1; i <= x + 1; i++)
                {
                    for (var j = y - 1; j <= y + 1; j++)
                    {
                        if (i == x && j == y) continue;
                        if (i < 0 || i >= grid[0].Length || j < 0 || j >= grid.Length) continue;
                        if (grid[i][j]) surrounding++;
                    }
                }

                // count how many are true
                // increment accessible if less than 4
                if (grid[x][y] && surrounding < 4) accessible.Add((x, y));
            }
        }

        if (accessible.Count == 0) break;
        total += accessible.Count;
        accessible.ForEach((tuple => grid[tuple.Item1][tuple.Item2] = false));
    }

    Console.WriteLine(total);
}

void Day3(IEnumerable<string> lines)
{
    var joltage = 0L;

    foreach (var line in lines)
    {
        /* part 1 */
        //var max = 0;
        //var maxIdx = -1;
        //for (var i = 0; i < line.Length - 1; i++)
        //{
        //    var num = int.Parse(line[i].ToString());
        //    if (num > max)
        //    {
        //        max = num;
        //        maxIdx = i;
        //    }
        //}

        //var bmax = 0;
        //for (var i = maxIdx + 1; i < line.Length; i++)
        //{
        //    var num = int.Parse(line[i].ToString());
        //    if (num > bmax)
        //    {
        //        bmax = num;
        //    }
        //}

        //joltage += int.Parse($"{max}{bmax}");

        /* part 2 */
        var digits = new List<char>();
        var idx = -1;
        for (var i = 11; i >= 0; i--)
        {
            var max = 0;
            for (var j = idx + 1; j < line.Length - i; j++)
            {
                var num = int.Parse(line[j].ToString());
                if (num > max)
                {
                    max = num;
                    idx = j;
                }
            }
            digits.Add(char.Parse(max.ToString()));
        }
        Console.WriteLine(new string(digits.ToArray()));
        joltage += long.Parse(new string(digits.ToArray()));
    }

    Console.WriteLine(joltage);
}

void Day2(IEnumerable<string> lines)
{
    var ranges = lines.First().Split(',');
    var invalidIds = new List<long>();

    foreach (var range in ranges)
    {
        var split = range.Split('-');
        var start = long.Parse(split[0]);
        var end = long.Parse(split[1]);

        /* part 1 */
        //for (var i = start; i <= end; i++)
        //{
        //    var str = i.ToString();
        //    var left = str[..(str.Length/2)];
        //    var right = str[(str.Length/2)..];

        //    //Console.WriteLine($"{left} {right}");
        //    if (left == right)
        //    {
        //        invalidIds.Add(i);
        //    }
        //}

        /* part 2 */
        for (var i = start; i <= end; i++)
        {
            var str = i.ToString();
            for (var j = 1; j <= str.Length / 2; j++)
            {
                var invalid = false;
                var lastChunk = string.Empty;
                for (var k = 0; k < str.Length; k += j)
                {
                    var next = str.Substring(k, Math.Min(j, str.Length - k));
                    if (lastChunk != string.Empty && next != lastChunk)
                    {
                        break;
                    }

                    lastChunk = next;

                    if (k == str.Length - j)
                    {
                        invalid = true;
                        break;
                    }
                }

                if (invalid)
                {
                    //Console.WriteLine($"invalid {i}");
                    invalidIds.Add(i);
                    break;
                }
            }
        }
    }

    Console.WriteLine($"{invalidIds.Sum()}");
}

void Day1(IEnumerable<string> lines)
{
    var position = 50;
    var zeroes = 0;

    foreach (var line in lines)
    {
        var direction = line[..1];
        var steps = int.Parse(line[1..]);
        Console.Write($"{direction} {steps}: ");

        /* part 1 */
        //position += direction == "R" ? steps : -steps;

        //if (position < 0) position += 100;
        //else if (position > 99) position -= 100;

        //if (position == 0) zeroes++;

        /* part 2 */
        // 6469 too high
        while (steps > 0)
        {
            position += direction == "R" ? 1 : -1;
            
            if (position == -1) position = 99;
            else if (position == 100) position = 0;

            if (position == 0) zeroes++;

            steps--;
        }

        Console.WriteLine($"{position} {zeroes}");
    }
}

(char[,], List<List<(int,int)>>) ParseGrid(IEnumerable<string> lines, params string[] keys)
{
    var grid = new char[lines.First().Length,lines.Count()];
    var positions = new List<List<(int, int)>>();
    foreach (var key in keys)
    {
        positions.Add(new List<(int, int)>());
    }

    foreach (var (line, y) in lines.Select((value, index) => (value, index)))
    {
        foreach (var (c, x) in line.Select((value, index) => (value, index)))
        {
            grid[x, y] = c;
            var idx = keys.IndexOf<string>(c.ToString());
            if (idx != -1)
            {
                positions[idx].Add((x, y));
            }
        }
    }

    return (grid, positions);
}