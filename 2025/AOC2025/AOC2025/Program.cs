var methods = new Dictionary<string, Action<IEnumerable<string>>>
{
    { "1", Day1 }
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
        while (steps > 100)
        {
            steps -= 100;
            zeroes++;
        }

        position += direction == "R" ? steps : -steps;
        if (position < 0)
        {
            position += 100;
            zeroes++;
        }
        else if (position > 99)
        {
            position -= 100;
            zeroes++;
        }
        else if (position == 0)
        {
            zeroes++;
        }

        Console.WriteLine($"{position} {zeroes}");
    }
}