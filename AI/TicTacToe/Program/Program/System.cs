using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Program
{
    public class System
    {
        private Queue<Node> fringe = new Queue<Node>();
        private Stack<Node> list = new Stack<Node>();

        public Node HeadNode { get; set; }
        private int counter = 0;

        public System(int[,] matrix) {
            HeadNode = new Node(counter++, matrix, 0, 0, 0);
            fringe.Enqueue(HeadNode);
            GenerateStates();
        }

        private void GenerateStates()
        {
            while (fringe.Count != 0)
            {
                FindNewStates();
            }
            CalculatePrice();
            //Console.WriteLine(list.Peek().ToString());
            foreach (Node item in list)
            {
                Console.WriteLine(item.ToString());
            }
        }

        private void CalculatePrice()
        {
            foreach (Node item in list)
            {
                if (item.Depth <= 3) {
                    CreatePathAndRate(item);
                }
            }
        }

        private void CreatePathAndRate(Node item)
        {
            while (item.ParentId != 0) {

                foreach (Node node in list)
                {
                    if (item.ParentId == node.IdNode) {
                        RateActualState(node);
                        item = node;
                    }
                }
            }
            if (item.ParentId == 0) {
                RateActualState(item);
            }
        }

        private void RateActualState(Node node)
        {
            if (node.ExistWinner())
            {
                if (node.GetNumberOfMoves() % 2 == 0)
                {
                    node.Cost = -100;
                }
                else
                {
                    node.Cost = 100;
                }
            }
            else {
                if (node.GetNumberOfMoves() % 2 == 0)
                {
                    node.Cost = -1;
                }
                else
                {
                    node.Cost = 1;
                }
            }
        }

        private void FindNewStates()
        {
            if (fringe.Count != 0) {
                Node last = fringe.Dequeue();
                int depth = last.Depth;
                depth++;
                for (int i = 0; i < last.State.GetLength(0); i++)
                {
                    for (int j = 0; j < last.State.GetLength(1); j++)
                    {
                        //Checkni zda je pole prázdné a zkus udělat krok
                        if (last.State[i, j] == 0) {
                            //Checkni, kdo je na tahu
                            Node newNode = new Node(counter++, (int[,])last.State.Clone(), last.IdNode, depth, 0);
                            if (newNode.GetNumberOfMoves() % 2 == 0)
                            {
                                newNode.State[i, j] = 1;
                            }
                            else {
                                newNode.State[i, j] = 2;
                            }
                            //Vypocitej pro tento stav hodnotu
                            
                            //Pridej do fringe
                            //fringe.Enqueue(newNode);
                            if (newNode.ExistWinner() && newNode.Depth < 4)
                            {

                                //if (newNode.GetNumberOfMoves() % 2 == 0)
                                //{
                                //    newNode.Cost = -100;
                                //}
                                //else {
                                //    newNode.Cost = 100;
                                //}

                                list.Push(newNode);
                                //Console.WriteLine(newNode.ToString());
                                

                            }
                            else { 
                                CheckIfMatrixExistAndAddToFringe(newNode);
                            }
                        }
                    }
                }
                list.Push(last);
                //Console.WriteLine(last.ToString());
            }        
        }

        public int[,] Minimax()
        {
            //

            return HeadNode.State;
        }

        private void CheckIfMatrixExistAndAddToFringe(Node newNode)
        {
            if (!ExistMatrix(newNode))
            {
                if (newNode.Depth == 4) {
                    return;
                }
                fringe.Enqueue(newNode);          
            }
            else {
                counter--;
            }
        }

        private bool ExistMatrix(Node newNode)
        {
            foreach (var item in list)
            {
                if (newNode.CompareMatrix(item))
                {
                    return true;
                }
            }
            return false;
        }

        //Musím si držet TURN, abych věděl, zda přidat X|O
        //Potom přidat do všech prázných míst asi jeden znak
        //Potom tento stav s novým znakem asi ohodnotit, podle toho, zda to pomůže X|O
        //Pokud X budou 2, dát hodnotu třeba 10, pokud 3, tak hodnotu 100, pokud jendo X, tak 1
        //Pro O stejné hodnoty, jen záporné

    }

}
