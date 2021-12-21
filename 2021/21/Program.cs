namespace AdventOfCode21
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("test.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var player1 = new Player(int.Parse(lines[0].Split(' ')[^1]));
            var player2 = new Player(int.Parse(lines[1].Split(' ')[^1]));
            var players = new[] { player1, player2 };

            var dice = 1;
            var diceRolls = 0;
            var currentPlayer = 0;

            while (!players.Any(p => p.score >= 1000))
            {
                var rolls = dice;
                dice++;
                if (dice > 100)
                {
                    dice = 1;
                }
                rolls += dice;
                dice++;
                if (dice > 100)
                {
                    dice = 1;
                }
                rolls += dice;
                dice++;
                if (dice > 100)
                {
                    dice = 1;
                }
                diceRolls += 3;

                var newPosition = players[currentPlayer].position + rolls;
                while (newPosition > 10)
                {
                    newPosition -= 10;
                }
                players[currentPlayer].position = newPosition;
                players[currentPlayer].score += newPosition;

                currentPlayer = currentPlayer == 0 ? 1 : 0;
            }

            var loser = players.First(p => p.score < 1000);
            Console.WriteLine($"{loser.score} * {diceRolls} = {loser.score * diceRolls}");
        }

        struct Player
        {
            public int score;
            public int position;
            public Player(int startingPos)
            {
                score = 0;
                position = startingPos;
            }
        }
    }
}