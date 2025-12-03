var methods = new Dictionary<string, Action<IEnumerable<string>>>
{
    { "1", Day1 },
    { "2", Day2 },
    { "3", Day3 },
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