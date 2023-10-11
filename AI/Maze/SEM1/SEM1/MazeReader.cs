using System;
using System.Drawing;

namespace MazePath
{
    public class MazeReader
    {
        private Bitmap image;
        private int[,] intMaze;

        public MazeReader(String path)
        {
            image = new Bitmap(path);
            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
            intMaze = new int[image.Height, image.Width];
        }

        public int[,] GetIntMaze() {
            for (int i = 0; i < intMaze.GetLength(0); i++)
            {
                for (int j = 0; j < intMaze.GetLength(1); j++)
                {
                    if (image.GetPixel(j, i).ToArgb().Equals(Color.Black.ToArgb()))
                    {
                        intMaze[i, j] = 1;
                    }
                    else
                    {
                        intMaze[i, j] = 0;
                    }
                }
            }
            return intMaze;
        }
    }
}
