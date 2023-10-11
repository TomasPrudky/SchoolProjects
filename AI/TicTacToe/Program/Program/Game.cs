using System;
using System.Collections.Generic;

namespace Program
{
    public class Game
    {
        public int[,] Board { get; set; }
        private bool turn = true; //TRUE ->X    FALSE->O
        private bool gameover = false;
        private Random random = new Random();

        public Game(int[,] board)
        {
            Board = board;
            CheckBoardAndSetTurn();
        }

        //Taky by asi mohlo být v Node
        private void CheckBoardAndSetTurn()
        {
            int x = 0;
            int o = 0;
            for (int i = 0; i < Board.GetLength(0); i++)
            {
                for (int j = 0; j < Board.GetLength(1); j++)
                {
                    if (Board[i, j] == 1) {
                        x++;
                    }
                    if (Board[i, j] == 2)
                    {
                        o++;
                    }
                }
            }
            if (x < o)
            {
                turn = true;
            }
            else {
                turn = false;
            }
        }

        public void PrintActualState() {
            for (int i = 0; i < Board.GetLength(0); i++)
            {
                for (int j = 0; j < Board.GetLength(1); j++)
                {
                    if (Board[i, j] == 0)
                    {
                        Console.Write("-");
                    }
                    else if (Board[i, j] == 1)
                    {
                        Console.Write("X");
                    }
                    else {
                        Console.Write("O");
                    }
                }
                Console.WriteLine();
            }
            Console.WriteLine();
        }

        public void AiVsAi()
        {
            while (EmptySpace() && !gameover)
            {
                Minimax();
                //TurnPc();
                PrintActualState();

                if (ExistWinner())
                {
                    break;
                }

                Minimax();
                //TurnPc();
                PrintActualState();

                if (ExistWinner())
                {
                    break;
                }
            }
        }

        private void Minimax()
        {
            System system = new System(Board);
            Board = system.Minimax();
        }

        public void StartGame()
        {
            while (EmptySpace() && !gameover) {
                turn = true;
                TurnPc();
                PrintActualState();

                if (ExistWinner()){
                    break;
                }

                turn = false;
                TurnPlayer();
                PrintActualState();

                if (ExistWinner())
                {
                    break;
                }
            }   
        }

        private void TurnPlayer()
        {
            Console.Write("Zadej volbu tahu:");
            string input = Console.ReadLine();
            int x = int.Parse(input[0].ToString());
            int y = int.Parse(input[1].ToString());
            Board[x, y] = 2;
        }


        private void TurnPc()
        {
            if (EmptySpace()) {
                int x = random.Next(0, 3);
                int y = random.Next(0, 3);
                if (Board[x, y] == 0)
                {
                    if (turn)
                    {
                        turn = false;
                        Board[x, y] = 1;
                    }
                    else {
                        turn = true;
                        Board[x, y] = 2;
                    }
                }
                else {
                    TurnPc();
                }
            }
        }

        //Mohlo by být asi i v NODE
        private bool ExistWinner()
        {
            if (CheckRowWinner())
            {
                WinnerPrint();
                return true;
            };
            if (CheckColumnWinner()) {
                WinnerPrint();
                return true;
            };
            if (CheckDiagonalWinner()) {
                WinnerPrint();
                return true;
            };
            return false;
        }

        private void WinnerPrint()
        {
            if (turn)
            {
                Console.WriteLine("O WIN");
            }
            else
            {
                Console.WriteLine("X WIN");
            }
            gameover = true;
        }

        //Taky by asi mohlo být v Node
        private bool CheckDiagonalWinner()
        {
            if (Board[0, 0] == Board[1, 1] && Board[2, 2] == Board[0, 0] && (Board[0,0] == 1 || Board[0,0] == 2))
            {
               return true;
            }
            if (Board[2, 0] == Board[1, 1] && Board[0, 2] == Board[2, 0] && (Board[2, 0] == 1 || Board[2, 0] == 2)) {
                return true;
            }
            
            return false;
        }

        //Taky by asi mohlo být v Node
        private bool CheckColumnWinner()
        {
            for (int i = 0; i < Board.GetLength(0); i++)
            {
                if (Board[0, i] == Board[1, i] && Board[2, i] == Board[0, i] && (Board[0, i] == 1 || Board[0, i] == 2))
                {
                    return true;
                }
            }
            return false;
        }

        //Taky by asi mohlo být v Node
        private bool CheckRowWinner()
        {
            for (int i = 0; i < Board.GetLength(0); i++)
            {
                if (Board[i, 0] == Board[i, 1] && Board[i, 2] == Board[i,0] && (Board[i, 0] == 1 || Board[i, 0] == 2)) {
                    return true;
                }
            }
            return false;
        }

        //Taky by asi mohlo být v Node
        private bool EmptySpace()
        {
            for (int i = 0; i < Board.GetLength(0); i++)
            {
                for (int j = 0; j < Board.GetLength(1); j++)
                {
                    if (Board[i, j] == 0) {
                        return true;
                    }
                }
            }
            Console.WriteLine("TIE");
            return false;
        }
    }
}