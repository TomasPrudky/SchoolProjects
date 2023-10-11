using MazePath;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace SEM1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        int[,] maze;
        Stack<Node> finalPath = null;
        MazePath.Point agent = null;
        MazePath.Point goal;
        int agentPrice;
        Node.Action agentAction = Node.Action.DOWN;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void ButtonLoadMaze_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                OpenFileDialog openFileDialog = new OpenFileDialog();
                openFileDialog.Filter = "bmp files (*.bmp)|*.bmp";
                if (openFileDialog.ShowDialog() == true)
                {
                    MazeReader mazeReader = new MazeReader(openFileDialog.FileName);
                    maze = mazeReader.GetIntMaze();
                    SetCanvas(maze);
                }
            }
            catch (Exception exception) { 
                MessageBox.Show(exception.Message);
            }
        }

        private void SetCanvas(int[,] maze)
        {
            canvas.Children.Clear();
            double widthSquare = canvas.ActualWidth / maze.GetLength(1); 
            double heightSquare = canvas.ActualHeight / maze.GetLength(0);

            for (int i = 0; i < maze.GetLength(0); i++)
            {
                for (int j = 0; j < maze.GetLength(1); j++)
                {
                    Rectangle rectangle = new Rectangle();
                    rectangle.Width = widthSquare;
                    rectangle.Height = heightSquare;

                    if (maze[i, j] == 1)
                    {
                        rectangle.Fill = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                    }
                    else {
                        rectangle.Fill = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0));
                    }
                    canvas.Children.Add(rectangle);
                    Canvas.SetLeft(rectangle, j * widthSquare);
                    Canvas.SetTop(rectangle, i * heightSquare);
                }
            }
        }

        private void ButtonFindPath_Click(object sender, RoutedEventArgs e)
        {
            if (maze == null) {
                MessageBox.Show("Načti bludiště!");
                return;
            }
            if (finalPath != null)
            {
                if (finalPath.Count != 0)
                {
                    foreach (var item in finalPath)
                    {
                        Rectangle activeRectangle = (Rectangle)canvas.Children[(item.Location.X * maze.GetLength(0)) + item.Location.Y];
                        activeRectangle.Fill = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0));
                    }
                }
            }

            try
            {
                Astar astar = new Astar(maze, agent, goal);

                agentPrice = 0;
                agentAction = Node.Action.DOWN;

                finalPath = astar.GetFinalPath();

                byte iteration = (byte)(510 / finalPath.Count);

                byte R = 0;
                byte G = 255;

                foreach (var item in finalPath)
                {
                    if (R < 255)
                    {
                        if (R + iteration > 255)
                        {
                            R = 255;
                        }
                        else
                        {
                            R += iteration;
                        }
                    }
                    else
                    {
                        G -= iteration;
                    }
                    Rectangle activeRectangle = (Rectangle)canvas.Children[(item.Location.X * maze.GetLength(0)) + item.Location.Y];
                    activeRectangle.Fill = new SolidColorBrush(Color.FromArgb(255, R, G, 0));
                    if (item != finalPath.First()) { 
                        agentPrice += CalculateAgentPrice(item);
                    }
                }

               
                MessageBox.Show($"Cena cesty agenta je: {agentPrice}");
            }
            catch (Exception exception) {
                MessageBox.Show(exception.Message);
            }
        }

        private int CalculateAgentPrice(Node item)
        {
            int price = 5;

            if (agentAction == Node.Action.UP && item.NodeAction == Node.Action.DOWN)
            {
                price += 3;
            }
            else if (agentAction == Node.Action.UP && (item.NodeAction == Node.Action.LEFT || item.NodeAction == Node.Action.RIGHT))
            {
                price += 2;
            }
            else if (agentAction == Node.Action.RIGHT && (item.NodeAction == Node.Action.UP || item.NodeAction == Node.Action.DOWN))
            {
                price += 2;
            }
            else if (agentAction == Node.Action.RIGHT && item.NodeAction == Node.Action.LEFT)
            {
                price += 3;
            }
            else if (agentAction == Node.Action.DOWN && (item.NodeAction == Node.Action.LEFT || item.NodeAction == Node.Action.RIGHT))
            {
                price += 2;
            }
            else if (agentAction == Node.Action.DOWN && item.NodeAction == Node.Action.UP)
            {
                price += 3;
            }
            else if (agentAction == Node.Action.LEFT && (item.NodeAction == Node.Action.UP || item.NodeAction == Node.Action.DOWN))
            {
                price += 2;
            }
            else if (agentAction == Node.Action.LEFT && item.NodeAction == Node.Action.RIGHT)
            {
                price += 3;
            }

            agentAction = item.NodeAction;

            return price;
        }


        private void Canvas_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {

                if (e.OriginalSource is Rectangle)
                {
                    if (agent != null) {
                        Rectangle oldRectangle = (Rectangle)canvas.Children[agent.X * maze.GetLength(0) + agent.Y];
                        oldRectangle.Fill = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0));
                    }
                    if (agent == null) {
                        agent = new MazePath.Point();
                    }
                    int index = canvas.Children.IndexOf((UIElement)e.OriginalSource);
                    if (maze[index/maze.GetLength(0),index%maze.GetLength(0)] == 0) { 
                        Rectangle activeRectangle = (Rectangle)canvas.Children[index];
                        ImageBrush imageBrush = new ImageBrush { ImageSource = new BitmapImage(new Uri(@"icons\\agent.png", UriKind.Relative)) };
                        activeRectangle.Fill = imageBrush;
                        agent.X = index / maze.GetLength(0);
                        agent.Y = index % maze.GetLength(0);
                    }
                }
            }
            if (e.RightButton == MouseButtonState.Pressed)
            {
                if (e.OriginalSource is Rectangle)
                {
                    if (goal != null)
                    {
                        Rectangle oldRectangle = (Rectangle)canvas.Children[goal.X * maze.GetLength(0) + goal.Y];
                        oldRectangle.Fill = new SolidColorBrush(Color.FromArgb(0, 0, 0, 0));
                    }
                    if (goal == null) {
                        goal = new MazePath.Point();
                    }
                    int index = canvas.Children.IndexOf((UIElement)e.OriginalSource);
                    if (maze[index / maze.GetLength(0), index % maze.GetLength(0)] == 0)
                    {
                        Rectangle activeRectangle = (Rectangle)canvas.Children[index];
                        ImageBrush imageBrush = new ImageBrush { ImageSource = new BitmapImage(new Uri(@"icons\\end.png", UriKind.Relative)) };
                        activeRectangle.Fill = imageBrush;
                        goal.X = index / maze.GetLength(0);
                        goal.Y = index % maze.GetLength(0);
                    }
                }
            }
        }
    }
}
