namespace AdventOfCode1
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var windows = new List<int>();
            var index = 0;

            while (sr.Peek() >= 0)
            {
                var line = sr.ReadLine();
                if (line == null)
                {
                    break;
                }

                var depth = int.Parse(line);
                windows.Add(depth);

                if (index - 1 >= 0)
                {
                    windows[index - 1] += depth;
                }
                if (index - 2 >= 0)
                {
                    windows[index - 2] += depth;
                }

                index++;
            }

            windows.RemoveRange(windows.Count - 2, 2);

            // windows.ForEach(window => Console.WriteLine(window));

            var increments = 0;
            var previousWindow = -1;

            windows.ForEach((window) =>
            {
                if (previousWindow > -1 && window > previousWindow)
                {
                    increments++;
                }

                previousWindow = window;
            });

            Console.WriteLine(increments);
        }
    }
}