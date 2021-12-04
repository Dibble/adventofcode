namespace AdventOfCode4
{
    class Board
    {
        private readonly int[][] numbers;

        public Board(string[] lines)
        {
            numbers = new int[5][];

            for (int i = 0; i < lines.Length; i++)
            {
                var lineNumbers = lines[i].Split(" ").Where(s => !string.IsNullOrWhiteSpace(s));
                numbers[i] = lineNumbers.Select(n => int.Parse(n)).ToArray();
            }
        }

        public void CallNumber (int number)
        {
            for (int i = 0; i < numbers.Length; i++)
            {
                for (int j = 0; j < numbers[i].Length; j++)
                {
                    if (numbers[i][j] == number)
                    {
                        numbers[i][j] = -1;
                        break;
                    }
                }
            }
        }

        public bool HasBingo ()
        {
            for (int i = 0; i < 5; i++)
            {
                if (numbers[i].All(n => n == -1))
                {
                    return true;
                }

                var column = numbers.Select(r => r[i]);
                if (column.All(n => n == -1))
                {
                    return true;
                }
            }

            return false;
        }

        public int GetUnmarkedSum ()
        {
            return numbers.Aggregate(0, (acc, next) =>
            {
                return acc + next.Aggregate(0, (cAcc, cNext) =>
                {
                    if (cNext > -1)
                    {
                        return cAcc + cNext;
                    }
                    return cAcc;
                });
            });
        }

        public override string ToString ()
        {
            return string.Join('\n', numbers.Select(r => string.Join(' ', r.Select(x => x.ToString()))));
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("input.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n");

            var numbersLine = lines[0];

            var boards = new List<Board>();

            var boardLines = lines[2..].Where(l => !string.IsNullOrWhiteSpace(l)).ToArray();

            for (int i = 0; i < boardLines.Length; i+=5)
            {
                var j = i + 5;
                var board = new Board(boardLines[i..j]);

                boards.Add(board);
            }

            var numbers = numbersLine.Split(',');
            var lastNumberIdx = -1;
            Board lastBoard = null;

            while (boards.Count > 0)
            {
                lastNumberIdx++;
                if (lastNumberIdx >= numbers.Length)
                {
                    Console.WriteLine("No bingos");
                    break;
                }

                var numberCalled = int.Parse(numbers[lastNumberIdx]);

                boards.ForEach(b => b.CallNumber(numberCalled));

                var winners = boards.Where(b => b.HasBingo());
                boards.RemoveAll(b => winners.Any(w => w == b));

                if (boards.Count == 1)
                {
                    lastBoard = boards[0];
                }
            }

            var unmarkedSum = lastBoard.GetUnmarkedSum();
            var lastNumber = int.Parse(numbers[lastNumberIdx]);

            Console.WriteLine($"{unmarkedSum} * {lastNumber} = {unmarkedSum * lastNumber}");
        }
    }
}