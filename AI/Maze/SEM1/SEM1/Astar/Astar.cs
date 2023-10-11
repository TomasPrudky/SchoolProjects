using System;
using System.Collections.Generic;
namespace MazePath
{
    public class Astar
    {
        private int[,] maze;
        private Point agent;
        private Point goal;
        private List<Node> fringe = new List<Node>();
        private List<Node> explored = new List<Node>();
        private int count = 0;

        public Astar(int[,] maze, Point agent, Point goal)
        {
            this.maze = maze;
            this.agent = agent;
            this.goal = goal;
            fringe.Add(new Node(count++, agent, null, Node.Action.DOWN, 0, 0));
            CalculatePrice(fringe[0]);
            GenerateStates();
        }

        private void GenerateStates() {
            while (fringe.Count != 0) {
                if (fringe[0].Location.X == goal.X && fringe[0].Location.Y == goal.Y) {
                    explored.Add(fringe[0]);
                    return;
                }
                FindPossibleStates(fringe[0]);
            }
            if (explored[explored.Count-1].Location.X != goal.X && explored[explored.Count-1].Location.Y != goal.Y) {
                explored.Clear();
                throw new Exception("Nelze sestrojit cestu mezi body");
            }
        }

        private void FindPossibleStates(Node node)
        {
            if (IsInMatrix(node)) { 
                if (maze[node.Location.X, node.Location.Y - 1] == 0)
                {
                    Node newNode = new Node(count++, new Point(node.Location.X, node.Location.Y - 1), fringe[0], Node.Action.LEFT, 0, 0);
                    SetCostAndAddToFringe(newNode);
                }
                if (maze[node.Location.X + 1, node.Location.Y] == 0)
                {
                    Node newNode = new Node(count++, new Point(node.Location.X + 1, node.Location.Y), fringe[0], Node.Action.DOWN, 0, 0);
                    SetCostAndAddToFringe(newNode);
                }
                if (maze[node.Location.X, node.Location.Y + 1] == 0)
                {
                    Node newNode = new Node(count++, new Point(node.Location.X, node.Location.Y + 1), fringe[0], Node.Action.RIGHT, 0, 0);
                    SetCostAndAddToFringe(newNode);
                }
                if (maze[node.Location.X - 1, node.Location.Y] == 0)
                {
                    Node newNode = new Node(count++, new Point(node.Location.X - 1, node.Location.Y), fringe[0], Node.Action.UP, 0, 0);
                    SetCostAndAddToFringe(newNode);
                }
            }

            explored.Add(fringe[0]);
            fringe.RemoveAt(0);
            fringe.Sort();
        }

        private void SetCostAndAddToFringe(Node newNode)
        {
            newNode.PathCost = EvaluationPathCost(newNode);
            newNode.PathEval = EvaluationPathEval(newNode);
            if (!LocationExistInExplored(newNode.Location) && !LocationExistInFrindge(newNode.Location))
            {
                fringe.Add(newNode);
            }
        }

        private bool IsInMatrix(Node node)
        {
            return node.Location.X > 0 && node.Location.Y > 0 && node.Location.X < maze.GetLength(1) && node.Location.Y < maze.GetLength(0);
        }

        public void PrintInfo() {
            foreach (var item in explored)
            {
                Console.WriteLine($"[{item.Location.X}:{item.Location.Y}]");
            }
        }

        private void CalculatePrice(Node node)
        {
            node.PathCost = EvaluationPathCost(node);
            node.PathEval = EvaluationPathEval(node); ;
        }

        private double EvaluationPathEval(Node node)
        {
            return Math.Abs(node.Location.X - goal.X) + Math.Abs(node.Location.Y - goal.Y);
        }

        private double EvaluationPathCost(Node node)
        {
            return Math.Abs(agent.X - node.Location.X) + Math.Abs(agent.Y - node.Location.Y);
        }

        private bool LocationExistInFrindge(Point location) {
            foreach (var item in fringe) {
                if (item.Location.X == location.X && item.Location.Y == location.Y) {
                    return true;
                }
            }
            return false;
        }

        private bool LocationExistInExplored(Point location)
        {
            foreach (var item in explored)
            {
                if (item.Location.X == location.X && item.Location.Y == location.Y)
                {
                    return true;
                }
            }
            return false;
        }

        public Stack<Node> GetFinalPath() {
            Stack<Node> final = new Stack<Node>();
            explored.Reverse();
            if (explored.Count != 0) { 
                final.Push(explored[0]);
                foreach (var item in explored)
                {
                    if (final.Peek().Parent != null) { 
                        if (final.Peek().Parent.ID == item.ID) {
                            final.Push(item);
                        }
                    }
                }
            }

            return final;
        }

        public void PrintFinalPath() {
            foreach (var item in GetFinalPath()) {
                Console.WriteLine($"[{item.Location.X}:{item.Location.Y}]");
            }
        }
    }
}