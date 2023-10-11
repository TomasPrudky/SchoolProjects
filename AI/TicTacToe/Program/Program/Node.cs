using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Program
{
    public class Node
    {
        public int IdNode { get; set; }
        public int[,] State { get; set; }
        public int ParentId { get; set; }
        public int Depth { get; set; }
        public int Cost { get; set; }

        public Node(int idNode, int[,] state, int parentId, int depth, int cost)
        {
            IdNode = idNode;
            State = state;
            ParentId = parentId;
            Depth = depth;
            Cost = cost;
        }

        public Tuple<int, int> GetEmptyIndex()
        {
            for (int i = 0; i < State.GetLength(0); i++)
            {
                for (int j = 0; j < State.GetLength(1); j++)
                {
                    if (State[i, j] == 0)
                    {
                        return Tuple.Create(i, j);
                    }
                }
            }
            return Tuple.Create(-1, -1);
        }

        public void PrintMatrix()
        {
            for (int i = 0; i < State.GetLength(0); i++)
            {
                for (int j = 0; j < State.GetLength(1); j++)
                {
                    Console.Write("{0}", State[i, j]);
                }
                Console.WriteLine("");
            }
            Console.WriteLine("______");

        }

        public bool CompareMatrix(Node node)
        {
            var equal = State.Rank == node.State.Rank &&
                            Enumerable.Range(0, State.Rank).All(dimension => State.GetLength(dimension) == node.State.GetLength(dimension)) &&
                            State.Cast<int>().SequenceEqual(node.State.Cast<int>());
            return equal;
        }

        public bool CompareMatrix(int[,] node)
        {
            var equal = State.Rank == node.Rank &&
                            Enumerable.Range(0, State.Rank).All(dimension => State.GetLength(dimension) == node.GetLength(dimension)) &&
                            State.Cast<int>().SequenceEqual(node.Cast<int>());
            return equal;
        }

        public override string ToString()
        {
            string str = "";
            for (int i = 0; i < State.GetLength(0); i++)
            {
                for (int j = 0; j < State.GetLength(1); j++)
                {
                    if (State[i, j] == 0) {
                        str += "-";
                    }
                    else if (State[i, j] == 1)
                    {
                        str += "X";
                    }
                    else
                    {
                        str += "O";
                    }
                    //str += State[i, j];
                }
                str += "\n";
            }
            return string.Format("ID: {0}, IDParent: {1}, Depth: {2}, Cost: {3}, \n{4}", IdNode, ParentId, Depth, Cost, str);
        }

        public bool ExistWinner()
        {
            if (CheckRowWinner())
            {
                return true;
            };
            if (CheckColumnWinner())
            {
                return true;
            };
            if (CheckDiagonalWinner())
            {
                return true;
            };
            return false;
        }

        private bool CheckDiagonalWinner()
        {
            if (State[0, 0] == State[1, 1] && State[2, 2] == State[0, 0] && (State[0, 0] == 1 || State[0, 0] == 2))
            {
                return true;
            }
            if (State[2, 0] == State[1, 1] && State[0, 2] == State[2, 0] && (State[2, 0] == 1 || State[2, 0] == 2))
            {
                return true;
            }

            return false;
        }

        private bool CheckColumnWinner()
        {
            for (int i = 0; i < State.GetLength(0); i++)
            {
                if (State[0, i] == State[1, i] && State[2, i] == State[0, i] && (State[0, i] == 1 || State[0, i] == 2))
                {
                    return true;
                }
            }
            return false;
        }

        private bool CheckRowWinner()
        {
            for (int i = 0; i < State.GetLength(0); i++)
            {
                if (State[i, 0] == State[i, 1] && State[i, 2] == State[i, 0] && (State[i, 0] == 1 || State[i, 0] == 2))
                {
                    return true;
                }
            }
            return false;
        }

        public void CalculatePrice() {

            //X--
            //---   0   |  0
            //---

            //---
            //XX-   1   | -1
            //---

            //X--
            //-X-   100 | -100
            //--X
        }

        public int GetNumberOfMoves()
        {
            int tmp = 0;
            for (int i = 0; i < State.GetLength(0); i++)
            {
                for (int j = 0; j < State.GetLength(1); j++)
                {
                    if (State[i, j] != 0)
                    {
                        tmp++;
                    }
                }
            }
            return tmp;
        }
    }
}
