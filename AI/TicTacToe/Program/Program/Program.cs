using System;

namespace Program
{
    class Program
    {
        static void Main(string[] args)
        {
            //0-Prázdné pole
            //1-X
            //2-O
            int[,] board = { {0,0,0},{0,1,0},{0,0,0} };
            //int[,] board = { {0,2,1},{2,1,0},{1,2,0} }; 
            //int[,] board = { {1,1,2},{2,2,2},{1,2,1} }; 
            //int[,] board = { {0,0,0},{0,1,0},{0,0,0} }; 
            //int[,] board = { {0,0,1},{0,1,0},{0,0,2} }; 
            //Game game = new Game(board);
            //game.PrintActualState();
            //game.AiVsAi();
            //game.StartGame();

            System system = new System(board);
        }
    }
}
